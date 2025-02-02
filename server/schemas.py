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
    dealbreakers: List[str]
    bio: str
    cookie: str

class DMSchema(BaseModel):
    sender: str
    to: str
    text: str
    time: str



