"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import type { PhaseAccuracy } from "@/lib/mock-data";

interface PhaseAnalysisProps {
  phases: PhaseAccuracy[];
}

function getPhaseColor(accuracy: number): string {
  if (accuracy >= 80) return "hsl(142, 60%, 45%)";
  if (accuracy >= 60) return "hsl(45, 93%, 47%)";
  return "hsl(0, 72%, 51%)";
}

export function PhaseAnalysis({ phases }: PhaseAnalysisProps) {
  return (
    <div className="flex flex-col gap-4">
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-sm text-card-foreground">
            Phase Accuracy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={phases} layout="vertical">
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
              <Bar dataKey="accuracy" radius={[0, 4, 4, 0]}>
                {phases.map((entry) => (
                  <Cell
                    key={entry.phase}
                    fill={getPhaseColor(entry.accuracy)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-3 pr-4 text-left font-medium text-muted-foreground">
                Phase
              </th>
              <th className="pb-3 pr-4 text-left font-medium text-muted-foreground">
                Accuracy
              </th>
              <th className="pb-3 text-left font-medium text-muted-foreground">
                Common Error
              </th>
            </tr>
          </thead>
          <tbody>
            {phases.map((phase) => (
              <tr key={phase.phase} className="border-b border-border last:border-0">
                <td className="py-3 pr-4 font-medium text-foreground">
                  {phase.phase}
                </td>
                <td className="py-3 pr-4">
                  <span
                    style={{ color: getPhaseColor(phase.accuracy) }}
                    className="font-medium"
                  >
                    {phase.accuracy}%
                  </span>
                </td>
                <td className="py-3 text-muted-foreground">
                  {phase.commonError}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
