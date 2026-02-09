from fastapi import APIRouter, HTTPException, BackgroundTasks
from app.schemas import PGNUploadRequest, PGNUploadResponse, GameResponse
from app.agents.ingestion import IngestionAgent
import uuid

router = APIRouter()
ingestion_agent = IngestionAgent()

from app.services.analysis_service import analyze_game_task

@router.post("/upload/pgn", response_model=PGNUploadResponse)
async def upload_pgn(request: PGNUploadRequest, background_tasks: BackgroundTasks):
    """
    Upload a PGN file content. It will be parsed and queued for analysis.
    """
    try:
        games = ingestion_agent.parse_pgn(request.pgn_content)
        
        response_games = []
        for game_data in games:
            # For now, we simulate an ID
            game_id = str(uuid.uuid4())
            game_data['id'] = game_id
            
            # Save raw game to DB
            from app.db.mock_db import db
            db.save_game(game_id, game_data)

            # Queue Analysis Task
            background_tasks.add_task(analyze_game_task, game_id, game_data['pgn_raw'])

            response_games.append(GameResponse(
                id=game_id,
                white=game_data['white'],
                black=game_data['black'],
                result=game_data['result'],
                date=game_data['date'],
                site=game_data['site'],
                move_count=len(game_data['moves'])
            ))
            
        return PGNUploadResponse(
            processed_count=len(games),
            games=response_games
        )

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
