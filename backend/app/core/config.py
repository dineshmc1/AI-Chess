import os
from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    PROJECT_NAME: str = "AI Chess Coach Backend"
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    DEBUG: bool = True
    
    # Cors
    CORS_ORIGINS: list[str] = ["http://localhost:3000", "http://localhost:8000"]

    # Chess Engines
    STOCKFISH_PATH: str
    LC0_PATH: str = "lc0"  # Default to system path if not specified
    MAIA_MODEL_PATH: str

    # Firebase
    FIREBASE_CREDENTIALS_PATH: str

    # Celery / Redis
    CELERY_BROKER_URL: str
    CELERY_RESULT_BACKEND: str

    # LLM
    OPENROUTER_API_KEY: str
    LLM_MODEL_NAME: str = "deepseek/deepseek-r1"

    # Stripe
    STRIPE_SECRET_KEY: str
    STRIPE_WEBHOOK_SECRET: str
    
    # Lichess
    LICHESS_API_URL: str = "https://lichess.org/api"

    class Config:
        env_file = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), ".env")
        env_file_encoding = "utf-8"
        case_sensitive = True
        extra = "ignore"

@lru_cache()
def get_settings() -> Settings:
    return Settings()
