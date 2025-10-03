from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.model.llm import generate_answer_test_results, generate_answer_image

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class BloodResults(BaseModel):
    blood_results: str


class Image(BaseModel):
    image: str


@app.post("/analyze_blood_results")
async def analyze_blood_results(data: BloodResults):
    try:
        answer = generate_answer_test_results(data.blood_results)
    except Exception as e:
        print(e)
        answer = "Model not reachable. Ensure Ollama is running."

    return {"analysis": answer}


@app.post("/analyze_image")
async def analyze_image(data: Image):
    try:
        answer = generate_answer_image(data.image)
    except Exception as e:
        print(e)
        answer = "Model not reachable. Ensure Ollama is running."

    return {"analysis": answer}


@app.get("/health")
async def health_check():
    print("Health check")
    return {"status": "healthy"}
