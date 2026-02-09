import Link from "next/link";

const links = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:justify-between">
        <div className="max-w-xs">
          <p className="mb-2 text-lg font-bold text-foreground">
            ChessCoach AI
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            AI-powered chess diagnostics for serious players who want to
            understand their mistakes, not just memorize engine lines.
          </p>
        </div>
        <div className="flex gap-16">
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="mb-3 text-sm font-semibold text-foreground">
                {category}
              </p>
              <ul className="flex flex-col gap-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-6xl border-t border-border pt-8 text-center text-xs text-muted-foreground">
        2026 ChessCoach AI. All rights reserved.
      </div>
    </footer>
  );
}
