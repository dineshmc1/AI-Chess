from pydantic import BaseModel
from typing import Optional

class ExplanationRequest(BaseModel):
    fen: str
    move_san: str
    best_move_san: str
    evaluation: str # e.g. "+1.5" or "Mate in 3"
    archetype: Optional[str] = None
