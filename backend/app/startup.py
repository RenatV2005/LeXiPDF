# Wird von main.py beim Start aufgerufen
from app.db import init_db

async def on_startup():
    await init_db()
