"use client";

import React from "react"

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  FileText,
  Globe,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Loader2,
} from "lucide-react";
import { mockGames } from "@/lib/mock-data";

export default function UploadPage() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    simulateUpload();
  };

  const simulateUpload = () => {
    setUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Upload Games</h1>
        <p className="text-sm text-muted-foreground">
          Import your games for AI-powered analysis
        </p>
      </div>

      <Tabs defaultValue="file" className="w-full">
        <TabsList className="bg-secondary">
          <TabsTrigger value="file">PGN File</TabsTrigger>
          <TabsTrigger value="lichess">Lichess</TabsTrigger>
          <TabsTrigger value="chesscom">Chess.com</TabsTrigger>
        </TabsList>

        <TabsContent value="file">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base text-card-foreground">
                Upload PGN File
              </CardTitle>
              <CardDescription>
                Drag and drop your PGN files or click to browse. Supports bulk
                upload.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={simulateUpload}
                className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors ${
                  isDragOver
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-muted-foreground"
                }`}
              >
                <Upload className="mb-4 h-10 w-10 text-muted-foreground" />
                <p className="mb-1 text-sm font-medium text-foreground">
                  Drop PGN files here or click to upload
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports .pgn files up to 10MB
                </p>
              </div>
              {uploading && (
                <div className="mt-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Uploading games...
                    </span>
                    <span className="text-muted-foreground">
                      {uploadProgress}%
                    </span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lichess">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base text-card-foreground">
                <Globe className="h-4 w-4" />
                Import from Lichess
              </CardTitle>
              <CardDescription>
                Connect your Lichess account to automatically import games.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="lichess-token"
                  className="text-sm font-medium text-foreground"
                >
                  API Token
                </label>
                <Input
                  id="lichess-token"
                  placeholder="Enter your Lichess API token"
                  type="password"
                />
                <p className="text-xs text-muted-foreground">
                  Generate a token at lichess.org/account/oauth/token
                </p>
              </div>
              <Button className="w-fit">Connect Lichess</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chesscom">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base text-card-foreground">
                <Globe className="h-4 w-4" />
                Import from Chess.com
              </CardTitle>
              <CardDescription>
                Enter your Chess.com username to fetch your public games.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="chesscom-username"
                  className="text-sm font-medium text-foreground"
                >
                  Username
                </label>
                <Input
                  id="chesscom-username"
                  placeholder="Enter your Chess.com username"
                />
              </div>
              <Button className="w-fit">Fetch Games</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Uploaded Games List */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base text-card-foreground">
            Your Games
          </CardTitle>
          <CardDescription>
            {mockGames.length} games imported
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 pr-4 font-medium text-muted-foreground">
                    Date
                  </th>
                  <th className="pb-3 pr-4 font-medium text-muted-foreground">
                    Opponent
                  </th>
                  <th className="pb-3 pr-4 font-medium text-muted-foreground">
                    Result
                  </th>
                  <th className="pb-3 pr-4 font-medium text-muted-foreground">
                    Time Control
                  </th>
                  <th className="pb-3 pr-4 font-medium text-muted-foreground">
                    Accuracy
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockGames.map((game) => (
                  <tr
                    key={game.id}
                    className="border-b border-border last:border-0"
                  >
                    <td className="py-3 pr-4 text-foreground">{game.date}</td>
                    <td className="py-3 pr-4">
                      <Link
                        href={`/dashboard/analysis/${game.id}`}
                        className="font-medium text-foreground hover:text-primary"
                      >
                        {game.opponent}
                      </Link>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        {game.result === "Win" ? (
                          <TrendingUp className="h-3 w-3 text-eval-good" />
                        ) : game.result === "Loss" ? (
                          <TrendingDown className="h-3 w-3 text-eval-blunder" />
                        ) : (
                          <BarChart3 className="h-3 w-3 text-muted-foreground" />
                        )}
                        <span className="text-foreground">{game.result}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground">
                      {game.timeControl}
                    </td>
                    <td className="py-3 pr-4 text-foreground">
                      {game.accuracy ? `${game.accuracy}%` : "-"}
                    </td>
                    <td className="py-3">
                      <Badge
                        variant={
                          game.analysisStatus === "Completed"
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {game.analysisStatus}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
