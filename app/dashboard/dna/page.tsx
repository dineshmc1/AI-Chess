"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { Download, Dna } from "lucide-react";
import {
  mockPlayerDNA,
  mockAnalysis,
  mockOpponentScouts,
} from "@/lib/mock-data";

const radarData = [
  { stat: "Aggression", value: mockPlayerDNA.aggression, fullMark: 100 },
  { stat: "Risk", value: mockPlayerDNA.risk, fullMark: 100 },
  { stat: "Tactics", value: mockPlayerDNA.tactics, fullMark: 100 },
  { stat: "Endgame", value: mockPlayerDNA.endgame, fullMark: 100 },
  { stat: "Time Usage", value: mockPlayerDNA.timeUsage, fullMark: 100 },
];

const puzzlePreview = [
  { type: "Tactical Vision", count: 12, difficulty: "Intermediate" },
  { type: "Endgame Technique", count: 8, difficulty: "Advanced" },
  { type: "Time Pressure Tactics", count: 6, difficulty: "Beginner" },
  { type: "Defensive Resources", count: 4, difficulty: "Intermediate" },
];

export default function DNAReportPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Player DNA Report
          </h1>
          <p className="text-sm text-muted-foreground">
            Your comprehensive playstyle profile
          </p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Download PDF Report
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Playstyle Radar */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-card-foreground">
              <Dna className="h-4 w-4 text-primary" />
              Playstyle Profile
            </CardTitle>
            <CardDescription>
              Your tendencies across five key dimensions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(220, 14%, 20%)" />
                <PolarAngleAxis
                  dataKey="stat"
                  tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: "hsl(220, 10%, 40%)", fontSize: 10 }}
                />
                <Radar
                  dataKey="value"
                  stroke="hsl(142, 60%, 45%)"
                  fill="hsl(142, 60%, 45%)"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {radarData.map((item) => (
                <div
                  key={item.stat}
                  className="flex items-center justify-between rounded-md border border-border p-2.5"
                >
                  <span className="text-sm text-muted-foreground">
                    {item.stat}
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {item.value}/100
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Phase Performance */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base text-card-foreground">
              Phase Performance
            </CardTitle>
            <CardDescription>
              Accuracy breakdown by game phase
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {mockAnalysis.phaseAccuracy.map((phase) => {
                const barColor =
                  phase.accuracy >= 80
                    ? "bg-eval-good"
                    : phase.accuracy >= 60
                      ? "bg-eval-inaccuracy"
                      : "bg-eval-blunder";
                return (
                  <div key={phase.phase} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">
                        {phase.phase}
                      </span>
                      <span className="text-muted-foreground">
                        {phase.accuracy}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div
                        className={`h-2 rounded-full ${barColor}`}
                        style={{ width: `${phase.accuracy}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Common: {phase.commonError}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Opponent Scouting Summary */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base text-card-foreground">
            Opponent Scouting Summary
          </CardTitle>
          <CardDescription>
            Frequent opponents and their tendencies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {mockOpponentScouts.map((opp) => (
              <div
                key={opp.name}
                className="flex flex-col gap-2 rounded-lg border border-border p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">
                    {opp.name}
                  </span>
                  <Badge variant="secondary">{opp.rating}</Badge>
                </div>
                <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                  <span>Games played: {opp.gamesPlayed}</span>
                  <span>Favorite opening: {opp.favoriteOpening}</span>
                  <span>Weakness: {opp.weakness}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom Puzzle Set Preview */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base text-card-foreground">
            Custom Puzzle Set
          </CardTitle>
          <CardDescription>
            Puzzles tailored to your weaknesses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {puzzlePreview.map((puzzle) => (
              <div
                key={puzzle.type}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {puzzle.type}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {puzzle.count} puzzles | {puzzle.difficulty}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Start
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
