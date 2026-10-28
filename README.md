# 🦅 LexiPDF

**Ein moderner PDF-Reader mit Textauswahl, Übersetzung und Vokabelverwaltung.**

LexiPDF ist eine PDF-Leseanwendung unter der Marke **IT FOR ALL**. Ziel des Projekts ist es, das Lesen und Verstehen fremdsprachiger Dokumente zu erleichtern, indem PDF-Anzeige, Textauswahl, Übersetzung und Vokabelverwaltung in einer Anwendung kombiniert werden.

> **Aktueller Entwicklungsstand:** Meilenstein 1 – PDF-Upload, Dokumentenanzeige und Textauswahl.

---

## ✨ Funktionen

### Bereits implementiert

- 📄 PDF-Dokumente hochladen
- 📖 Hochgeladene PDFs im Browser anzeigen
- 🔎 Text direkt im PDF markieren
- 🌓 Hell- und Dunkelmodus
- 🗂️ Dokumentenübersicht in der Seitenleiste
- 🐳 Docker-basierte Entwicklungsumgebung
- 🗄️ PostgreSQL-Datenbankintegration
- ❤️ Health-Check-Endpunkte für das Backend

### Geplant

- 🌐 Markierten Text übersetzen
- 📚 Wortdefinitionen anzeigen
- 📝 Vokabeln speichern und verwalten
- 🚀 Automatisierte CI/CD-Pipeline
- ☸️ Bereitstellung über Kubernetes

---

## 🏗️ Architektur

LexiPDF verwendet eine containerisierte Architektur mit getrennten Diensten für Frontend, Backend und Datenbank.

| Komponente | Technologie | Aufgabe |
|---|---|---|
| Frontend | React, TypeScript, Vite | Benutzeroberfläche und PDF-Viewer |
| Backend | Python, FastAPI | REST-API und Dokumentenverarbeitung |
| Datenbank | PostgreSQL 16 | Speicherung von Dokumentmetadaten und Anwendungsdaten |
| Infrastruktur | Docker Compose | Lokale Entwicklungsumgebung |

### Anwendungsendpunkte

| Dienst | URL |
|---|---|
| Frontend | [http://localhost:3000](http://localhost:3000) |
| Backend-API | [http://localhost:8000](http://localhost:8000) |
| API-Dokumentation | [http://localhost:8000/docs](http://localhost:8000/docs) |
| Backend-Health-Check | [http://localhost:8000/health](http://localhost:8000/health) |
| Datenbank-Health-Check | [http://localhost:8000/health/db](http://localhost:8000/health/db) |

---

## 🚀 Installation und Start

### Voraussetzungen

- Docker Engine
- Docker Compose
- Git

### 1. Repository klonen

```bash
git clone <DEINE_REPOSITORY_URL>
cd LexiPDF
```

Ersetze `<DEINE_REPOSITORY_URL>` durch die URL deines GitHub- oder Gitea-Repositories.

### 2. Umgebungsvariablen konfigurieren

Erstelle eine lokale `.env`-Datei:

```bash
cp .env.example .env
```

Öffne die Datei und setze einen sicheren Wert für `POSTGRES_PASSWORD`.

**Wichtig:** Die `.env`-Datei darf keine Passwörter oder andere Geheimnisse in das Git-Repository übertragen. Prüfe, dass sie in `.gitignore` ausgeschlossen ist.

### 3. Anwendung starten

Baue die Images und starte die Container im Hintergrund:

```bash
docker compose up --build -d
```

Status der Container überprüfen:

```bash
docker compose ps
```

Logs anzeigen:

```bash
docker compose logs -f
```

Anschließend ist die Anwendung unter [http://localhost:3000](http://localhost:3000) erreichbar.

---

## 🧪 Backend-Tests

Wechsle in das Backend-Verzeichnis:

```bash
cd backend
```

Installiere die Abhängigkeiten:

```bash
pip install -r requirements.txt
```

Führe die Tests aus:

```bash
pytest tests/
```

Für eine isolierte Python-Umgebung empfiehlt sich die Verwendung einer virtuellen Umgebung.

---

## 🛑 Anwendung stoppen

Container stoppen und entfernen, ohne benannte Volumes zu löschen:

```bash
docker compose down
```

Container entfernen und zusätzlich die zugehörigen benannten Volumes löschen:

```bash
docker compose down -v
```

**Achtung:** Der zweite Befehl kann gespeicherte PostgreSQL-Daten und hochgeladene PDFs dauerhaft löschen. Verwende ihn nur, wenn du die lokale Umgebung bewusst zurücksetzen möchtest.

---

## 🗺️ Entwicklungs-Roadmap

### Meilenstein 1 – PDF-Reader

- [x] PDF-Upload
- [x] PDF-Viewer
- [x] Textauswahl
- [x] Erste Benutzeroberfläche

### Meilenstein 2 – Übersetzung

- [ ] Markierten Text an `/api/lookup` senden
- [ ] Übersetzungen und Definitionen zurückgeben
- [ ] Ergebnisse im Übersetzungsbereich anzeigen
- [ ] Ladezustände und Fehlerbehandlung ergänzen

### Meilenstein 3 – Vokabelverwaltung

- [ ] Ausgewählte Wörter speichern
- [ ] Gespeicherte Vokabeln abrufen
- [ ] Vokabeleinträge löschen
- [ ] Vokabeln dauerhaft in PostgreSQL speichern

### Meilenstein 4 – DevOps und Deployment

- [ ] CI/CD-Pipeline automatisieren
- [ ] Container-Registry einrichten
- [ ] Automatisierte Build- und Testphasen
- [ ] Kubernetes-Deployment
- [ ] Persistente Speicherung und Backup-Konzept

---

## 🔐 Sicherheit und Datenspeicherung

- Zugangsdaten über Umgebungsvariablen verwalten.
- Die lokale `.env`-Datei nicht committen.
- Hochgeladene PDFs und Datenbankdaten persistent speichern.
- Backups einrichten, bevor wichtige Dokumente gespeichert werden.
- Berechtigungen für Container und gespeicherte Dateien auf das notwendige Minimum beschränken.

---

## 📌 Projektstatus

LexiPDF befindet sich in aktiver Entwicklung. Der aktuelle Schwerpunkt liegt auf einem zuverlässigen PDF-Upload und einer stabilen Dokumentenanzeige. Anschließend folgen Übersetzung und Vokabelverwaltung.

**Entwickelt unter der Marke IT FOR ALL.**
