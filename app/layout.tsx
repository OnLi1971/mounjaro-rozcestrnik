// app/layout.tsx
import "./globals.css";                 // ⬅️ DŮLEŽITÉ: načte Tailwind & shadcn styly
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { ThemeProvider } from "next-themes"; // pokud dřív nebyl, nevadí; může zůstat

export const metadata: Metadata = {
  title: "Rozcestník | SlimMedi",
  description: "Užitečné nástroje a odkazy pro Mounjaro a moderní léčbu obezity.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {/* Pokud jsi dřív používal vlastní <Providers/>, nech je tady */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>

        {/* pojistka pro načtení Vercel Insights */}
        <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
        <Analytics />
      </body>
    </html>
  );
}
