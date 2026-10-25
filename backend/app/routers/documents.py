import os
import uuid
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from fastapi.responses import FileResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db import get_db
from app.models.document import Document

router = APIRouter(prefix="/api/documents")

UPLOAD_DIR = os.environ.get("UPLOAD_DIR", "/uploads")
MAX_FILE_SIZE = int(os.environ.get("MAX_FILE_SIZE_MB", "20")) * 1024 * 1024

@router.post("")
async def upload_document(
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
):
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are accepted.")

    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="File too large.")
    if content[:4] != b"%PDF":
        raise HTTPException(status_code=400, detail="Invalid PDF file.")

    stored_name = f"{uuid.uuid4()}.pdf"
    path = os.path.join(UPLOAD_DIR, stored_name)
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    with open(path, "wb") as f:
        f.write(content)

    doc = Document(
        filename=stored_name,
        original_name=file.filename,
        file_size=len(content),
    )
    db.add(doc)
    await db.commit()
    await db.refresh(doc)
    return {"id": doc.id, "name": doc.original_name, "size": doc.file_size}

@router.get("")
async def list_documents(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Document).order_by(Document.created_at.desc()))
    docs = result.scalars().all()
    return [{"id": d.id, "name": d.original_name, "size": d.file_size} for d in docs]

@router.get("/{doc_id}/file")
async def serve_document(doc_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Document).where(Document.id == doc_id))
    doc = result.scalar_one_or_none()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found.")
    path = os.path.join(UPLOAD_DIR, doc.filename)
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="File not found on disk.")
    return FileResponse(path, media_type="application/pdf", filename=doc.original_name)
