import chess
from typing import Dict, Any, Optional, List

class DiagnosticsAgent:
    """
    Rule-based logic for move classification and blunder archetype detection.
    """

    def classify_move(self, eval_before: float, eval_after: float, moved_color: chess.Color) -> str:
        """
        Classifies a move based on Centipawn Loss (CPL).
        We assume evals are Centipawns relative to White.
        """
        if eval_before is None or eval_after is None:
            return "Unknown"

        # Calculate CPL
        # If White moved:
        #   Eval Before: +100 (White is winning)
        #   Eval After: +50 (White is still winning but less so)
        #   Loss: 50
        # If Black moved:
        #   Eval Before: +100 (White is winning / Black is losing)
        #   Eval After: +150 (White is winning more / Black blundered)
        #   Loss: (Eval After - Eval Before) = +50 (from White's perspective, wait)
        
        # CPL should always be positive for the side moving (loss of advantage).
        # We need to know who moved.
        
        if moved_color == chess.WHITE:
            loss = eval_before - eval_after
        else:
            loss = eval_after - eval_before
            
        # Handle mate scores? (Usually represented as large numbers or Inf)
        # Ensuring we don't crash on None or weird values
        
        if loss < 0:
             # Improved position (player found better move than engine expectation? Impossible for Stockfish usually, but simple engine depth differences might cause this)
             loss = 0

        if loss <= 10:
            return "Best"
        elif loss <= 25:
            return "Excellent"
        elif loss <= 50:
            return "Good"
        elif loss <= 100:
            return "Inaccuracy"
        elif loss <= 250:
            return "Mistake"
        else:
            return "Blunder"

    def detect_archetypes(self, board: chess.Board, move: chess.Move, engine_best_move: chess.Move, move_classification: str) -> List[str]:
        """
        Detects specific blunder archetypes based on rules.
        """
        archetypes = []
        
        if move_classification not in ["Mistake", "Blunder"]:
            return archetypes
            
        # logical checks
        
        # 1. Tunnel Vision Check:
        # If piece captured was on one side (e.g. a-d file) but a better capture was on (e-h file).
        # Very rough heuristic.
        from_file = chess.square_file(move.from_square)
        to_file = chess.square_file(move.to_square)
        
        if engine_best_move:
            best_from = chess.square_file(engine_best_move.from_square)
            best_to = chess.square_file(engine_best_move.to_square)
            
            # If actual move is on queenside (files 0-3) and best move is kingside (files 4-7)
            if (to_file < 4 and best_to >= 4) or (to_file >= 4 and best_to < 4):
                 archetypes.append("Tunnel Vision")
                 
        # 2. Desperado Miss
        # If we moved a piece that was attacked, but engine wanted us to sacrifice it.
        if board.is_attacked_by(not board.turn, move.from_square):
            # We moved a piece that was under attack.
            # Did engine suggest a move with a DIFFERENT piece?
            if engine_best_move and engine_best_move.from_square != move.from_square:
                 archetypes.append("Desperado Miss")
                 
        # 3. Ghost Threat
        # If we made a prophylactic pawn move (a3, h3, a6, h6) but engine says we should have improved piece activity.
        # Check if move is a pawn move to edges?
        pass # Todo: Refine this logic with more board state analysis
        
        return archetypes

