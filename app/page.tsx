export const metadata = {
  title: "Odkaz nefunkční | SlimMedi",
  description: "Tento odkaz je nefunkční. Správný odkaz je jen ve skupině MunJaro pro jaro.",
};

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 p-6">
      <div className="max-w-lg w-full rounded-2xl border border-white/10 bg-slate-900/70 p-8 shadow-xl text-center">
        <h1 className="text-2xl font-semibold mb-3">
          Tento odkaz je nefunkční
        </h1>

        <p className="text-slate-300 leading-relaxed">
          Správný odkaz je jen ve skupině{" "}
          <span className="font-semibold text-slate-100">MunJaro pro jaro</span>.
        </p>

        <p className="mt-4 text-sm text-slate-400">
          Pokud jste členem skupiny, otevřete sekci <span className="font-medium">Doporučené</span>.
        </p>
      </div>
    </main>
  );
}
