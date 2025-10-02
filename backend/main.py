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


@app.post("/analyze")
async def analyze_blood_results(data: BloodResults):
    # answer = generate_answer_test_results(data.blood_results)
    # print(answer)
    answer = "To będzie zmienione jak ogarne czemu model nie działa XDD"
    if answer == "":
        return {"analysis": "Nie udało się uzyskać odpowiedzi z modelu."}
    return {"analysis": answer}


@app.post("/analyze_image")
async def analyze_image(data: Image):
    answer = generate_answer_image(data.image)
    print(answer)
    if answer == "":
        return {"analysis": "Nie udało się uzyskać odpowiedzi z modelu."}
    return {"analysis": answer}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
