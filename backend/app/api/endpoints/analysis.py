from fastapi import APIRouter, HTTPException
from app.db.mock_db import db
from typing import Dict, Any

router = APIRouter()

from app.agents.llm_explainer import LLMExplainerAgent
from app.schemas_explanation import ExplanationRequest

explainer_agent = LLMExplainerAgent()

@router.get("/game/{game_id}/analysis")
async def get_game_analysis(game_id: str) -> Dict[str, Any]:
    """
    Retrieve the analysis for a specific game.
    """
    analysis = db.get_analysis(game_id)
    if not analysis:
        # Check if game exists
        game = db.get_game(game_id)
        if not game:
            raise HTTPException(status_code=404, detail="Game not found")
        return {"status": "Analysis pending or not started"}
    
    return analysis

@router.post("/explain/move")
async def explain_move(request: ExplanationRequest) -> Dict[str, Any]:
    """
    Generate an explanation for a specific move context.
    """
    return explainer_agent.explain_move(
        request.fen,
        request.move_san,
        request.best_move_san,
        request.evaluation,
        request.archetype
    )
