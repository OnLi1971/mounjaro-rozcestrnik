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

    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "yes") {
        setAllowed(true);
        return;
      }
    } catch (e) {}

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

    setAllowed(false);
  }, []);

  if (allowed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(0_0%_6%)] text-[hsl(0_0%_90%)]">
        <p className="text-[hsl(0_0%_60%)]">Načítám…</p>
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(0_0%_6%)] text-[hsl(0_0%_90%)] px-4">
        <div className="w-full max-w-md rounded-2xl border border-[hsl(0_0%_18%)] bg-[hsl(0_0%_12%)]/70 p-6 shadow-xl backdrop-blur text-center">
          <h1 className="text-xl font-semibold mb-2">
            Přístup jen pro členy skupiny
          </h1>
          <p className="text-sm text-[hsl(0_0%_60%)]">
            Tento rozcestník je dostupný pouze přes speciální odkaz. Požádej
            admina o aktuální link.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(0_0%_6%)] text-[hsl(0_0%_90%)]">
      {/* HERO BACKDROP (neon gradient jako na Život s GLP-1) */}
      <div className="relative overflow-hidden border-b border-[hsl(0_0%_18%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,hsl(270_90%_65%/0.20),transparent_55%),radial-gradient(circle_at_50%_32%,hsl(330_80%_60%/0.16),transparent_60%),radial-gradient(circle_at_82%_30%,hsl(186_80%_45%/0.16),transparent_55%)]" />
        <div className="relative">
          <main className="mx-auto max-w-6xl px-4 py-10 text-center">
            {/* HEZKÁ KARTA S NADPISEM (GLP-1 styl) */}
            <header className="mx-auto mb-10 max-w-3xl rounded-2xl border border-[hsl(0_0%_18%)] bg-[hsl(0_0%_12%)]/65 p-6 shadow-xl backdrop-blur">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Rozcestník pro skupinu{" "}
                <span className="text-[hsl(0_0%_90%)]">Život s GLP-1</span>
              </h1>
            </header>

            {/* Rozcestník */}
            <HomeClient />
          </main>
        </div>
      </div>
    </div>
  );
}
