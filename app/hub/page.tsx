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

  // ✅ POVOLENÝ PŘÍSTUP — skutečný rozcestník + vánoční hlavička
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      {/* Jemná vánoční “glow” dekorace */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -top-16 -right-24 h-72 w-72 rounded-full bg-red-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <main className="relative mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-300">🎄 Vánoční rozcestník</p>
              <h1 className="mt-1 text-2xl font-semibold">
                Rozcestník pro skupinu <span className="text-slate-100">Mounjaro pro jaro</span>
              </h1>
              <p className="mt-2 text-sm text-slate-300">
                Všechny kalkulačky a odkazy přehledně na jednom místě.
              </p>
            </div>

            <div className="text-sm text-slate-300">❄️ Přejeme klidné svátky</div>
          </div>
        </header>

        {/* Tvůj skutečný rozcestník */}
        <HomeClient />
      </main>
    </div>
  );
}
