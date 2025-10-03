# 🏥 MedicalAnalyzer

> Blood test analysis application powered by AI model (medgemma-4b-it)

[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-green.svg)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/00200200/MedicalAnalyzer.git
cd MedicalAnalyzer

# Run the application
docker compose build
docker compose up
```


```bash 
docker compose exec ollama ollama pull edwardlo12/medgemma-4b-it-Q4_K_M

```
The application will be available at:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`

### API EDNPOINTS

 - /health - check if backend works
 - /analyze_blood_results - analyze blood results
 - /analyze_iamge - analyze x-ray image  



## 📁 Project Structure

```
frontend/
  ├── Dockerfile
  ├── package.json
  ├── public/
  │   └── index.html
  └── src/
      ├── index.jsx
      ├── App.jsx
      └── components/
          └── Home.jsx

backend/
  ├── Dockerfile
  ├── requirements.txt
  └── main.py

docker-compose.yml
.github/
  └── dependabot.yml
```



{
    "role": "user",
    "content": [
        {
          
        "type": "text", "text": "Patient: 22 years old, no chronic diseases, not taking any medication. test results:
        WBC: 6.2 
        RBC: 4.9
        HGB: 14.5
        }
    ]
}