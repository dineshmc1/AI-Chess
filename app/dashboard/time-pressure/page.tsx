"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Timer, AlertTriangle } from "lucide-react";
import { TimePressureChart } from "@/components/dashboard/time-pressure-chart";
import { mockAnalysis, mockTimePressureBands } from "@/lib/mock-data";

export default function TimePressurePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Time Pressure Psychology
        </h1>
        <p className="text-sm text-muted-foreground">
          How your play changes as the clock winds down
        </p>
      </div>

      {/* Insight Card */}
      <Card className="border-primary/30 bg-card">
        <CardContent className="flex items-start gap-4 p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <AlertTriangle className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="mb-1 text-sm font-medium text-card-foreground">
              Key Insight
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              You play like a 2100 when more than 5 minutes remain, but drop to
              1200-level accuracy under 1 minute. Your critical threshold is
              around the 2-minute mark, where accuracy drops by 20 percentage
              points.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Chart with rating bands */}
      <TimePressureChart
        data={mockAnalysis.timePressureData}
        showBands={true}
        bands={mockTimePressureBands}
      />

      {/* Breakdown Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center gap-2 p-6">
            <Timer className="h-6 w-6 text-eval-good" />
            <span className="text-2xl font-bold text-eval-good">95%</span>
            <span className="text-center text-xs text-muted-foreground">
              Accuracy with 10+ min
            </span>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center gap-2 p-6">
            <Timer className="h-6 w-6 text-eval-inaccuracy" />
            <span className="text-2xl font-bold text-eval-inaccuracy">
              68%
            </span>
            <span className="text-center text-xs text-muted-foreground">
              Accuracy with 3 min
            </span>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center gap-2 p-6">
            <Timer className="h-6 w-6 text-eval-blunder" />
            <span className="text-2xl font-bold text-eval-blunder">28%</span>
            <span className="text-center text-xs text-muted-foreground">
              Accuracy with 30 sec
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base text-card-foreground">
            Recommendations
          </CardTitle>
          <CardDescription>
            Strategies to improve time management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-3">
            {[
              "Practice increment time controls (3+2, 5+3) to build time management habits",
              "Set a personal rule: spend no more than 90 seconds on any single move before the time scramble",
              "Train with rapid puzzles (under 30 seconds) to improve pattern recognition under pressure",
              "Analyze your games to identify the move where you start spending too much time",
            ].map((rec) => (
              <li
                key={rec}
                className="flex items-start gap-3 text-sm text-muted-foreground"
              >
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {rec}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
