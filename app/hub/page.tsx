"use client";

import { useEffect, useState } from "react";

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
        <div className="max-w-md bg-slate-900/80 rounded-2xl p-6 shadow-xl text-center">
          <h1 className="text-xl font-semibold mb-2">Přístup jen pro členy skupiny</h1>
          <p className="text-sm text-slate-300">
            Tento rozcestník je dostupný pouze přes speciální odkaz.  
            Požádej admina o aktuální link.
          </p>
        </div>
      </div>
    );
  }

  // ✅ POVOLENÝ PŘÍSTUP — TADY BUDE TVŮJ ROZCESTNÍK
  return (
    <main className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Rozcestník – nový přístup</h1>

      {/* TODO: Sem vložíme celý tvůj existující grid s kartami */}
      <p>Zde bude tvůj rozcestník…</p>
    </main>
  );
}
