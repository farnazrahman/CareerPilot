from pydantic import BaseModel
from typing import Optional, List

class CVUploadResponse(BaseModel):
    message: str
    cv_id: str

class JobQuery(BaseModel):
    query: str
    cv_id: str

class JobCard(BaseModel):
    role: str
    company: str
    salary_range: Optional[str]
    deadline: Optional[str]
    location: str
    fit_score: int
    reasoning: str

class ChatMessage(BaseModel):
    message: str
    cv_id: str

class ChatResponse(BaseModel):
    response: str