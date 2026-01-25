from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional


class ContactForm(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=5, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)


class ContactResponse(BaseModel):
    success: bool
    message: str


class Project(BaseModel):
    id: int
    title: str
    description: str
    long_description: Optional[str] = None
    tech_stack: List[str]
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    image_url: Optional[str] = None
    featured: bool = False
    category: str = "other"


class Achievement(BaseModel):
    id: int
    title: str
    description: str
    date: str
    icon: str = "trophy"
    link: Optional[str] = None


class Experience(BaseModel):
    id: int
    company: str
    role: str
    duration: str
    start_date: str
    end_date: Optional[str] = "Present"
    description: str
    responsibilities: List[str]
    tech_stack: List[str]
    company_logo: Optional[str] = None


class Skill(BaseModel):
    name: str
    level: int  # 1-100
    category: str  # "languages", "frameworks", "tools", "databases"


class Education(BaseModel):
    degree: str
    institution: str
    specialization: str
    duration: str
    gpa: Optional[str] = None
    achievements: List[str] = []