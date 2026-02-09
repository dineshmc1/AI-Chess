"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Crown,
  LayoutDashboard,
  Upload,
  BarChart3,
  Dna,
  Timer,
  Swords,
  Search,
  Settings,
  Target,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Upload Games", href: "/dashboard/upload", icon: Upload },
  { label: "Game Analysis", href: "/dashboard/analysis", icon: BarChart3 },
  { label: "Player DNA Report", href: "/dashboard/dna", icon: Dna },
  { label: "Time Pressure", href: "/dashboard/time-pressure", icon: Timer },
  { label: "Advantage Trainer", href: "/dashboard/training", icon: Target },
  { label: "Opponent Scouting", href: "/dashboard/scouting", icon: Search },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-5">
        <Crown className="h-5 w-5 text-sidebar-primary" />
        <span className="text-base font-bold text-sidebar-foreground">
          ChessCoach AI
        </span>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" &&
                pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary font-medium"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-accent text-sm font-medium text-sidebar-accent-foreground">
            P
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-sidebar-foreground">
              Player
            </span>
            <span className="text-xs text-muted-foreground">
              Rating: 1685
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
