from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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


@app.post("/analyze")
async def analyze_blood_results(data: BloodResults):
    return {
        "analysis": f"Otrzymano wyniki do analizy: {data.blood_results}\nTa funkcjonalność zostanie wkrótce zintegrowana z modelem."
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
