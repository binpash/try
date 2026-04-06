from pydantic import BaseModel


class PoshSpecification(BaseModel):
    input_split: bool
    args_split: bool
    input_geq_output: bool


class Posh(BaseModel):
    command: str
    cases: list[PoshSpecification]
