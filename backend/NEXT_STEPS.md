# Next Steps & Configuration Guide

You have a working local backend! To make it production-ready and fully featured, follow these steps:

## 1. Firebase Authentication & Database
Currently, the app uses a **MockDB** (in-memory). To persist data:
1.  Go to [Firebase Console](https://console.firebase.google.com/).
2.  Create a project -> **Project Settings** -> **Service Accounts**.
3.  Click **Generate new private key**.
4.  Save the file as `firebase-adminsdk.json` in the `backend/` folder.
5.  Update `backend/app/db/mock_db.py` to use `firebase-admin` (I've left the structure ready for you to swap).

## 2. OpenRouter (LLM) Setup
To enable move explanations:
1.  Get an API Key from [openrouter.ai](https://openrouter.ai/).
2.  Open `backend/.env`.
3.  Set `OPENROUTER_API_KEY=sk-or-v1-...`.

## 3. Enable Human-Like AI (Maia)
To see "What would a human play here?":
1.  Download **LC0** (Leela Chess Zero) binary for Windows.
    - Place `lc0.exe` in `backend/lc0/` folder.
2.  Download **Maia Weights** (e.g., `maia-1900.pb.gz`).
    - Place in `backend/models/`.
3.  Update `.env`:
    ```
    LC0_PATH=./backend/lc0/lc0.exe
    MAIA_MODEL_PATH=./backend/models/maia-1900.pb.gz
    ```

## 4. Connect Frontend
Your Next.js frontend calls should point to:
- `http://localhost:8000/api/v1`

Example:
```javascript
const res = await fetch('http://localhost:8000/api/v1/upload/pgn', {
  method: 'POST',
  body: JSON.stringify({ pgn_content: "..." }),
  headers: { 'Content-Type': 'application/json' }
});
```
