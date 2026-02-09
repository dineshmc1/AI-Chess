"use client";

import { use } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChessboardDisplay } from "@/components/dashboard/chessboard-display";
import { MoveList } from "@/components/dashboard/move-list";
import { BlunderArchetypes } from "@/components/dashboard/blunder-archetypes";
import { PhaseAnalysis } from "@/components/dashboard/phase-analysis";
import { TimePressureChart } from "@/components/dashboard/time-pressure-chart";
import { mockAnalysis } from "@/lib/mock-data";

const moveClassLabels: Record<
  string,
  { label: string; colorClass: string }
> = {
  brilliant: { label: "Brilliant", colorClass: "text-eval-brilliant" },
  great: { label: "Great", colorClass: "text-eval-good" },
  best: { label: "Best", colorClass: "text-eval-good" },
  inaccuracy: { label: "Inaccuracy", colorClass: "text-eval-inaccuracy" },
  mistake: { label: "Mistake", colorClass: "text-eval-inaccuracy" },
  blunder: { label: "Blunder", colorClass: "text-eval-blunder" },
};

export default function GameAnalysisPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const analysis = mockAnalysis;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Game Analysis
          </h1>
          <p className="text-sm text-muted-foreground">
            Game {id} - Detailed diagnostic breakdown
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="text-sm">
            Accuracy: {analysis.accuracy}%
          </Badge>
          <Badge variant="secondary" className="text-sm">
            Rating: {analysis.rating}
          </Badge>
        </div>
      </div>

      {/* Board + Moves layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[auto_1fr]">
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <ChessboardDisplay size="lg" />
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-card-foreground">
              Move List
            </CardTitle>
          </CardHeader>
          <CardContent className="max-h-[480px] overflow-y-auto">
            <MoveList />
          </CardContent>
        </Card>
      </div>

      {/* Move Classification */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base text-card-foreground">
            Move Classifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {Object.entries(analysis.moveClassifications).map(
              ([key, value]) => {
                const meta = moveClassLabels[key];
                return (
                  <div
                    key={key}
                    className="flex flex-col items-center gap-1 rounded-lg border border-border p-4"
                  >
                    <span className={`text-2xl font-bold ${meta.colorClass}`}>
                      {value}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {meta.label}
                    </span>
                  </div>
                );
              }
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabbed Analysis */}
      <Tabs defaultValue="overview">
        <TabsList className="bg-secondary">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="archetypes">Blunder Archetypes</TabsTrigger>
          <TabsTrigger value="phases">Phase Analysis</TabsTrigger>
          <TabsTrigger value="time">Time Pressure</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="border-border bg-card">
              <CardContent className="flex flex-col items-center gap-2 p-6">
                <span className="text-3xl font-bold text-eval-good">
                  {analysis.accuracy}%
                </span>
                <span className="text-sm text-muted-foreground">
                  Overall Accuracy
                </span>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="flex flex-col items-center gap-2 p-6">
                <span className="text-3xl font-bold text-foreground">
                  {analysis.rating}
                </span>
                <span className="text-sm text-muted-foreground">
                  Game Rating
                </span>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="flex flex-col items-center gap-2 p-6">
                <span className="text-3xl font-bold text-eval-blunder">
                  {analysis.archetypes.length}
                </span>
                <span className="text-sm text-muted-foreground">
                  Archetypes Detected
                </span>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="archetypes" className="mt-4">
          <BlunderArchetypes archetypes={analysis.archetypes} />
        </TabsContent>

        <TabsContent value="phases" className="mt-4">
          <PhaseAnalysis phases={analysis.phaseAccuracy} />
        </TabsContent>

        <TabsContent value="time" className="mt-4">
          <TimePressureChart
            data={analysis.timePressureData}
            showBands={false}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
