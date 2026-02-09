"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, TrendingUp, TrendingDown } from "lucide-react";
import { mockOpponentScouts } from "@/lib/mock-data";

const detailedScouts = [
  {
    ...mockOpponentScouts[0],
    record: { wins: 2, losses: 2, draws: 1 },
    openings: [
      { name: "Sicilian Defense, Najdorf", frequency: 60, yourScore: "1/3" },
      { name: "Ruy Lopez, Marshall", frequency: 40, yourScore: "1.5/2" },
    ],
    recentForm: "LWDWL",
  },
  {
    ...mockOpponentScouts[1],
    record: { wins: 2, losses: 1, draws: 0 },
    openings: [
      { name: "King's Indian Defense", frequency: 67, yourScore: "2/2" },
      { name: "Grunfeld Defense", frequency: 33, yourScore: "0/1" },
    ],
    recentForm: "WWL",
  },
];

export default function ScoutingPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Opponent Scouting
        </h1>
        <p className="text-sm text-muted-foreground">
          Build profiles of your regular opponents
        </p>
      </div>

      <Card className="border-border bg-card">
        <CardContent className="flex items-center gap-3 p-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search opponent by username..."
            className="border-0 bg-transparent p-0 focus-visible:ring-0"
          />
          <Button size="sm">Search</Button>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-6">
        {detailedScouts.map((scout) => (
          <Card key={scout.name} className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base text-card-foreground">
                    {scout.name}
                  </CardTitle>
                  <CardDescription>
                    Rating: {scout.rating} | {scout.gamesPlayed} games
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {scout.record.wins}W - {scout.record.losses}L -{" "}
                    {scout.record.draws}D
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {/* Head to head */}
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center gap-1 rounded-lg border border-border p-3">
                  <TrendingUp className="h-4 w-4 text-eval-good" />
                  <span className="text-xl font-bold text-eval-good">
                    {scout.record.wins}
                  </span>
                  <span className="text-xs text-muted-foreground">Wins</span>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-lg border border-border p-3">
                  <TrendingDown className="h-4 w-4 text-eval-blunder" />
                  <span className="text-xl font-bold text-eval-blunder">
                    {scout.record.losses}
                  </span>
                  <span className="text-xs text-muted-foreground">Losses</span>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-lg border border-border p-3">
                  <span className="text-xl font-bold text-muted-foreground">
                    {scout.record.draws}
                  </span>
                  <span className="text-xs text-muted-foreground">Draws</span>
                </div>
              </div>

              {/* Opening tendencies */}
              <div>
                <p className="mb-2 text-sm font-medium text-foreground">
                  Opening Tendencies
                </p>
                <div className="flex flex-col gap-2">
                  {scout.openings.map((opening) => (
                    <div
                      key={opening.name}
                      className="flex items-center justify-between rounded-md border border-border p-3"
                    >
                      <div>
                        <p className="text-sm text-foreground">
                          {opening.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Played in {opening.frequency}% of games
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        Your score: {opening.yourScore}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weakness */}
              <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
                <p className="text-xs font-medium text-primary">
                  Identified Weakness
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {scout.weakness}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
