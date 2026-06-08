import os
from dotenv import load_dotenv
from groq import Groq

from agents.real_jobs import search_real_jobs  # adjust path if needed

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def hunt_jobs(query, cv_context):
    """
    Main job hunting function:
    1) Try to fetch real jobs from Arbeitnow
    2) If found, ask Groq to score + explain them
    3) If none, fall back to AI-only job generation
    """
    # 1) Fetch real jobs
    real_jobs = search_real_jobs(query, num_results=3)
    print(">>> real_jobs in hunt_jobs:", real_jobs)

    # 2) If we got real jobs, ask Groq to score + explain them
    if real_jobs:
        prompt = f"""
You are a job matching agent. The following are REAL job postings.

CV Context:
{cv_context}

User Query: {query}

Jobs:
{real_jobs}

For the jobs list, return exactly 3 items, each in this format:
1. Role | Company | Salary Range | Deadline | Location | Fit Score (0-100) | Reasoning
2. Role | Company | Salary Range | Deadline | Location | Fit Score (0-100) | Reasoning
3. Role | Company | Salary Range | Deadline | Location | Fit Score (0-100) | Reasoning

Use the role, company and location from the REAL jobs.
Guess salary_range and deadline if missing.
Fit Score and Reasoning must be based on the CV.
"""
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.5,
        )

        return parse_job_results(response.choices[0].message.content)

    # 3) Fallback: if no real jobs, reuse pure-AI behavior
    return ai_only_hunt_jobs(query, cv_context)


def ai_only_hunt_jobs(query, cv_context):
    """
    Pure AI job generation if real jobs are unavailable.
    """
    prompt = f"""
You are a job hunting agent. Based on the user's CV context and their query, generate 3 relevant job opportunities.

CV Context:
{cv_context}

User Query: {query}

Return EXACTLY 3 job cards in this format:
1. Role | Company | Salary Range | Deadline | Location | Fit Score (0-100) | Reasoning
2. Role | Company | Salary Range | Deadline | Location | Fit Score (0-100) | Reasoning
3. Role | Company | Salary Range | Deadline | Location | Fit Score (0-100) | Reasoning

Be specific and ground your reasoning in the actual CV experience.
"""
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
    )

    return parse_job_results(response.choices[0].message.content)


def parse_job_results(text):
    """
    Parse Groq's text output into a list of job dicts.
    Expects lines like:
    1. Role | Company | Salary Range | Deadline | Location | Fit Score (0-100) | Reasoning
    """
    jobs = []
    # keep only lines that have '|' and are non-empty
    lines = [line.strip() for line in text.split('\n') if line.strip() and '|' in line]

    for line in lines[:3]:
        parts = [p.strip() for p in line.split('|')]
        if len(parts) >= 7:
            jobs.append({
                "role": parts[0].lstrip('0123456789. '),
                "company": parts[1],
                "salary_range": parts[2] if parts[2] != 'N/A' else None,
                "deadline": parts[3] if parts[3] != 'N/A' else None,
                "location": parts[4],
                "fit_score": int(''.join(filter(str.isdigit, parts[5])) or 0),
                "reasoning": parts[6]
            })

    return jobs