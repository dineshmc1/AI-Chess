from app.agents.ingestion import IngestionAgent
import json

sample_pgn = """
[Event "FIDE World Cup 2023"]
[Site "Baku AZE"]
[Date "2023.08.24"]
[Round "8.3"]
[White "Carlsen, Magnus"]
[Black "Praggnanandhaa, R"]
[Result "1-0"]
[ECO "C42"]
[WhiteElo "2835"]
[BlackElo "2690"]

1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nf3 Nxe4 5. d4 d5 6. Bd3 Bd6 7. O-O O-O 8. c4 c6 9. Re1 Bf5 10. Qb3 Qd7 11. Nc3 Nxc3 12. Bxf5 Qxf5 13. bxc3 b6 14. cxd5 cxd5 15. Qb5 Qd7 16. a4 Qxb5 17. axb5 a5 18. bxa6 Rxa6 19. Rb1 Nd7 20. Rb5 Nf6 21. Bg5 Ne4 22. Rxd5 f6 23. Rxe4 fxg5 24. Rxd6 Ra1+ 25. Ne1 1-0
"""

agent = IngestionAgent()
games = agent.parse_pgn(sample_pgn)

print(f"Parsed {len(games)} games")
if games:
    print(json.dumps(games[0]["moves"][:5], indent=2))
    print("Result:", games[0]["result"])
