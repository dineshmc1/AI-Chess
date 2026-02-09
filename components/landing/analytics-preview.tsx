"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const radarData = [
  { stat: "Aggression", value: 72 },
  { stat: "Risk", value: 58 },
  { stat: "Tactics", value: 81 },
  { stat: "Endgame", value: 45 },
  { stat: "Time Mgmt", value: 63 },
];

const phaseData = [
  { phase: "Opening", accuracy: 92, fill: "hsl(142, 60%, 45%)" },
  { phase: "Middlegame", accuracy: 65, fill: "hsl(45, 93%, 47%)" },
  { phase: "Endgame", accuracy: 40, fill: "hsl(0, 72%, 51%)" },
];

export function AnalyticsPreview() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Sample Analytics
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
            Here is a preview of the kind of insights you will get from every
            game you analyze.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base text-card-foreground">Player DNA</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(220, 14%, 20%)" />
                  <PolarAngleAxis
                    dataKey="stat"
                    tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }}
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
            </CardContent>
          </Card>
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base text-card-foreground">Phase Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={phaseData} layout="vertical">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(220, 14%, 20%)"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="phase"
                    tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }}
                    width={90}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(220, 16%, 9%)",
                      border: "1px solid hsl(220, 14%, 16%)",
                      borderRadius: "6px",
                      color: "hsl(220, 10%, 94%)",
                    }}
                    formatter={(value: number) => [`${value}%`, "Accuracy"]}
                  />
                  <Bar dataKey="accuracy" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
