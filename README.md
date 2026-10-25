# LexiPDF

PDF-Reader mit Wortauswahl, Übersetzung und Vokabelliste.  
Aktueller Stand: Milestone 1 — Upload, Viewer, Wortauswahl.

## Voraussetzungen

- Docker und Docker Compose

## Start

```bash
cp .env.example .env
# POSTGRES_PASSWORD in .env setzen

docker compose up --build
```

Frontend: http://localhost:3000  
Backend API: http://localhost:8000  
Health: http://localhost:8000/health  
DB-Health: http://localhost:8000/health/db

## Tests (Backend)

```bash
cd backend
pip install -r requirements.txt
pytest tests/
```

## Stop

```bash
docker compose down         # Container stoppen
docker compose down -v      # + Volumes löschen (Daten weg)
```

## Nächste Milestones

- **Milestone 2:** Wortauswahl → `/api/lookup` → Übersetzung + Definition
- **Milestone 3:** Vokabelliste speichern, abrufen, löschen
- **Milestone 4:** CI/CD, Container Registry, Kubernetes
