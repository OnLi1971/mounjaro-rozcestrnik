"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Calculator, 
  TrendingUp, 
  Pill, 
  Activity, 
  Shield, 
  ExternalLink,
  Coins,        // ← doplněno
  Newspaper    // ← přidáno pro veřejný feed
} from "lucide-react"

const tools = [
  {
    title: "Znát cenu per",
    description: "Ceny per v CZ a okolních zemích",
    icon: Coins,
    href: "https://onli1971.github.io/ceny-postroju/",
    color: "text-blue-600"
  },
  {
    title: "Kalkulačka kliků z pera",
    description: "Spočítej si počet kliků pro správnou dávku",
    icon: Calculator,
    href: "https://onli1971.github.io/kalkulacka-kliku/",
    color: "text-green-600"
  },
  {
    title: "Kalkulačka zlaté dávky",
    description: "Výpočet zlaté dávky z pera",
    icon: Calculator,
    href: "https://onli1971.github.io/kalkulacka-davek/",
    color: "text-yellow-600"
  },
  {
    title: "Mounjary tracker",
    description: "Sleduj svůj pokrok, srovnej se s ostatními",
    icon: TrendingUp,
    href: "https://weight-tracker-qxzy.vercel.app/",
    color: "text-purple-600"
  },
  {
    title: "Jak skladovat pero",
    description: "Tipy pro správné skladování",
    icon: Shield,
    href: "https://onli1971.github.io/peptidova-stabilita/",
    color: "text-orange-600"
  },
  // ⬇️ Nový box s odkazem na Vercel
  {
    title: "Veřejný feed článků",
    description: "Zobrazí publikované články z Medical Digest",
    icon: Newspaper, // ← nová ikonka místo Activity
    href: "https://medical-digest-public.vercel.app/",
    color: "text-red-600"
  }
]
