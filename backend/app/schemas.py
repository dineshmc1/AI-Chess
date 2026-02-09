from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class PGNUploadRequest(BaseModel):
    pgn_content: str

class GameResponse(BaseModel):
    id: str
    white: str
    black: str
    result: str
    date: str
    site: str
    move_count: int

class PGNUploadResponse(BaseModel):
    processed_count: int
    games: List[GameResponse]
