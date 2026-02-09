"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload } from "lucide-react";

export function Topbar() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-background px-6">
      <div className="flex items-center gap-4">
        <Badge
          variant="secondary"
          className="bg-secondary text-secondary-foreground"
        >
          Rating: 1685
        </Badge>
        <span className="text-sm text-muted-foreground">
          42 games analyzed
        </span>
      </div>
      <Button asChild size="sm" className="gap-2">
        <Link href="/dashboard/upload">
          <Upload className="h-4 w-4" />
          Upload
        </Link>
      </Button>
    </header>
  );
}
