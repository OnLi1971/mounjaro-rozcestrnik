"use client";

import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  TrendingUp,
  Shield,
  ExternalLink,
  Coins,
  Newspaper,
  Route,
} from "lucide-react";
import { track } from "@vercel/analytics";

const tools = [
  // ⭐ NOVINKA – DÁNA NA PRVNÍ MÍSTO
  {
    title: "Mounjaro Path Tracker",
    description: "Naplánuj a sleduj svou cestu krok za krokem",
    icon: Route,
    href: "https://mounjaro-path-tracker.vercel.app/",
    color: "text-teal-600",
    isNew: true,
  },

  {
    title: "Znát cenu per",
    description: "Ceny per v CZ a okolních zemích",
    icon: Coins,
    href: "https://onli1971.github.io/ceny-postroju/",
    color: "text-blue-600",
  },
  {
    title: "Kalkulačka kliků z pera",
    description: "Spočítej si počet kliků pro správnou dávku",
    icon: Calculator,
    href: "https://onli1971.github.io/kalkulacka-kliku/",
    color: "text-green-600",
  },
  {
    title: "Kalkulačka zlaté dávky",
    description: "Výpočet zlaté dávky z pera",
    icon: Calculator,
    href: "https://onli1971.github.io/kalkulacka-davek/",
    color: "text-yellow-600",
  },
  {
    title: "Mounjary tracker",
    description: "Sleduj svůj pokrok, srovnej se s ostatními",
    icon: TrendingUp,
    href: "https://weight-tracker-qxzy.vercel.app/",
    color: "text-purple-600",
  },
  {
    title: "Jak skladovat pero",
    description: "Tipy pro správné skladování",
    icon: Shield,
    href: "https://onli1971.github.io/peptidova-stabilita/",
    color: "text-orange-600",
  },
  {
    title: "Veřejný feed článků",
    description: "Zobrazí publikované články z Medical Digest",
    icon: Newspaper,
    href: "https://medical-digest-public.vercel.app/",
    color: "text-red-600",
  },
];

export default function HomeClient() {
  useEffect(() => {
    const path =
      typeof window !== "undefined" ? window.location.pathname : "/";
    track("Page View", { path });
  }, []);

  const handleClick = (toolTitle: string, href: string) => {
    track(`Klik: ${toolTitle}`, { href });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Co potřebuješ?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Vyber si z užitečných nástrojů a kalkulaček pro GLP-1 terapii.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;

            return (
              <Card
                key={index}
                className="relative group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border-gray-200"
              >
                {/* 🔥 BADGE NOVINKA */}
                {tool.isNew && (
                  <div className="absolute -top-3 -right-3 z-10">
                    <span className="animate-pulse rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                      NOVINKA
                    </span>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`p-2 rounded-lg bg-gray-100 ${tool.color}`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {tool.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-gray-600 text-sm">
                    {tool.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <Button
                    asChild
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <a
                      href={tool.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                      onClick={() =>
                        handleClick(tool.title, tool.href)
                      }
                    >
                      Otevřít nástroj
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Všechny nástroje jsou zdarma. Informace nenahrazují doporučení
            lékaře.
          </p>
        </div>
      </div>
    </div>
  );
}
