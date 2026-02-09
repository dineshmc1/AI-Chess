import sys
import os

# Add backend to path manually to make 'app' importable
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir) # d:\...\ai-chess-coach\backend ideally? 
# No, if file is in backend/, parent is ai-chess-coach/.
# If I want to import 'app', 'app' is in 'backend/'.
# So I need to add 'backend/' to sys.path?
# If I add '.../ai-chess-coach', then 'import backend.app' works.
# If I add '.../ai-chess-coach/backend', then 'import app' works.

sys.path.append(current_dir) # Add backend/ to path

print(f"Added {current_dir} to sys.path")

try:
    from app.core.config import get_settings
    print("Import successful")
    s = get_settings()
    print("Settings loaded successfully")
    print("Project Name:", s.PROJECT_NAME)
    print("Stockfish Path:", s.STOCKFISH_PATH)
except Exception as e:
    print(f"Error loading settings: {e}")
    import traceback
    traceback.print_exc()
