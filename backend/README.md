# AI Chess Coach - Backend

This is the backend service for the AI Chess Coach platform, built with **FastAPI**, **python-chess**, and **Stockfish**. It provides deep chess diagnostics, rule-based move classification, and LLM-powered explanations.

## 🚀 Features
- **PGN Ingestion**: Parse and normalize bulk PGN files.
- **Engine Analysis**: 
    - **Stockfish**: Objective evaluation and best moves.
    - **Maia (LC0)**: Human-move prediction (optional).
- **Diagnostics**:
    - **Move Classification**: Brilliant, Great, Inaccuracy, Mistake, Blunder (CPL based).
    - **Archetype Detection**: Identifies patterns like "Tunnel Vision" or "Desperado Miss".
- **LLM Explainer**: Generates natural language coaching tips using DeepSeek R1 (via OpenRouter).

## 🛠️ Prerequisites
- **Python 3.11+**
- **Stockfish Binary**: Download from [stockfishchess.org](https://stockfishchess.org/download/) and place in `stockfish-windows-x86-64-avx2/stockfish/`.
- **(Optional) LC0 Binary & Maia Weights**: Required for human-move prediction.
- **OpenRouter API Key**: For LLM explanations.
- **Firebase Admin Credentials**: `firebase-adminsdk.json` (mocked by default for local dev).

## ⚙️ Setup

1.  **Install Dependencies**:
    ```bash
    cd backend
    pip install -r requirements.txt
    ```

2.  **Configure Environment**:
    - Copy `.env.example` to `.env`.
    - Update paths and API keys.
    ```bash
    cp .env.example .env
    ```
    - **Critical**: Ensure `STOCKFISH_PATH` points to your local executable.

3.  **Run the Server**:
    ```bash
    # From the backend directory
    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
    ```
    *Note: You may need to set PYTHONPATH if running from root:*
    ```powershell
    $env:PYTHONPATH="path\to\backend"; uvicorn app.main:app --reload
    ```

## 📡 API Endpoints

### 1. Upload Game (PGN)
**POST** `/api/v1/upload/pgn`
- **Body**: `{"pgn_content": "..."}`
- **Response**: Returns Game ID. Analysis starts in background.

### 2. Get Analysis
**GET** `/api/v1/game/{game_id}/analysis`
- **Response**: Full move-by-move analysis with CPL, classification, and archetypes.

### 3. Explain Move
**POST** `/api/v1/explain/move`
- **Body**: `{ "fen": "...", "move_san": "e4", ... }`
- **Response**: Natural language explanation.

## 🧪 Running Tests
```bash
python -m backend.test_full_flow
```
(Ensure `backend` is in your PYTHONPATH).
