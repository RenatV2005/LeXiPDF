from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel
from typing import Optional
from app.db import get_db
from app.models.vocabulary import VocabularyEntry

router = APIRouter(prefix="/api/vocabulary")

class VocabCreate(BaseModel):
    word: str
    translation: Optional[str] = None
    definition: Optional[str] = None
    word_type: Optional[str] = None
    example: Optional[str] = None

@router.post("")
async def add_word(entry: VocabCreate, db: AsyncSession = Depends(get_db)):
    row = VocabularyEntry(**entry.model_dump())
    db.add(row)
    await db.commit()
    await db.refresh(row)
    return {"id": row.id, "word": row.word}

@router.get("")
async def list_words(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(VocabularyEntry).order_by(VocabularyEntry.created_at.desc())
    )
    rows = result.scalars().all()
    return [
        {"id": r.id, "word": r.word, "translation": r.translation, "definition": r.definition}
        for r in rows
    ]

@router.delete("/{entry_id}")
async def delete_word(entry_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(VocabularyEntry).where(VocabularyEntry.id == entry_id))
    row = result.scalar_one_or_none()
    if not row:
        raise HTTPException(status_code=404, detail="Entry not found.")
    await db.delete(row)
    await db.commit()
    return {"deleted": entry_id}
