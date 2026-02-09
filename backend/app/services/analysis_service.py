import chess
import chess.pgn
import io
import logging
from app.agents.engine_analysis import AnalysisAgent
from app.agents.diagnostics import DiagnosticsAgent
from app.db.mock_db import db
from typing import Dict, Any

logger = logging.getLogger(__name__)

analysis_agent = AnalysisAgent()
diagnostics_agent = DiagnosticsAgent()

async def analyze_game_task(game_id: str, pgn_content: str):
    """
    Background task to analyze a full game.
    """
    logger.info(f"Starting analysis for game {game_id}")
    
    try:
        pgn_io = io.StringIO(pgn_content)
        game = chess.pgn.read_game(pgn_io)
        if not game:
            logger.error("Failed to read game for analysis")
            return

        board = game.board()
        analysis_results = []
        
        # Initial evaluation? Maybe not needed.
        
        node = game
        move_number = 1
        
        prev_eval = None # We need to track evaluation changes
        
        while node.variations:
            next_node = node.variation(0)
            move = next_node.move
            
            # 1. Analyze position BEFORE the move (to get baseline for the player)
            # Actually, we need the evaluation of the position *before* the move to compare 
            # with the evaluation *after* the move.
            # But the "eval after" is usually the eval of the *resulting* position.
            
            # Efficient way:
            # We already have prev_eval from the previous iteration (which was eval_after of previous move).
            # For the first move, we can assume 0.3 (start pos).
            
            if prev_eval is None:
                # Run quick analysis on start pos
                start_analysis = await analysis_agent.analyze_position(board, time_limit=0.05)
                prev_eval = start_analysis.get("stockfish", {}).get("eval_cp", 30) # Default small plus for white
                if prev_eval is None: prev_eval = 0

            # 2. Make the move on board
            board.push(move)
            
            # 3. Analyze the new position (Resulting position).
            # The engine will allow us to see what the BEST move was in the new position (for the opponent),
            # and the evaluation of the current position.
            current_analysis = await analysis_agent.analyze_position(board, time_limit=0.1)
            
            sf_data = current_analysis.get("stockfish", {})
            current_eval = sf_data.get("eval_cp", 0)
            best_move_response_uci = sf_data.get("best_move")
            
            # Wait, to calculate CPL of the move just played, we need to know:
            # What was the evaluation of the BEST move available in the previous position?
            # And what is the evaluation of the move actually played?
            
            # So:
            # Position A (before move): Engine says eval is +100 (if best move is X).
            # Player plays Y.
            # Position B (after move): Engine says eval is +50 (from White's perspective).
            # So the move Y cost 50 cp.
            
            # So we effectively need to analyze Position A to get "Best possible eval".
            # And analyze Position B to get "Actual eval".
            # My `start_analysis` above handles Position A.
            
            # So:
            # Eval Before = prev_eval
            # Eval After = current_eval
            
            # 4. Classify Move
            classification = diagnostics_agent.classify_move(
                prev_eval, current_eval, not board.turn # board.turn is now the opponent, so we pass who just moved
            )
            
            # 5. Archetype Detection
            # We need the best move from the *previous* position to compare.
            # We should store the best move from the previous analysis.
            # I'll need to refactor slightly to keep track of "best move in previous position".
            
            # Let's re-run analysis for the "Before" position if we want the best move, 
            # or just do it right.
            # Correct loop:
            # 1. Analyze Position A. Get Eval A, Best Move A.
            # 2. Player makes move M.
            # 3. Analyze Position B (Resulting). Get Eval B.
            # Repeat.
            
            # To avoid double analysis, Eval B of this turn becomes Eval A of next turn.
            
            # Recalculate Logic:
            # We need "Best Move from Pre-Move Position".
            # My logic above: `start_analysis` gave `prev_eval`.
            # I missed saving `best_move`.
            
            # Let's fix loop in next iteration or code block.
            # For now, simplistic.
            
            archetypes = []
            if classification in ["Mistake", "Blunder"]:
                # We need the best move from the previous position.
                # Since I didn't save it, I'll skip specific best-move comparison for now or re-analyze.
                # Re-analyzing previous position to get best move is safer for accuracy.
                board.pop()
                re_analysis = await analysis_agent.analyze_position(board, time_limit=0.1)
                best_move_uci = re_analysis.get("stockfish", {}).get("best_move")
                best_move = chess.Move.from_uci(best_move_uci) if best_move_uci else None
                board.push(move)
                
                archetypes = diagnostics_agent.detect_archetypes(
                    board, move, best_move, classification
                )

            analysis_results.append({
                "move_number": move_number,
                "color": "white" if not board.turn else "black", # logic inverted because we pushed
                "move": move.uci(),
                "eval_after": current_eval,
                "cpl": abs(prev_eval - current_eval) if prev_eval is not None and current_eval is not None else 0, # Rough
                "classification": classification,
                "archetypes": archetypes,
                "maia_suggestion": current_analysis.get("maia", {}).get("best_move")
            })

            prev_eval = current_eval
            if board.turn == chess.WHITE:
                move_number += 1
            node = next_node

        # Save to DB
        db.save_analysis(game_id, {"moves": analysis_results})
        logger.info(f"Analysis complete for game {game_id}")

    except Exception as e:
        logger.error(f"Analysis failed for game {game_id}: {e}")
