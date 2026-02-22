"use client";

import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, Shield, ExternalLink, Coins, Newspaper, Route } from "lucide-react";
import { track } from "@vercel/analytics";

type BadgeVariant = "cyan" | "purple" | "pink";

const tools: Array<{
  title: string;
  description: string;
  icon: any;
  href: string;
  isNew?: boolean;
  variant?: BadgeVariant;
}> = [
  {
    title: "Mounjaro Path Tracker",
    description: "Naplánuj a sleduj svou cestu krok za krokem",
    icon: Route,
    href: "https://mounjaro-path-tracker.vercel.app/",
    isNew: true,
    variant: "cyan",
  },
  {
    title: "Znát cenu per",
    description: "Ceny per v CZ a okolních zemích",
    icon: Coins,
    href: "https://onli1971.github.io/ceny-postroju/",
    variant: "purple",
  },
  {
    title: "Kalkulačka kliků z pera",
    description: "Spočítej si počet kliků pro správnou dávku",
    icon: Calculator,
    href: "https://onli1971.github.io/kalkulacka-kliku/",
    variant: "cyan",
  },
  {
    title: "Kalkulačka zlaté dávky",
    description: "Výpočet zlaté dávky z pera",
    icon: Calculator,
    href: "https://onli1971.github.io/kalkulacka-davek/",
    variant: "pink",
  },
  {
    title: "Mounjary tracker",
    description: "Sleduj svůj pokrok, srovnej se s ostatními",
    icon: TrendingUp,
    href: "https://weight-tracker-qxzy.vercel.app/",
    variant: "purple",
  },
  {
    title: "Jak skladovat pero",
    description: "Tipy pro správné skladování",
    icon: Shield,
    href: "https://onli1971.github.io/peptidova-stabilita/",
    variant: "cyan",
  },
  {
    title: "Veřejný feed článků",
    description: "Zobrazí publikované články z Medical Digest",
    icon: Newspaper,
    href: "https://medical-digest-public.vercel.app/",
    variant: "pink",
  },
];

function badgeClasses(variant: BadgeVariant = "cyan") {
  // neon badge styl ve stejném duchu jako GLP-1 web
  const map: Record<BadgeVariant, string> = {
    cyan: "bg-[hsl(186_80%_45%_/_.15)] text-[hsl(186_80%_45%)] border-[hsl(186_80%_45%_/_.30)]",
    purple: "bg-[hsl(270_90%_65%_/_.15)] text-[hsl(270_90%_65%)] border-[hsl(270_90%_65%_/_.30)]",
    pink: "bg-[hsl(330_80%_60%_/_.15)] text-[hsl(330_80%_60%)] border-[hsl(330_80%_60%_/_.30)]",
  };
  return `inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${map[variant]}`;
}

export default function HomeClient() {
  useEffect(() => {
    const path = typeof window !== "undefined" ? window.location.pathname : "/";
    track("Page View", { path });
  }, []);

  const handleClick = (toolTitle: string, href: string) => {
    track(`Klik: ${toolTitle}`, { href });
  };

  return (
    <div className="min-h-screen bg-[hsl(0_0%_6%)] text-[hsl(0_0%_90%)]">
      {/* HERO / HEADER PANEL */}
      <div className="relative overflow-hidden border-b border-[hsl(0_0%_18%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(270_90%_65%/0.18),transparent_55%),radial-gradient(circle_at_55%_35%,hsl(330_80%_60%/0.16),transparent_60%),radial-gradient(circle_at_80%_35%,hsl(186_80%_45%/0.16),transparent_55%)]" />
        <div className="relative container mx-auto px-4 py-12">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Co potřebuješ?
            </h1>
            <p className="mt-4 text-base md:text-lg text-[hsl(0_0%_60%)]">
              Vyber si z užitečných nástrojů a kalkulaček pro GLP-1 terapii.
            </p>
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;

            return (
              <Card
                key={index}
                className="relative group bg-[hsl(0_0%_12%)]/70 backdrop-blur border-[hsl(0_0%_18%)] rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[hsl(270_90%_65%/0.35)] hover:shadow-[0_0_0_1px_hsl(270_90%_65%/0.18)]"
              >
                {/* NOVINKA badge (neon) */}
                {tool.isNew && (
                  <div className="absolute -top-3 -right-3 z-10">
                    <span className="animate-pulse rounded-full border border-[hsl(186_80%_45%/0.35)] bg-[hsl(186_80%_45%/0.18)] px-3 py-1 text-xs font-bold text-[hsl(186_80%_45%)] shadow-[0_0_18px_hsl(186_80%_45%/0.18)]">
                      NOVINKA
                    </span>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg border border-[hsl(0_0%_18%)] bg-[hsl(0_0%_10%)]">
                      <IconComponent className="w-6 h-6 text-[hsl(0_0%_90%)]" />
                    </div>

                    <div className="min-w-0">
                      <CardTitle className="text-lg font-semibold text-[hsl(0_0%_90%)] truncate">
                        {tool.title}
                      </CardTitle>
                      <div className="mt-1">
                        <span className={badgeClasses(tool.variant)}>
                          {tool.variant === "cyan" ? "nástroj" : tool.variant === "purple" ? "kalkulačka" : "články"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <CardDescription className="text-[hsl(0_0%_60%)] text-sm">
                    {tool.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <Button
                    asChild
                    className="w-full rounded-lg bg-[hsl(270_90%_65%)] text-white hover:bg-[hsl(270_90%_65%/0.90)]"
                  >
                    <a
                      href={tool.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                      onClick={() => handleClick(tool.title, tool.href)}
                    >
                      Otevřít nástroj
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>

                  {/* volitelně sekundární link */}
                  <div className="mt-3 text-center text-xs text-[hsl(0_0%_60%)]">
                    Otevírá se v nové záložce
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <p className="text-[hsl(0_0%_60%)] text-sm">
            Všechny nástroje jsou zdarma. Informace nenahrazují doporučení lékaře.
          </p>
        </div>
      </div>
    </div>
  );
}
