import { Plus, MessageCircle } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { useCart, singleOrderLink } from "@/lib/cart";
import { ExtA } from "./ui";

const badgeStyle: Record<string, string> = {
  "NOVITÀ": "bg-gold text-ink",
  "PIÙ VENDUTO": "bg-primary text-primary-foreground",
  "SPECIALE": "bg-primary-deep text-primary-foreground",
  "ESAURITO": "bg-ink text-cream",
};

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  return (
    <article className={`group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-soft ${!p.available ? "opacity-70" : ""}`}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {p.badges?.map((b) => <span key={b} className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider ${badgeStyle[b]}`}>{b}</span>)}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-medium text-primary-deep">{p.name}</h3>
          <span className="shrink-0 pt-1 text-sm font-semibold text-gold">{formatPrice(p.price)}</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
        {(p.ingredients || p.allergens) && (
          <details className="mt-2 text-xs text-muted-foreground">
            <summary className="cursor-pointer font-medium text-foreground/70">Ingredienti e allergeni</summary>
            {p.ingredients && <p className="mt-1">Ingredienti: {p.ingredients}</p>}
            {p.allergens && <p>Allergeni: {p.allergens}</p>}
          </details>
        )}
        <div className="mt-auto flex gap-2 pt-4">
          <button disabled={!p.available} onClick={() => add(p.id)} aria-label={`Aggiungi ${p.name} all'ordine`} className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-full border border-primary/40 text-sm font-semibold text-primary-deep hover:bg-accent disabled:pointer-events-none">
            <Plus className="h-4 w-4" /> Aggiungi
          </button>
          {p.available && (
            <ExtA href={singleOrderLink(p.name)} aria-label={`Ordina ${p.name} su WhatsApp`} className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-full bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary-deep">
              <MessageCircle className="h-4 w-4" /> Ordina
            </ExtA>
          )}
        </div>
      </div>
    </article>
  );
}
