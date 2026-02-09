"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChessboardDisplay } from "@/components/dashboard/chessboard-display";
import type { BlunderArchetype } from "@/lib/mock-data";

interface BlunderArchetypesProps {
  archetypes: BlunderArchetype[];
}

function severityColor(severity: string) {
  switch (severity) {
    case "High":
      return "destructive";
    case "Medium":
      return "secondary";
    default:
      return "secondary";
  }
}

export function BlunderArchetypes({ archetypes }: BlunderArchetypesProps) {
  return (
    <div className="flex flex-col gap-4">
      {archetypes.map((arch) => (
        <Card key={arch.id} className="border-border bg-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-card-foreground">
                Likely {arch.type}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge
                  variant={severityColor(arch.severity) as "destructive" | "secondary"}
                  className="text-xs"
                >
                  {arch.severity}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Move {arch.moveNumber}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 lg:flex-row lg:items-start lg:gap-4">
            <ChessboardDisplay fen={arch.fen} showControls={false} size="sm" />
            <CardDescription className="flex-1 text-sm leading-relaxed">
              {arch.explanation}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
