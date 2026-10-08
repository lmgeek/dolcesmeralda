import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { products, type Product } from "./products";
import { waLink } from "./site-config";

type Ctx = {
  items: Record<string, number>;
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number;
  open: boolean;
  setOpen: (v: boolean) => void;
};
const CartCtx = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);
  useEffect(() => {
    try { setItems(JSON.parse(localStorage.getItem("ds-cart") || "{}")); } catch { /* noop */ }
  }, []);
  useEffect(() => { localStorage.setItem("ds-cart", JSON.stringify(items)); }, [items]);
  const add = (id: string) => setItems((s) => ({ ...s, [id]: (s[id] ?? 0) + 1 }));
  const remove = (id: string) =>
    setItems((s) => {
      const n = { ...s, [id]: (s[id] ?? 0) - 1 };
      if ((n[id] ?? 0) <= 0) delete n[id];
      return n;
    });
  const count = Object.values(items).reduce((a, b) => a + b, 0);
  return (
    <CartCtx.Provider value={{ items, add, remove, clear: () => setItems({}), count, open, setOpen }}>
      {children}
    </CartCtx.Provider>
  );
}

export const useCart = () => {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart outside provider");
  return c;
};

export function cartLines(items: Record<string, number>) {
  return Object.entries(items)
    .map(([id, qty]) => ({ product: products.find((p) => p.id === id), qty }))
    .filter((l): l is { product: Product; qty: number } => !!l.product);
}

export function orderMessage(items: Record<string, number>) {
  const lines = cartLines(items);
  const allPriced = lines.every((l) => l.product.price != null);
  const total = lines.reduce((s, l) => s + (l.product.price ?? 0) * l.qty, 0);
  let msg = "Ciao Dolce Smeralda!\n\nVorrei effettuare questo ordine:\n\n";
  msg += lines.map((l) => `${l.qty}x ${l.product.name}`).join("\n");
  if (allPriced && lines.length) msg += `\n\nTotale indicativo: €${total.toFixed(2)}`;
  msg += "\n\nNome:\nOrario di ritiro:";
  return waLink(msg);
}

export const singleOrderLink = (name: string) => waLink(`Ciao Dolce Smeralda! Vorrei ordinare: ${name}.`);
