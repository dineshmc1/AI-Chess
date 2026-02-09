"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "RM 0",
    description: "Basic analysis for casual players",
    features: [
      "5 games per month",
      "Basic accuracy report",
      "Move classification",
      "Phase accuracy breakdown",
    ],
    highlighted: false,
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: "RM 10",
    period: "/month",
    description: "Full diagnostics for serious improvement",
    features: [
      "Unlimited game analysis",
      "Blunder archetype detection",
      "Time pressure psychology",
      "Player DNA report",
      "What-If advantage trainer",
      "Opponent scouting",
      "PDF report export",
      "Priority analysis queue",
    ],
    highlighted: true,
    cta: "Start Improving",
  },
  {
    name: "Team",
    price: "RM 35",
    period: "/month",
    description: "For coaches and chess clubs",
    features: [
      "Everything in Pro",
      "Up to 10 players",
      "Coach dashboard",
      "Comparative analytics",
      "Custom training plans",
      "Bulk game import",
    ],
    highlighted: false,
    cta: "Contact Us",
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
            Start free, upgrade when you are ready to take your game to the
            next level.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative border-border bg-card ${
                plan.highlighted
                  ? "border-primary shadow-lg shadow-primary/10"
                  : ""
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground">
                  Most Popular
                </div>
              )}
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-card-foreground">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="pt-2">
                  <span className="text-3xl font-bold text-card-foreground">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <ul className="flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant={plan.highlighted ? "default" : "outline"}
                  className="mt-4 w-full"
                >
                  <Link href="/dashboard">{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
