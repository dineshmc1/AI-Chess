from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

settings = get_settings()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set all CORS enabled origins
if settings.CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

@app.get("/")
def root():
    return {"message": "Welcome to AI Chess Coach Backend", "version": settings.VERSION}

@app.get("/health")
def health_check():
    return {"status": "ok"}

from app.api.endpoints import games, analysis
app.include_router(games.router, prefix=settings.API_V1_STR, tags=["games"])
app.include_router(analysis.router, prefix=settings.API_V1_STR, tags=["analysis"])
