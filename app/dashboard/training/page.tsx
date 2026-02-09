"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChessboardDisplay } from "@/components/dashboard/chessboard-display";
import { Target, X } from "lucide-react";
import { mockWhatIfPositions } from "@/lib/mock-data";

export default function TrainingPage() {
  const [activePosition, setActivePosition] = useState<string | null>(null);

  const selectedPos = mockWhatIfPositions.find(
    (p) => p.id === activePosition
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          What-If Advantage Trainer
        </h1>
        <p className="text-sm text-muted-foreground">
          Revisit positions where you had a winning advantage but failed to
          convert
        </p>
      </div>

      {activePosition && selectedPos ? (
        <Card className="border-primary/30 bg-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base text-card-foreground">
                Training Position - Move {selectedPos.moveNumber}
              </CardTitle>
              <CardDescription>
                Play against capped engine (UI only)
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActivePosition(null)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close training</span>
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <ChessboardDisplay fen={selectedPos.fen} size="lg" />
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-sm">
                Evaluation: +{selectedPos.evaluation.toFixed(1)}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {selectedPos.description}
              </span>
            </div>
            <p className="text-center text-xs text-muted-foreground">
              Engine is capped to play at approximately your rating level. Find
              the winning continuation.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base text-card-foreground">
                <Target className="h-4 w-4 text-primary" />
                Failed Winning Positions
              </CardTitle>
              <CardDescription>
                {mockWhatIfPositions.length} positions from recent games where
                you had a clear advantage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {mockWhatIfPositions.map((pos) => (
                  <div
                    key={pos.id}
                    className="flex items-center justify-between rounded-lg border border-border p-4"
                  >
                    <div className="flex items-center gap-4">
                      <ChessboardDisplay
                        fen={pos.fen}
                        showControls={false}
                        size="sm"
                      />
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">
                            Move {pos.moveNumber}
                          </span>
                          <Badge
                            variant="secondary"
                            className="font-mono text-xs text-eval-good"
                          >
                            +{pos.evaluation.toFixed(1)}
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {pos.description}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => setActivePosition(pos.id)}
                    >
                      Train This Position
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
