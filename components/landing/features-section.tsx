"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Target,
  Eye,
  Timer,
  Dna,
  Swords,
  BookOpen,
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Blunder Archetypes",
    description:
      "Classify your mistakes into patterns like Ghost Threat, Tunnel Vision, and Desperado Miss. Not just what went wrong, but why.",
  },
  {
    icon: Timer,
    title: "Time Pressure Psychology",
    description:
      "See how your play degrades under time pressure. Compare your performance curve against rating bands to find your breaking point.",
  },
  {
    icon: Dna,
    title: "Player DNA Report",
    description:
      "A comprehensive profile of your playstyle: aggression, risk tolerance, tactical sharpness, endgame skill, and time management.",
  },
  {
    icon: Swords,
    title: "What-If Advantage Trainer",
    description:
      "Revisit positions where you had a winning advantage but failed to convert. Train against a capped engine to close the gap.",
  },
  {
    icon: Eye,
    title: "Opponent Scouting",
    description:
      "Build profiles of your regular opponents. Know their favorite openings, weaknesses, and tendencies before you sit down to play.",
  },
  {
    icon: BookOpen,
    title: "Phase-Specific Analysis",
    description:
      "Separate your opening, middlegame, and endgame accuracy. Identify exactly which phase of the game costs you the most rating points.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Diagnostics That Go Deeper
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
            Standard analysis tells you the best move. We tell you why you
            missed it, and how to stop missing it.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="border-border bg-card transition-colors hover:border-primary/30"
            >
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg text-card-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
