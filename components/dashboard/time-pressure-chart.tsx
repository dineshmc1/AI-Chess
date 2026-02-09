"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { TimePressurePoint } from "@/lib/mock-data";

interface TimePressureChartProps {
  data: TimePressurePoint[];
  showBands?: boolean;
  bands?: TimePressurePoint[];
}

function formatTime(seconds: number): string {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return sec === 0 ? `${min}m` : `${min}m${sec}s`;
}

export function TimePressureChart({
  data,
  showBands = false,
  bands = [],
}: TimePressureChartProps) {
  if (showBands && bands.length > 0) {
    const bandGroups = bands.reduce<Record<string, { time: number; accuracy: number }[]>>(
      (acc, point) => {
        const band = point.ratingBand || "Unknown";
        if (!acc[band]) acc[band] = [];
        acc[band].push({ time: point.timeRemaining, accuracy: point.accuracy });
        return acc;
      },
      {}
    );

    const playerMap = new Map<number, number>();
    for (const p of data) {
      playerMap.set(p.timeRemaining, p.accuracy);
    }

    const allTimes = [...new Set([...data.map((d) => d.timeRemaining), ...bands.map((b) => b.timeRemaining)])].sort(
      (a, b) => b - a
    );

    const chartData = allTimes.map((time) => {
      const entry: Record<string, number | string> = {
        time,
        timeLabel: formatTime(time),
      };
      entry["You"] = playerMap.get(time) ?? 0;
      for (const [band, points] of Object.entries(bandGroups)) {
        const found = points.find((p) => p.time === time);
        entry[band] = found?.accuracy ?? 0;
      }
      return entry;
    });

    const bandColors: Record<string, string> = {
      "2100+": "hsl(142, 60%, 45%)",
      "1800-2100": "hsl(45, 93%, 47%)",
      "1200-1800": "hsl(0, 72%, 51%)",
    };

    return (
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-sm text-card-foreground">
            Time Pressure vs Accuracy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 20%)" />
              <XAxis
                dataKey="timeLabel"
                tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }}
                reversed
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }}
                label={{
                  value: "Accuracy %",
                  angle: -90,
                  position: "insideLeft",
                  fill: "hsl(220, 10%, 55%)",
                  fontSize: 12,
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(220, 16%, 9%)",
                  border: "1px solid hsl(220, 14%, 16%)",
                  borderRadius: "6px",
                  color: "hsl(220, 10%, 94%)",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="You"
                stroke="hsl(200, 70%, 50%)"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
              {Object.entries(bandColors).map(([band, color]) => (
                <Line
                  key={band}
                  type="monotone"
                  dataKey={band}
                  stroke={color}
                  strokeWidth={1.5}
                  strokeDasharray="5 5"
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  }

  const simpleData = data
    .sort((a, b) => b.timeRemaining - a.timeRemaining)
    .map((d) => ({
      time: d.timeRemaining,
      timeLabel: formatTime(d.timeRemaining),
      accuracy: d.accuracy,
    }));

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-sm text-card-foreground">
          Time Pressure vs Accuracy
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={simpleData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 20%)" />
            <XAxis
              dataKey="timeLabel"
              tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }}
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
            <Line
              type="monotone"
              dataKey="accuracy"
              stroke="hsl(142, 60%, 45%)"
              strokeWidth={2}
              dot={{ fill: "hsl(142, 60%, 45%)", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
