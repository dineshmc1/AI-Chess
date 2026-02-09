"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, BarChart3, ArrowRight } from "lucide-react";
import { mockGames } from "@/lib/mock-data";

const completedGames = mockGames.filter((g) => g.analysisStatus === "Completed");

export default function AnalysisListPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Game Analysis</h1>
        <p className="text-sm text-muted-foreground">
          Select a game to view detailed analysis
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {completedGames.map((game) => (
          <Link key={game.id} href={`/dashboard/analysis/${game.id}`}>
            <Card className="border-border bg-card transition-colors hover:border-primary/30">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base text-card-foreground">
                    vs {game.opponent}
                  </CardTitle>
                  <Badge
                    variant={
                      game.result === "Win"
                        ? "default"
                        : game.result === "Loss"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {game.result}
                  </Badge>
                </div>
                <CardDescription>
                  {game.date} | {game.timeControl}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      {game.result === "Win" ? (
                        <TrendingUp className="h-4 w-4 text-eval-good" />
                      ) : game.result === "Loss" ? (
                        <TrendingDown className="h-4 w-4 text-eval-blunder" />
                      ) : (
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="text-sm font-medium text-foreground">
                        {game.accuracy}% accuracy
                      </span>
                    </div>
                    {game.rating && (
                      <span className="text-sm text-muted-foreground">
                        Game Rating: {game.rating}
                      </span>
                    )}
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
