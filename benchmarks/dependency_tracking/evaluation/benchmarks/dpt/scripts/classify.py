#!/usr/bin/env python3

import json
import os
import sys
import random

import numpy as np
import tensorflow as tf
from PIL import Image

SEED = 42
os.environ["PYTHONHASHSEED"] = str(SEED)
os.environ["TF_DETERMINISTIC_OPS"] = "1"

random.seed(SEED)
np.random.seed(SEED)
tf.random.set_seed(SEED)

CLASSIFIER_ROOT = os.path.dirname(os.path.realpath(__file__))


class Classifier:
    def __init__(
        self,
        model_path=os.path.join(CLASSIFIER_ROOT, "..", "inputs", "models", "model.h5"),
        rdict_path=os.path.join(CLASSIFIER_ROOT, "..", "inputs", "models", "rdict.json"),
    ) -> None:
        try:
            self.model = tf.keras.models.load_model(model_path, compile=False)
        except Exception as e:
            raise ValueError(f"Error loading model from {model_path}: {e}")

        try:
            with open(rdict_path, "r") as file:
                self.rdict = json.load(file)
        except Exception as e:
            raise ValueError(f"Error loading label dictionary from {rdict_path}: {e}")

    def classify(
        self, image: Image.Image, bounding_box: tuple[int, int, int, int]
    ) -> tuple[str, float]:
        """
        Classify the content within the specified bounding box of an image.
        Args:
            image (PIL.Image.Image): The original image.
            bounding_box (list[int]): Bounding box as [x, y, w, h].
        Returns:
            tuple[str, float]: The classification label and confidence score.
        """
        cropped_image = self.__crop_image(image, bounding_box)
        class_index, confidence = self.__predict(cropped_image)
        label = self.rdict.get(str(class_index), "Unknown")
        return label, confidence

    def __predict(self, image: Image.Image) -> tuple[int, float]:
        """
        Predict the class index and confidence score for the input image.
        Args:
            image (PIL.Image.Image): The preprocessed image.
        Returns:
            tuple[int, float]: Predicted class index and confidence score.
        """
        prediction = self.model.predict(self.preprocess_image(image), verbose=0)
        predicted_class_index = np.argmax(prediction, axis=1)[0]
        confidence = float(prediction[0][predicted_class_index])
        return predicted_class_index, confidence

    @staticmethod
    def preprocess_image(image: Image.Image) -> np.ndarray:
        """
        Preprocess the image for model input.
        """
        raw_image = image.convert("L").resize((128, 128))
        tensor = np.expand_dims(np.array(raw_image), axis=(0, -1)).astype("float32")
        mean, std = np.mean(tensor), np.std(tensor)

        # Prevent division by zero if std is zero
        if std < 1e-6:
            std = 1.0

        return (tensor - mean) / std

    @staticmethod
    def __crop_image(
        image: Image.Image, bounding_box: tuple[int, int, int, int]
    ) -> Image.Image:
        """
        Crop the region defined by the bounding box from the original image.
        Args:
            image (PIL.Image.Image): The original image.
            bounding_box (list[int]): Bounding box as [x, y, w, h].
        Returns:
            PIL.Image.Image: Cropped image region.
        """
        x, y, w, h = bounding_box
        return image.crop((x, y, x + w, y + h))


if __name__ == "__main__":
    img = Image.open(sys.argv[1])
    model = Classifier()

    for line in sys.stdin:
        coords = line.strip().split()
        if len(coords) != 4:
            continue

        x, y, w, h = map(int, coords)
        label, confidence = model.classify(img, (x, y, w, h))

        # Must print 6 columns
        print(x, y, w, h, label, confidence)
