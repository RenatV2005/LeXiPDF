# 🦅 LexiPDF – IT FOR ALL

Moderner PDF-Reader mit Textauswahl, Übersetzung und geplanter Vokabelverwaltung.

## 🏗️ Tech Stack & DevOps

- **Frontend:** React, TypeScript, Vite
- **Backend:** Python, FastAPI
- **Database:** PostgreSQL 16
- **Containerisierung:** Docker, Docker Compose
- **Automation:** Ansible
- **Container Registry:** GitHub Container Registry (GHCR)
- **CI/CD:** GitHub Actions
- **Deployment:** Self-hosted GitHub Actions Runner
- **Secrets:** GitHub Actions Repository Secrets

## ⚙️ Infrastruktur & Deployment

Die Anwendung verwendet eine automatisierte CI/CD-Pipeline:

1. GitHub Actions führt Tests aus und erstellt Docker Images.
2. Die Images werden in GHCR veröffentlicht.
3. Nach erfolgreicher CI startet der CD-Workflow.
4. Der Self-hosted Runner führt das Ansible-Deployment aus.
5. Ansible verbindet sich per SSH mit den Servern und deployed die Container über Docker Compose.

## 🚀 Self-hosted GitHub Actions Runner installieren

Der Runner wird auf dem Debian-Host installiert und führt die CD-Workflows direkt in der eigenen Infrastruktur aus.

### 1. Runner in GitHub erstellen

Im GitHub-Repository:

`Settings → Actions → Runners → New self-hosted runner`

Folgende Einstellungen auswählen:

- Operating System: Linux
- Architecture: x64

GitHub zeigt anschließend die passenden Installations- und Konfigurationsbefehle an.

### 2. Runner installieren und konfigurieren

Die von GitHub angezeigten Download- und Konfigurationsbefehle auf dem Debian-Host ausführen.

Anschließend den Runner als Systemdienst installieren und starten:

```bash
sudo ./svc.sh install
sudo ./svc.sh start
```

Status überprüfen:

```bash
sudo ./svc.sh status
```

### 3. Voraussetzungen für CD

Auf dem Runner-Host müssen folgende Komponenten verfügbar sein:

- Docker Engine
- Docker Compose Plugin
- Ansible
- Ansible Collection `community.docker`
- SSH-Zugang zu den Deployment-Servern

Der Runner muss online sein und die Labels `self-hosted`, `Linux` und `X64` besitzen.

### 4. GitHub Secrets konfigurieren

Unter:

`Settings → Secrets and variables → Actions`

Folgende Repository Secrets hinterlegen:

| Secret | Zweck |
|---|---|
| `GHCR_TOKEN` | Zugriff auf private GHCR Images |
| `ANSIBLE_SSH_PRIVATE_KEY` | SSH-Authentifizierung für die Deployment-Server |

Die Secrets dürfen niemals im Repository gespeichert werden.

## 📂 Projektstatus

**Aktueller Meilenstein:** PDF-Upload, Dokumentenanzeige und Textauswahl.

Geplant:
- Übersetzung ausgewählter Texte
- Wortdefinitionen
- Vokabelverwaltung
- Kubernetes-Deployment

---

**Developed under the IT FOR ALL brand.**