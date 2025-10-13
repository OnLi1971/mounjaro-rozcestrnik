// app/layout.tsx
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Rozcestník | SlimMedi",
  description: "Užitečné nástroje a odkazy pro Mounjaro a moderní léčbu obezity.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body>
        {children}
        {/* Vercel Web Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
