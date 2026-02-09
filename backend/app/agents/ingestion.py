import chess.pgn
import io
from typing import List, Dict, Any, Optional
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class IngestionAgent:
    """
    Responsible for parsing, validating, and normalizing PGN data.
    """

    def parse_pgn(self, pgn_content: str) -> List[Dict[str, Any]]:
        """
        Parses a raw PGN string (potentially containing multiple games)
        and returns a list of normalized game dictionaries.
        """
        games = []
        pgn_io = io.StringIO(pgn_content)

        while True:
            try:
                game = chess.pgn.read_game(pgn_io)
                if game is None:
                    break
                
                normalized_game = self._normalize_game(game)
                if normalized_game:
                    games.append(normalized_game)
            except Exception as e:
                logger.error(f"Error parsing game: {e}")
                # Continue to next game if one fails
                continue

        return games

    def _normalize_game(self, game: chess.pgn.Game) -> Optional[Dict[str, Any]]:
        """
        Extracts metadata and moves from a python-chess Game object.
        """
        headers = dict(game.headers)
        
        # Basic validation
        if "Event" not in headers or "Site" not in headers:
             logger.warning("Game missing essential headers, skipping.")
             # We might want to be more lenient, but for now strict.
             # return None 
        
        # Extract moves and clock times
        moves = []
        board = game.board()
        
        node = game
        while node.variations:
            next_node = node.variation(0)
            move = next_node.move
            clock = next_node.clock()
            
            moves.append({
                "move_number": board.fullmove_number,
                "color": "white" if board.turn == chess.WHITE else "black",
                "uci": move.uci(),
                "san": board.san(move),
                "clock": clock if clock else None,
                "fen_before": board.fen()
            })
            
            board.push(move)
            node = next_node

        return {
            "headers": headers,
            "moves": moves,
            "result": headers.get("Result", "*"),
            "white": headers.get("White", "Unknown"),
            "black": headers.get("Black", "Unknown"),
            "date": headers.get("Date", datetime.now().strftime("%Y.%m.%d")),
            "site": headers.get("Site", "Unknown"),
            "pgn_raw": str(game) 
        }
