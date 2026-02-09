from fastapi.testclient import TestClient
try:
    from app.main import app
except ImportError:
    from backend.app.main import app
import time
import json

client = TestClient(app)

sample_pgn = """
[Event "Test Game"]
[Site "Local"]
[Date "2024.01.01"]
[Round "1"]
[White "Player1"]
[Black "Player2"]
[Result "1-0"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3 Nb8 10. d4 Nbd7 1-0
"""

def test_full_flow():
    # 1. Upload PGN
    response = client.post("/api/v1/upload/pgn", json={"pgn_content": sample_pgn})
    assert response.status_code == 200
    data = response.json()
    print("Upload Response:", json.dumps(data, indent=2))
    
    assert data["processed_count"] == 1
    game_id = data["games"][0]["id"]
    print(f"Game ID: {game_id}")
    
    # 2. Check Analysis
    # Since TestClient runs background tasks synchronously, analysis should be done.
    
    # Poll just in case (though not needed for TestClient usually)
    response = client.get(f"/api/v1/game/{game_id}/analysis")
    assert response.status_code == 200
    analysis = response.json()
    
    print("Analysis Response Key Count:", len(analysis.get("moves", [])))
    if "moves" in analysis:
        print("First Move Analysis:", json.dumps(analysis["moves"][0], indent=2))
        print("Last Move Analysis:", json.dumps(analysis["moves"][-1], indent=2))

if __name__ == "__main__":
    test_full_flow()
