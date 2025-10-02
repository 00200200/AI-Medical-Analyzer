## MedicalAnalyzer

Minimalna aplikacja: React (frontend) + FastAPI (backend), uruchamiana przez Docker.

### Wymagania

- Docker + Docker Compose

### Uruchomienie

```bash
docker compose build
docker compose up
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`

### Struktura

```
frontend/
  Dockerfile
  package.json
  public/index.html
  src/
    index.jsx
    App.jsx
    components/Home.jsx
backend/
  Dockerfile
  requirements.txt
  main.py
docker-compose.yml
.github/dependabot.yml
```

# MedicalAnalyzer
