"use client";

import { cn } from "@/lib/utils";
import { mockMoves } from "@/lib/mock-data";

function getEvalColor(evalValue: number): string {
  if (evalValue >= 1.0) return "text-eval-good";
  if (evalValue >= 0) return "text-foreground";
  if (evalValue >= -0.5) return "text-eval-inaccuracy";
  return "text-eval-blunder";
}

function getEvalBg(evalValue: number): string {
  if (evalValue >= 1.0) return "bg-eval-good/10";
  if (evalValue <= -1.0) return "bg-eval-blunder/10";
  return "";
}

export function MoveList() {
  return (
    <div className="flex flex-col gap-0.5 overflow-y-auto">
      <div className="grid grid-cols-[2.5rem_1fr_1fr] gap-0 text-xs">
        <div className="px-2 py-1.5 font-medium text-muted-foreground">#</div>
        <div className="px-2 py-1.5 font-medium text-muted-foreground">
          White
        </div>
        <div className="px-2 py-1.5 font-medium text-muted-foreground">
          Black
        </div>
      </div>
      {mockMoves.map((move) => (
        <div
          key={move.number}
          className="grid grid-cols-[2.5rem_1fr_1fr] gap-0 text-sm"
        >
          <div className="px-2 py-1 text-xs text-muted-foreground">
            {move.number}.
          </div>
          <button
            type="button"
            className={cn(
              "rounded px-2 py-1 text-left transition-colors hover:bg-secondary",
              getEvalBg(move.eval)
            )}
          >
            <span className={cn("font-mono text-xs", getEvalColor(move.eval))}>
              {move.white}
            </span>
          </button>
          <button
            type="button"
            className={cn(
              "rounded px-2 py-1 text-left transition-colors hover:bg-secondary",
              getEvalBg(-move.eval)
            )}
          >
            <span
              className={cn("font-mono text-xs", getEvalColor(-move.eval))}
            >
              {move.black}
            </span>
          </button>
        </div>
      ))}
    </div>
  );
}
