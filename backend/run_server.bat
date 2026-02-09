@echo off
SET PYTHONPATH=%~dp0
echo PYTHONPATH set to %PYTHONPATH%
echo Starting FastAPI Server...
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
pause
