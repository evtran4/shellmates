from pydantic import BaseModel, EmailStr
from typing import List

class EmailSchema(BaseModel):
    email: List[EmailStr]

class AccountSchema(BaseModel):
    email: str
    password: str
    name: str
    major: str
    tags: List[str]
    likes: List[str]
    seen: List[str]
    bio: str
    cookie: str



