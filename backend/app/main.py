
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.startup import on_startup
from app.routers import health, documents, vocabulary

app = FastAPI(title="LexiPDF API", version="0.1.0")

app.add_event_handler("startup", on_startup)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(documents.router)
app.include_router(vocabulary.router)

