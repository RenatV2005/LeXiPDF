from sqlalchemy import Column, Integer, String, DateTime, func
from app.db import Base

class VocabularyEntry(Base):
    __tablename__ = "vocabulary"

    id = Column(Integer, primary_key=True, index=True)
    word = Column(String, nullable=False)
    translation = Column(String, nullable=True)
    definition = Column(String, nullable=True)
    word_type = Column(String, nullable=True)
    example = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
