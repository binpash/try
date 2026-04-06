import sys
import os
from collections.abc import Iterable
import numpy as np
from PIL import Image
from segment_anything import SamAutomaticMaskGenerator, sam_model_registry
import random
import torch

SEED = 42
random.seed(SEED)
np.random.seed(SEED)
torch.manual_seed(SEED)

torch.use_deterministic_algorithms(True)

# for cuda usage:
torch.backends.cudnn.deterministic = True
torch.backends.cudnn.benchmark = False

BoundingBox = tuple[int, int, int, int]

class Sam1Segmenter:
    def __init__(
        self,
        checkpoint_path: str = None,
        model_type: str = "vit_h",
        bbox_margin: int = 3,
        points_per_side: int = 16,
        pred_iou_thresh: float = 0.9,
        stability_score_thresh: float = 0.9,
        min_mask_region_area: int = 300,
        max_mask_region_area: int = 5000,
    ):
        """
        Args:
            checkpoint_path (str): Path to SAM model checkpoint.
            model_type (str): Type of SAM model to use (e.g., 'vit_h').
            bbox_margin (int): Extra margin added to each side of the bounding boxes.
            points_per_side (int): Grid density for mask generation.
            pred_iou_thresh (float): IOU threshold for filtering masks.
            stability_score_thresh (float): Stability threshold for filtering masks.
            min_mask_region_area (int): Minimum mask area to keep.
            max_mask_region_area (int): Maximum mask area to keep (filters out large masks).
        """
        if checkpoint_path is None:
            checkpoint_path = os.path.abspath(os.path.join(
                os.path.dirname(os.path.realpath(__file__)),
                "..",
                "inputs",
                "models",
                "sam_vit_h.pth"
            ))

        self.bbox_margin = bbox_margin
        self.max_mask_region_area = max_mask_region_area

        sam = sam_model_registry[model_type](checkpoint=checkpoint_path)

        self.mask_generator = SamAutomaticMaskGenerator(
            model=sam,
            points_per_side=points_per_side,
            pred_iou_thresh=pred_iou_thresh,
            stability_score_thresh=stability_score_thresh,
            min_mask_region_area=min_mask_region_area,
        )

    def segment(self, image: Image.Image) -> Iterable[BoundingBox]:
        """
        Segments an image and optionally saves the resulting sub-images.
        Args:
            image (Image.Image): The input image.
        Returns:
            List[Tuple[Image.Image, BoundingBox]]: List of segmented images and their bounding boxes.
        """
        np_image = np.array(image.convert("RGB"))

        masks = self.mask_generator.generate(np_image)

        if self.max_mask_region_area is not None:
            masks = [m for m in masks if m["area"] <= self.max_mask_region_area]
            # print(
            #     f"After filtering, {len(masks)} remain below area={self.max_mask_region_area}."
            # )

        for m in masks:
            x0, y0, w, h = m["bbox"]  # XYWH format

            x = max(int(x0 - self.bbox_margin), 0)
            y = max(int(y0 - self.bbox_margin), 0)
            w_expanded = int(w + 2 * self.bbox_margin)
            h_expanded = int(h + 2 * self.bbox_margin)

            yield (x, y, w_expanded, h_expanded)


if __name__ == "__main__":
    model = Sam1Segmenter()
    for seg in model.segment(Image.open(sys.stdin.buffer)):
        print(*seg)