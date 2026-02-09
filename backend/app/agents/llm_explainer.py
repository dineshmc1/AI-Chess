from openai import OpenAI
from app.core.config import get_settings
import logging
from typing import Optional, Dict, Any

logger = logging.getLogger(__name__)
settings = get_settings()

class LLMExplainerAgent:
    """
    Wrapper for OpenRouter API to generate chess explanations.
    Uses DeepSeek R1 or similar models.
    """
    def __init__(self):
        self.client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=settings.OPENROUTER_API_KEY,
        )
        self.model = settings.LLM_MODEL_NAME

    def explain_move(self, fen: str, move_san: str, best_move_san: str, evaluation: str, archetype: Optional[str] = None) -> Dict[str, Any]:
        """
        Generates a natural language explanation for a specific move.
        """
        try:
            prompt = self._construct_prompt(fen, move_san, best_move_san, evaluation, archetype)
            
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a world-class chess coach. Explain the move clearly and concisely. Focus on the 'why', not just the 'what'. Use a supportive but objective coaching tone. Do NOT use markdown or complex formatting in the output JSON, just plain text for the explanation."},
                    {"role": "user", "content": prompt}
                ],
                # response_format={"type": "json_object"} # DeepSeek R1 might support this, but safe to ask for JSON in prompt
            )
            
            content = response.choices[0].message.content
            # We assume the content is the explanation. 
            # Ideally we parse JSON if we enforced it.
            
            return {
                "explanation": content,
                "confidence": 0.9 # Placeholder
            }
            
        except Exception as e:
            logger.error(f"LLM generation failed: {e}")
            return {"error": str(e)}

    def _construct_prompt(self, fen: str, move_san: str, best_move_san: str, evaluation: str, archetype: Optional[str]) -> str:
        base = f"""
        Analyze the following chess position and move:
        FEN: {fen}
        Player Move: {move_san}
        Engine Best Move: {best_move_san}
        Current Position Evaluation: {evaluation}
        """
        
        if archetype:
            base += f"\nDetected Pattern/Archetype: {archetype}\n"
            base += "Explain why this move fits the archetype and what the player missed."
        else:
            if move_san == best_move_san:
                base += "\nExplain why this was the best move."
            else:
                base += "\nExplain why the player's move was inferior to the engine's suggestion."
                
        base += "\nProvide a concise explanation (2-3 sentences max) and a coaching tip."
        return base
