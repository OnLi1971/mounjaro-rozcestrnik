// app/page.tsx
import HomeClient from "@/components/home-client";

export const metadata = {
  title: "Rozcestník | SlimMedi",
  description: "Užitečné nástroje a odkazy pro Mounjaro a moderní léčbu obezity.",
};

export default function Page() {
  return <HomeClient />;
}
