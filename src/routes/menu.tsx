import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Search } from "lucide-react";
import { seo } from "@/lib/seo";
import { categories, products, photos } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { PageHero } from "@/components/site/Sections";

export const Route = createFileRoute("/menu")({
  validateSearch: z.object({ cat: z.string().optional() }),
  head: () => seo("/menu", "Menu", "Il menu digitale di Dolce Smeralda: cornetti, cornetti farciti, pasticceria, colazioni e caffetteria. Filtra, cerca e ordina su WhatsApp."),
  component: MenuPage,
});

function MenuPage() {
  const { cat } = Route.useSearch();
  const [q, setQ] = useState("");
  const list = useMemo(
    () => products.filter((p) => (!cat || p.category === cat) && (p.name + p.description).toLowerCase().includes(q.toLowerCase())),
    [cat, q],
  );
  const chip = "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors";
  return (
    <>
      <PageHero eyebrow="Menu digitale" title="Il nostro menu" sub="Scegli, aggiungi e ordina su WhatsApp in pochi secondi." image={photos.banco} />
      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="sticky top-16 z-20 -mx-5 bg-background/95 px-5 py-3 backdrop-blur">
          <label className="relative block">
            <span className="sr-only">Cerca un prodotto</span>
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cerca: pistacchio, cappuccino…" className="h-12 w-full rounded-full border bg-card pl-11 pr-4 outline-none focus:ring-2 focus:ring-ring" />
          </label>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            <Link to="/menu" search={{}} className={`${chip} ${!cat ? "border-primary bg-primary text-primary-foreground" : "bg-card"}`}>Tutti</Link>
            {categories.map((c) => (
              <Link key={c.id} to="/menu" search={{ cat: c.id }} className={`${chip} ${cat === c.id ? "border-primary bg-primary text-primary-foreground" : "bg-card"}`}>{c.name}</Link>
            ))}
          </div>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
        {list.length === 0 && <p className="py-16 text-center text-muted-foreground">Nessun prodotto trovato.</p>}
        <p className="mt-10 text-center text-xs text-muted-foreground">Prezzi e ingredienti in aggiornamento. Per allergie o intolleranze chiedi sempre al personale.</p>
      </section>
    </>
  );
}
