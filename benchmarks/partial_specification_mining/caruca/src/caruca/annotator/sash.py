from pydantic import BaseModel, RootModel


class FileSystemPredicate(BaseModel):
    name: str
    type: str
    relative: bool
    parent_exists: bool = True


class SashRunSpecification(BaseModel):
    preconditions: list[FileSystemPredicate]
    postconditions: list[FileSystemPredicate]
    updates: list[str]
    return_code: int | None


SaShSpecification = RootModel[list[SashRunSpecification]]

SaSh = RootModel[list[SaShSpecification]]
