<div align="center">

# 🏥 MedicalAnalyzer

> **AI-Powered Medical Analysis Platform**  
> blood test interpretation and X-ray analysis using specialized MedGemma-4B model

[![FastAPI](https://img.shields.io/badge/FastAPI-0.118.0-green.svg?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg?style=for-the-badge&logo=react)](https://reactjs.org)
[![Ollama](https://img.shields.io/badge/Ollama-MedGemma-1f6feb.svg?style=for-the-badge&logo=ollama)](https://ollama.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg?style=for-the-badge&logo=docker)](https://www.docker.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.18-38B2AC.svg?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB.svg?style=for-the-badge&logo=python)](https://python.org)

</div>

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/00200200/MedicalAnalyzer.git
cd MedicalAnalyzer

# Build and run the application
docker compose build
docker compose up

# Pull the required AI model
docker compose exec ollama ollama pull edwardlo12/medgemma-4b-it-Q4_K_M
```

The application will be available at:

- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:8000`

## 🖥️ Application Showcase

<div align="center">

### 🏠 **Landing Page**

<img src="docs/landinpage_closer.png" alt="Landing Page" width="800" style="border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.3);">

---

### 🩸 **Blood Test Analysis Workflow**

<table>
<tr>
<td align="center" width="50%">
<strong>📝 Input Form</strong><br/>
<img src="docs/bloodtest_form.png" alt="Blood Test Form" width="400" style="border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.2);">
</td>
<td align="center" width="50%">
<strong>⏳ Processing</strong><br/>
<img src="docs/bloodtest_analysis_loading.png" alt="Blood Test Loading" width="400" style="border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.2);">
</td>
</tr>
<tr>
<td align="center" width="50%">
<strong>📊 Analysis Results (Part 1)</strong><br/>
<img src="docs/bloodtest_answer_part_1.png" alt="Blood Test Answer Part 1" width="400" style="border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.2);">
</td>
<td align="center" width="50%">
<strong>📈 Analysis Results (Part 2)</strong><br/>
<img src="docs/bloodtest_answer_part_2.png" alt="Blood Test Answer Part 2" width="400" style="border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.2);">
</td>
</tr>
</table>

---

### 🩻 **X-Ray Image Analysis Workflow**

<table>
<tr>
<td align="center" width="50%">
<strong>📤 Image Upload</strong><br/>
<img src="docs/image_form.png" alt="Image Analysis Form" width="400" style="border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.2);">
</td>
<td align="center" width="50%">
<strong>🔍 Processing</strong><br/>
<img src="docs/image_analysis_loading.png" alt="Image Analysis Loading" width="400" style="border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.2);">
</td>
</tr>
<tr>
<td align="center" colspan="2">
<strong>📋 Analysis Results</strong><br/>
<img src="docs/image_answer.png" alt="Image Analysis Result" width="600" style="border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.2);">
</td>
</tr>
</table>

</div>

## 🧠 How it Works

The application uses a specialized medical AI model (MedGemma-4B) to provide:

- **Blood Test Analysis**
- **X-Ray Image Analysis**

## 📡 API Endpoints

| Endpoint                 | Method | Description                |
| ------------------------ | ------ | -------------------------- |
| `/analyze_blood_results` | POST   | Analyze blood test results |
| `/analyze_image`         | POST   | Analyze X-ray images       |

## 📁 Project Structure

```
MedicalAnalyzer/
├── docker-compose.yml
├── docs/                    # Screenshots
├── backend/                 # FastAPI Backend
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── main.py
│   └── src/model/llm.py
└── frontend/               # React Frontend
    ├── Dockerfile
    ├── package.json
    ├── tailwind.config.js
    ├── public/
    └── src/
        ├── App.jsx
        ├── index.jsx
        ├── index.css
        └── components/
            ├── LandingPage.jsx
            ├── Home.jsx
            ├── ImageAnalyzer.jsx
            ├── Form.jsx
            ├── formatAnalysis.jsx
            ├── Header.jsx
            └── Footer.jsx
```

## 🛠️ Technology Stack

- **Frontend**: React 18, TailwindCSS, Axios
- **Backend**: FastAPI, Python 3.11+, Pydantic
- **AI Engine**: Ollama, MedGemma-4B
- **Infrastructure**: Docker, Docker Compose



## ⚠️ Disclaimer

This application is for **educational and demonstration purposes only**. It does not replace professional medical consultation. Always consult results with a doctor.

---

**PL**: Projekt na zaliczenie przedmiotu "Projektowanie systemów informatyki medycznej"
