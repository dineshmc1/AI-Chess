import chess
import chess.engine
import logging
from app.core.config import get_settings
from typing import Optional, Dict, Any

logger = logging.getLogger(__name__)
settings = get_settings()

class AnalysisAgent:
    """
    Manages interactions with Stockfish and Maia (LC0).
    """
    def __init__(self):
        self.stockfish_path = settings.STOCKFISH_PATH
        self.lc0_path = settings.LC0_PATH
        self.maia_weights = settings.MAIA_MODEL_PATH

    async def analyze_position(self, board: chess.Board, time_limit: float = 0.1) -> Dict[str, Any]:
        """
        Runs engine analysis on the given board state.
        """
        sf_result = await self._run_stockfish(board, time_limit)
        maia_result = await self._run_maia(board)
        
        return {
            "stockfish": sf_result,
            "maia": maia_result
        }

    async def _run_stockfish(self, board: chess.Board, time_limit: float) -> Dict[str, Any]:
        try:
            # We use the SimpleEngine context manager for each call or manage a persistent process
            # For simplicity/restartability, we open/close, but for perf we should keep it open.
            # python-chess recommends strict management.
            transport, engine = await chess.engine.popen_uci(self.stockfish_path)
            
            try:
                # Get evaluation and best move
                info = await engine.analyse(board, chess.engine.Limit(time=time_limit))
                best_move_info = await engine.play(board, chess.engine.Limit(time=time_limit))
                
                score = info["score"].white() if "score" in info else None
                eval_cp = score.score() if score and not score.is_mate() else None
                mate = score.mate() if score and score.is_mate() else None
                
                return {
                    "best_move": best_move_info.move.uci() if best_move_info.move else None,
                    "eval_cp": eval_cp,
                    "mate": mate,
                    "depth": info.get("depth", 0),
                    "nodes": info.get("nodes", 0)
                }

            finally:
                await engine.quit()
        
        except FileNotFoundError:
            logger.error(f"Stockfish binary not found at {self.stockfish_path}")
            return {"error": "Stockfish not found"}
        except Exception as e:
            logger.error(f"Stockfish error: {e}")
            return {"error": str(e)}

    async def _run_maia(self, board: chess.Board) -> Dict[str, Any]:
        """
        Runs Maia (LC0) to see what the 'human' move would be.
        Maia is trained to predict human moves, not necessarily best moves.
        """
        try:
            # Maia runs via LC0 with a specific weights file
            transport, engine = await chess.engine.popen_uci(self.lc0_path)
            
            try:
                # Configure LC0 to use the Maia weights
                await engine.configure({"WeightsFile": self.maia_weights})
                
                # Maia usually just needs to predict the move, low nodes is fine
                result = await engine.play(board, chess.engine.Limit(nodes=1))
                
                return {
                    "best_move": result.move.uci() if result.move else None
                }
            finally:
                await engine.quit()

        except FileNotFoundError:
            logger.warning(f"LC0 binary not found at {self.lc0_path}. Skipping Maia analysis.")
            return {"error": "LC0 not found", "best_move": None}
        except Exception as e:
            logger.error(f"Maia/LC0 error: {e}")
            return {"error": str(e), "best_move": None}
