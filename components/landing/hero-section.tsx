"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Brain, Shield } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 py-24 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_70%)]" />
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-muted-foreground">
          <Brain className="h-4 w-4 text-primary" />
          AI-Powered Chess Diagnostics
        </div>
        <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Understand Why You Lost
          <span className="block text-primary">Not Just That You Lost</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
          Go beyond basic engine analysis. Discover your blunder archetypes,
          time pressure psychology, and unique player DNA to improve where it
          matters most.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="gap-2 px-8 text-base">
            <Link href="/dashboard/upload">
              Upload Games
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 px-8 text-base bg-transparent"
          >
            <Link href="#features">See How It Works</Link>
          </Button>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-medium text-foreground">2,400+ Games Analyzed</p>
            <p className="text-xs text-muted-foreground">This month</p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-medium text-foreground">15 Archetype Patterns</p>
            <p className="text-xs text-muted-foreground">Detected</p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-medium text-foreground">92% Accuracy</p>
            <p className="text-xs text-muted-foreground">Pattern Recognition</p>
          </div>
        </div>
      </div>
    </section>
  );
}
