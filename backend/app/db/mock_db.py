from typing import Dict, Any, Optional

class MockDB:
    def __init__(self):
        self.games = {}
        self.analysis = {}

    def save_game(self, game_id: str, game_data: Dict[str, Any]):
        self.games[game_id] = game_data

    def get_game(self, game_id: str) -> Optional[Dict[str, Any]]:
        return self.games.get(game_id)
    
    def save_analysis(self, game_id: str, analysis_data: Dict[str, Any]):
        self.analysis[game_id] = analysis_data
        
    def get_analysis(self, game_id: str) -> Optional[Dict[str, Any]]:
        return self.analysis.get(game_id)

# Global instance for simulation
db = MockDB()
