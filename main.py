from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import uuid
from models import CVUploadResponse, JobQuery, ChatMessage, ChatResponse
from cv_processor import process_cv
from rag_engine import rag_engine
from agents.job_hunter import hunt_jobs
from agents.assistant import chat_with_assistant

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
def read_root():
    return {"message": "CareerPilot Backend API is running"}

@app.post("/upload-cv", response_model=CVUploadResponse)
async def upload_cv(file: UploadFile = File(...)):
    try:
        cv_id = str(uuid.uuid4())
        file_path = os.path.join(UPLOAD_DIR, f"{cv_id}_{file.filename}")
        
        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)
        
        cv_text = process_cv(file_path)
        
        rag_engine.create_cv_store(cv_id, cv_text)
        
        return CVUploadResponse(
            message="CV uploaded and processed successfully",
            cv_id=cv_id
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/hunt-jobs")
async def hunt_jobs_endpoint(query: JobQuery):
    try:
        cv_context = " ".join(rag_engine.query_cv(query.cv_id, query.query, n_results=5))
        
        jobs = hunt_jobs(query.query, cv_context)
        
        return {"jobs": jobs}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(chat: ChatMessage):
    try:
        cv_context = " ".join(rag_engine.query_cv(chat.cv_id, chat.message, n_results=5))
        
        response = chat_with_assistant(chat.message, cv_context)
        
        return ChatResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)