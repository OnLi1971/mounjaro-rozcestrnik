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
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        <p>Načítám…</p>
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        <div className="max-w-md bg-slate-900/80 rounded-2xl p-6 shadow-xl text-center border border-white/10">
          <h1 className="text-xl font-semibold mb-2">
            Přístup jen pro členy skupiny
          </h1>
          <p className="text-sm text-slate-300">
            Tento rozcestník je dostupný pouze přes speciální odkaz.
            Požádej admina o aktuální link.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <main className="mx-auto max-w-6xl px-4 py-10 text-center">
        {/* ✅ JEDNO CENTRÁLNÍ OKNO */}
        <header className="mb-10 rounded-2xl border border-white/10 bg-slate-900/60 p-8 shadow-xl backdrop-blur">
          <h1 className="text-3xl font-bold">
            Rozcestník pro skupinu{" "}
            <span className="text-slate-100">Život s GLP-1</span>
          </h1>

          <p className="mt-4 text-sm text-slate-300 max-w-xl mx-auto">
            Všechny kalkulačky, přehledy a užitečné odkazy na jednom místě
