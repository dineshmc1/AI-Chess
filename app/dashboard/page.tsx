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
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  ArrowRight,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Target,
} from "lucide-react";
import { mockGames } from "@/lib/mock-data";

const ratingHistory = [
  { game: "1", rating: 1650 },
  { game: "2", rating: 1670 },
  { game: "3", rating: 1685 },
  { game: "4", rating: 1660 },
  { game: "5", rating: 1702 },
  { game: "6", rating: 1720 },
  { game: "7", rating: 1710 },
  { game: "8", rating: 1745 },
  { game: "9", rating: 1685 },
  { game: "10", rating: 1710 },
];

const stats = [
  {
    label: "Current Rating",
    value: "1,685",
    change: "+35",
    trend: "up" as const,
  },
  {
    label: "Games Analyzed",
    value: "42",
    change: "+6",
    trend: "up" as const,
  },
  {
    label: "Avg Accuracy",
    value: "79.4%",
    change: "-2.1%",
    trend: "down" as const,
  },
  {
    label: "Top Archetype",
    value: "Tunnel Vision",
    change: "12 occurrences",
    trend: "neutral" as const,
  },
];

export default function DashboardPage() {
  const recentGames = mockGames.filter(
    (g) => g.analysisStatus === "Completed"
  ).slice(0, 4);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your chess performance and recent activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border bg-card">
            <CardContent className="p-4">
              <p className="text-xs font-medium text-muted-foreground">
                {stat.label}
              </p>
              <p className="mt-1 text-2xl font-bold text-card-foreground">
                {stat.value}
              </p>
              <div className="mt-1 flex items-center gap-1">
                {stat.trend === "up" && (
                  <TrendingUp className="h-3 w-3 text-eval-good" />
                )}
                {stat.trend === "down" && (
                  <TrendingDown className="h-3 w-3 text-eval-blunder" />
                )}
                <span
                  className={`text-xs ${
                    stat.trend === "up"
                      ? "text-eval-good"
                      : stat.trend === "down"
                        ? "text-eval-blunder"
                        : "text-muted-foreground"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Rating Chart */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base text-card-foreground">
            Rating History
          </CardTitle>
          <CardDescription>Your last 10 analyzed games</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={ratingHistory}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(220, 14%, 20%)"
              />
              <XAxis
                dataKey="game"
                tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }}
                axisLine={{ stroke: "hsl(220, 14%, 20%)" }}
              />
              <YAxis
                domain={["dataMin - 30", "dataMax + 30"]}
                tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }}
                axisLine={{ stroke: "hsl(220, 14%, 20%)" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(220, 16%, 9%)",
                  border: "1px solid hsl(220, 14%, 16%)",
                  borderRadius: "6px",
                  color: "hsl(220, 10%, 94%)",
                }}
              />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="hsl(142, 60%, 45%)"
                strokeWidth={2}
                dot={{ fill: "hsl(142, 60%, 45%)", r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Games */}
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base text-card-foreground">
              Recent Games
            </CardTitle>
            <CardDescription>
              Your latest analyzed games
            </CardDescription>
          </div>
          <Button asChild variant="ghost" size="sm" className="gap-1">
            <Link href="/dashboard/upload">
              View all
              <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {recentGames.map((game) => (
              <Link
                key={game.id}
                href={`/dashboard/analysis/${game.id}`}
                className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-secondary"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary">
                    {game.result === "Win" ? (
                      <TrendingUp className="h-4 w-4 text-eval-good" />
                    ) : game.result === "Loss" ? (
                      <TrendingDown className="h-4 w-4 text-eval-blunder" />
                    ) : (
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      vs {game.opponent}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {game.date} | {game.timeControl}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant={
                      game.result === "Win"
                        ? "default"
                        : game.result === "Loss"
                          ? "destructive"
                          : "secondary"
                    }
                    className="text-xs"
                  >
                    {game.result}
                  </Badge>
                  {game.accuracy && (
                    <span className="text-sm font-medium text-muted-foreground">
                      {game.accuracy}%
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
