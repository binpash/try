from typing import List, Union
from pash_annotations.datatypes.BasicDatatypes import FlagOption
from pash_annotations.datatypes.BasicDatatypesWithIO import OptionWithIO
from pash_annotations.annotation_generation.annotation_generators.InputOutputInfoGenerator_Interface import InputOutputInfoGeneratorInterface


class InputOutputInfoGeneratorMv(InputOutputInfoGeneratorInterface):

    # list_of_all_flags = ["-b", "-f", "-i", "-n", "--strip-trailing-slashes", "-T",
    #                      "-u", "-v", "-Z", "--help", "--version"]
    # list_of_all_options = ["--backup", "-S", "-t"]

    # Questions:
    # What does --strip-trailing-slashes mean for input/output lists?
    # How to handle this? standard backup suffix: ~ , could be set by VERSION_CONTROL=
    #   none/off, numbered/t, existing/nil, simple/never

    # Which ones do affect input/output?
    # --backup[=Control] -> O
    # -b -> O
    # -f -> O kind of since it would not overwrite otherwise
    # -i -> O kind of since it would ask -> no interactive assumed for now
    # -n -> O do not overwrite existing file
    # --suffix=SUFFIX -> O overwrites the usual backup suffix
    # note that last of -f, -i, -n takes affect
    # -t -> O target directory
    # -u -> O update only if source file is newer than destination file

    # over-approximating for output files
    #   - put (whole) output directory (file) in output_list
    #   - do only check -t then

    def generate_info(self) -> None:
        # -T shall treat destination as file, not directory, not considered currently
        # -t gives destination directory as an argument to option and determines how operands are interpreted
        list_options_t : List[FlagOption] = self.get_flag_option_list_filtered_with(["-t"])
        if len(list_options_t) == 0:
            self.all_but_last_operand_is_other_input()
            self.only_last_operand_is_other_output()
        elif len(list_options_t) == 1:
            self.all_operands_are_other_inputs()
        else:
            # multiple -t options not allowed (checked using cmd)
            raise Exception("multiple -t options defined for mv")
