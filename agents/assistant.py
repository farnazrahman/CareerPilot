import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def chat_with_assistant(message, cv_context):
    prompt = f"""
You are a career assistant AI. You have full context of the user's CV.

CV Context:
{cv_context}

User Message: {message}

Provide a helpful, personalized response grounded in their actual CV experience. If asked about skill gaps, job readiness, cover letters, or learning roadmaps, reference specific details from their CV.
"""
    
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7
    )
    
    return response.choices[0].message.content