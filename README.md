# 🦅 LexiPDF

**A modern PDF reader with text selection, translation, and vocabulary management.**

LexiPDF is a PDF reading application developed under the **IT FOR ALL** brand. Its goal is to make reading and understanding documents in foreign languages easier by combining PDF viewing, text selection, translation, and vocabulary management in one application.

> **Current status:** Milestone 1 — PDF upload, document viewer, and text selection.

---

## ✨ Features

### Implemented
- 📄 Upload PDF documents
- 📖 View uploaded PDFs in the browser
- 🔎 Select text directly in the PDF
- 🌓 Light and dark mode
- 🗂️ Document list in the sidebar
- 🐳 Docker-based development environment
- 🗄️ PostgreSQL database integration
- ❤️ Backend health-check endpoints

### Planned
- 🌐 Translate selected text
- 📚 Display word definitions
- 📝 Save and manage vocabulary
- 🚀 Automated CI/CD pipeline
- ☸️ Kubernetes deployment

---

## 🏗️ Architecture

LexiPDF uses a containerized architecture with separate frontend, backend, and database services.

| Component | Technology | Purpose |
|---|---|---|
| Frontend | React, TypeScript, Vite | User interface and PDF viewer |
| Backend | Python, FastAPI | REST API and document handling |
| Database | PostgreSQL 16 | Document metadata and application data |
| Infrastructure | Docker Compose | Local development environment |

### Application endpoints

| Service | URL |
|---|---|
| Frontend | [http://localhost:3000](http://localhost:3000) |
| Backend API | [http://localhost:8000](http://localhost:8000) |
| API documentation |
