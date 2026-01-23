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
          <h1 className="text-xl font-semibold mb-2">
            Přístup jen pro členy skupiny
          </h1>
          <p className="text-sm text-slate-300">
            Tento rozcestník je dostupný pouze přes speciální odkaz. Požádej
            admina o aktuální link.
          </p>
        </div>
      </div>
    );
  }

  // ✅ POVOLENÝ PŘÍSTUP
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100 overflow-hidden">
      {/* Jemná dekorace pozadí */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -top-16 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-red-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-10 text-center">
        {/* ✅ VŠE V JEDNOM “OKNĚ” */}
        <header className="mb-10 rounded-2xl border border-white/10 bg-slate-900/60 p-8 shadow-xl backdrop-blur">
          <h1 className="text-3xl font-semibold">
            Rozcestník pro skupinu{" "}
            <span className="font-bold text-slate-100">
              Život s GLP-1 terapií
            </span>
          </h1>

          <p className="mt-4 text-sm text-slate-300 max-w-xl mx-auto">
            Všechny kalkulačky, přehledy a užitečné odkazy na jednom místě.
          </p>

          <div className="mt-6 max-w-xl mx-auto text-left text-slate-200">
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
              <p className="font-semibold">
                ⚠️ Houston, máme problém… ale řešení taky.
              </p>

              <p className="mt-2 text-sm text-slate-200/90">
                Původní Facebooková skupina <b>MunJaro pro jaro</b> byla zrušena.
                <br />
                To ale neznamená konec — <b>fungujeme dál</b> 💪
              </p>

              <p className="mt-3 text-sm text-slate-200/90">
                Tenhle rozcestník zůstává centrálním místem, kde najdeš:
              </p>

              <ul className="mt-3 list-disc pl-5 text-sm text-slate-200/90 space-y-1">
                <li>kalkulačky a nástroje</li>
                <li>přehledy a články</li>
                <li>odkazy na nové projekty a aplikace</li>
              </ul>
            </div>
          </div>
        </header>

        {/* Skutečný rozcestník */}
        <HomeClient />
      </main>
    </div>
  );
}
