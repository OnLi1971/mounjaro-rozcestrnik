"use client";

import { useEffect, useState } from "react";
import HomeClient from "@/components/home-client";

const ACCESS_PARAM = "k";
const ACCESS_KEY = "MK2025";
const STORAGE_KEY = "mj_access_ok";

export default function HubPage() {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1) už má přístup v localStorage?
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "yes") {
        setAllowed(true);
        return;
      }
    } catch (e) {}

    // 2) kontrola parametru v URL
    const url = new URL(window.location.href);
    const code = url.searchParams.get(ACCESS_PARAM);

    if (code === ACCESS_KEY) {
      try {
        window.localStorage.setItem(STORAGE_KEY, "yes");
      } catch (e) {}

      url.searchParams.delete(ACCESS_PARAM);
      window.history.replaceState({}, "", url.toString());

      setAllowed(true);
      return;
    }

    // 3) neautorizovaný přístup
    setAllowed(false);
  }, []);

  // Loading stav
  if (allowed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        <p>Načítám…</p>
      </div>
    );
  }

  // ❌ blokace přístupu
  if (!allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        <div className="max-w-md bg-slate-900/80 rounded-2xl p-6 shadow-xl text-center border border-white/10">
          <h1 className="text-xl font-semibold mb-2">Přístup jen pro členy skupiny</h1>
          <p className="text-sm text-slate-300">
            Tento rozcestník je dostupný pouze přes speciální odkaz. Požádej admina o aktuální link.
          </p>
        </div>
      </div>
    );
  }

  // ✅ POVOLENÝ PŘÍSTUP — centrovaný rozcestník + vánoční přání + sněžení
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100 overflow-hidden">
      {/* Jemná vánoční dekorace */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -top-16 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-red-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      {/* Sněžení */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-35">
        <div className="snow-layer snow-layer-1" />
        <div className="snow-layer snow-layer-2" />
        <div className="snow-layer snow-layer-3" />
      </div>

      {/* CSS pro sněžení */}
      <style jsx global>{`
        .snow-layer {
          position: absolute;
          inset: -200px 0 0 0;
          background-repeat: repeat;
          background-size: 260px 260px;
          filter: blur(0.2px);
          will-change: transform;
        }

        /* Každá vrstva má trochu jiný “vzorek” a rychlost → parallax efekt */
        .snow-layer-1 {
          opacity: 0.45;
          background-image:
            radial-gradient(circle, rgba(255,255,255,0.60) 1.2px, transparent 1.3px),
            radial-gradient(circle, rgba(255,255,255,0.30) 1.0px, transparent 1.1px);
          background-position: 0 0, 130px 130px;
          animation: snowFall 18s linear infinite;
        }

        .snow-layer-2 {
          opacity: 0.35;
          background-image:
            radial-gradient(circle, rgba(255,255,255,0.45) 1.1px, transparent 1.2px),
            radial-gradient(circle, rgba(255,255,255,0.22) 0.9px, transparent 1.0px);
          background-position: 40px 10px, 170px 160px;
          animation: snowFall 26s linear infinite;
          transform: translateY(-60px);
        }

        .snow-layer-3 {
          opacity: 0.25;
          background-image:
            radial-gradient(circle, rgba(255,255,255,0.35) 0.9px, transparent 1.0px),
            radial-gradient(circle, rgba(255,255,255,0.18) 0.8px, transparent 0.9px);
          background-position: 90px 40px, 210px 200px;
          animation: snowFall 38s linear infinite;
          transform: translateY(-120px);
        }

        @keyframes snowFall {
          0% {
            transform: translate3d(0, -120px, 0);
          }
          100% {
            transform: translate3d(0, 520px, 0);
          }
        }

        /* Respekt pro “reduce motion” */
        @media (prefers-reduced-motion: reduce) {
          .snow-layer-1,
          .snow-layer-2,
          .snow-layer-3 {
            animation: none !important;
          }
        }
      `}</style>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-10 text-center">
        <header className="mb-10 rounded-2xl border border-white/10 bg-slate-900/60 p-8 shadow-xl backdrop-blur">
          <p className="text-sm text-slate-300 mb-2">🎄 Vánoční rozcestník</p>

          <h1 className="text-3xl font-semibold">Rozcestník pro skupinu</h1>
          <h2 className="mt-2 text-2xl font-bold text-slate-100">MunJaro pro jaro</h2>

          <p className="mt-4 text-sm text-slate-300 max-w-xl mx-auto">
            Všechny kalkulačky, přehledy a užitečné odkazy na jednom místě.
          </p>

          <div className="mt-6 text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            <p>
              ❄️ Přejeme vám klidné a pohodové Vánoce, hodně zdraví, vnitřní pohody a sil do nového roku.
            </p>
            <p className="mt-2">
              Ať je nadcházející jaro krokem k lepší kondici, rovnováze a radosti z každého pokroku.
            </p>
          </div>
        </header>

        {/* Skutečný rozcestník */}
        <HomeClient />
      </main>
    </div>
  );
}
