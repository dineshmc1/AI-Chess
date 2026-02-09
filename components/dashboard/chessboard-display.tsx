"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const PIECES: Record<string, string> = {
  K: "\u2654",
  Q: "\u2655",
  R: "\u2656",
  B: "\u2657",
  N: "\u2658",
  P: "\u2659",
  k: "\u265A",
  q: "\u265B",
  r: "\u265C",
  b: "\u265D",
  n: "\u265E",
  p: "\u265F",
};

function parseFEN(fen: string) {
  const rows = fen.split(" ")[0].split("/");
  const board: (string | null)[][] = [];
  for (const row of rows) {
    const boardRow: (string | null)[] = [];
    for (const ch of row) {
      if (/\d/.test(ch)) {
        for (let i = 0; i < parseInt(ch); i++) {
          boardRow.push(null);
        }
      } else {
        boardRow.push(ch);
      }
    }
    board.push(boardRow);
  }
  return board;
}

interface ChessboardDisplayProps {
  fen?: string;
  showControls?: boolean;
  size?: "sm" | "md" | "lg";
}

export function ChessboardDisplay({
  fen = "r1bqkb1r/pppppppp/2n2n2/8/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
  showControls = true,
  size = "md",
}: ChessboardDisplayProps) {
  const [moveIndex, setMoveIndex] = useState(0);
  const board = parseFEN(fen);

  const squareSize =
    size === "sm" ? "w-8 h-8 text-lg" : size === "lg" ? "w-14 h-14 text-3xl" : "w-10 h-10 text-2xl";

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="rounded-md border border-border overflow-hidden">
        {board.map((row, r) => (
          <div key={r} className="flex">
            {row.map((piece, c) => {
              const isLight = (r + c) % 2 === 0;
              return (
                <div
                  key={`${r}-${c}`}
                  className={`${squareSize} flex items-center justify-center ${
                    isLight
                      ? "bg-[hsl(220,14%,22%)]"
                      : "bg-[hsl(220,14%,14%)]"
                  }`}
                >
                  {piece && (
                    <span className="select-none leading-none">
                      {PIECES[piece] || ""}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {showControls && (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setMoveIndex(0)}
          >
            <ChevronFirst className="h-4 w-4" />
            <span className="sr-only">First move</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setMoveIndex(Math.max(0, moveIndex - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous move</span>
          </Button>
          <span className="px-2 text-xs text-muted-foreground">
            Move {moveIndex}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setMoveIndex(moveIndex + 1)}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next move</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setMoveIndex(40)}
          >
            <ChevronLast className="h-4 w-4" />
            <span className="sr-only">Last move</span>
          </Button>
        </div>
      )}
    </div>
  );
}
