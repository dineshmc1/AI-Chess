try:
    import fastapi
    print("fastapi OK")
    import pydantic
    print("pydantic OK")
    import chess
    print("chess OK")
    import httpx
    print("httpx OK")
    from fastapi.testclient import TestClient
    print("TestClient OK")
except ImportError as e:
    print(f"ImportError: {e}")
