from fastapi.testclient import TestClient
import json
try:
    from app.main import app
except ImportError:
    from backend.app.main import app

client = TestClient(app)

def test_explanation_endpoint():
    payload = {
        "fen": "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
        "move_san": "e5",
        "best_move_san": "e5",
        "evaluation": "+0.1",
        "archetype": None
    }
    
    response = client.post("/api/v1/explain/move", json=payload)
    print("Status Code:", response.status_code)
    print("Response:", response.json())
    
    # We expect it to might fail if API key is invalid, but structure should be correct.
    # If the key is "your_openrouter_api_key_here", it will definitely return an error from OpenRouter or timeout.
    
if __name__ == "__main__":
    test_explanation_endpoint()
