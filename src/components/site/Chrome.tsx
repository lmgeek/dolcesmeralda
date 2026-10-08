import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone, MessageCircle, MapPin, BookOpen, ShoppingBag, Minus, Plus } from "lucide-react";
import logo from "@/assets/logo.png";
import { site, waLink, mapsLink, instagramUrl, PLACEHOLDER } from "@/lib/site-config";
import { useCart, cartLines, orderMessage } from "@/lib/cart";
import { formatPrice, promo, isPromoActive } from "@/lib/products";
import { btn, ExtA } from "./ui";

const nav = [
  { to: "/", label: "Home" },
  { to: "/chi-siamo", label: "Chi Siamo" },
  { to: "/menu", label: "Menu" },
  { to: "/dolci", label: "I Nostri Dolci" },
  { to: "/gallery", label: "Gallery" },
  { to: "/eventi", label: "Eventi" },
  { to: "/recensioni", label: "Recensioni" },
  { to: "/contatti", label: "Contatti" },
] as const;

const GENERIC = "Ciao Dolce Smeralda! Vorrei fare un ordine.";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, setOpen: setCart } = useCart();
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 30);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur border-b shadow-soft" : "bg-background"}`}>
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-2.5 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="Dolce Smeralda — Home">
          <img src={logo} alt="Logo Dolce Smeralda Porto Cervo" width={44} height={44} className="h-11 w-11 rounded-lg" />
          <span className="hidden font-display text-lg font-medium text-primary-deep sm:inline">Dolce Smeralda</span>
        </Link>
        <nav aria-label="Principale" className="hidden justify-center gap-5 xl:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }} className="text-sm text-foreground/80 hover:text-primary" activeProps={{ className: "text-primary font-semibold" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="col-start-3 flex items-center gap-2">
          <button onClick={() => setCart(true)} aria-label={`Il tuo ordine, ${count} prodotti`} className="relative grid h-11 w-11 place-items-center rounded-full border hover:bg-accent">
            <ShoppingBag className="h-5 w-5 text-primary-deep" />
            {count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[11px] font-bold text-ink">{count}</span>}
          </button>
          <ExtA href={waLink(GENERIC)} className={`${btn.primary} hidden sm:inline-flex`}>Ordina ora</ExtA>
          <button className="grid h-11 w-11 place-items-center rounded-full border xl:hidden" aria-label="Apri menu" aria-expanded={open} onClick={() => setOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-primary-deep text-primary-foreground animate-in fade-in" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="font-display text-xl">Dolce Smeralda</span>
            <button className="grid h-11 w-11 place-items-center rounded-full border border-primary-foreground/30" aria-label="Chiudi menu" onClick={() => setOpen(false)}><X className="h-5 w-5" /></button>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-1 px-8">
            {nav.map((n, i) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="animate-rise py-2 font-display text-3xl" style={{ animationDelay: `${i * 40}ms` }}>{n.label}</Link>
            ))}
          </nav>
          <div className="p-6 pb-10"><ExtA href={waLink(GENERIC)} className={`${btn.gold} w-full`}>Ordina ora su WhatsApp</ExtA></div>
        </div>
      )}
    </header>
  );
}

export function CartDrawer() {
  const { items, open, setOpen, add, remove, clear } = useCart();
  const lines = cartLines(items);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-ink/50 animate-in fade-in" onClick={() => setOpen(false)}>
      <aside role="dialog" aria-modal="true" aria-label="Il tuo ordine" className="flex h-full w-full max-w-md flex-col bg-card animate-in slide-in-from-right" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-2xl text-primary-deep">Il tuo ordine</h2>
          <button aria-label="Chiudi" className="grid h-11 w-11 place-items-center rounded-full border" onClick={() => setOpen(false)}><X className="h-5 w-5" /></button>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {lines.length === 0 && <p className="text-muted-foreground">Nessun prodotto ancora. Aggiungi qualcosa di dolce dal menu.</p>}
          {lines.map(({ product, qty }) => (
            <div key={product.id} className="flex items-center gap-3">
              <img src={product.image} alt="" className="h-14 w-14 rounded-xl object-cover" loading="lazy" />
              <div className="min-w-0 flex-1"><p className="truncate font-medium">{product.name}</p><p className="text-xs text-muted-foreground">{formatPrice(product.price)}</p></div>
              <div className="flex items-center gap-1">
                <button aria-label={`Rimuovi un ${product.name}`} onClick={() => remove(product.id)} className="grid h-9 w-9 place-items-center rounded-full border"><Minus className="h-4 w-4" /></button>
                <span className="w-6 text-center font-semibold">{qty}</span>
                <button aria-label={`Aggiungi un ${product.name}`} onClick={() => add(product.id)} className="grid h-9 w-9 place-items-center rounded-full border"><Plus className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
        {lines.length > 0 && (
          <div className="space-y-2 border-t p-5">
            <ExtA href={orderMessage(items)} className={`${btn.primary} w-full`}><MessageCircle className="h-4 w-4" /> Invia ordine su WhatsApp</ExtA>
            <button onClick={clear} className="w-full py-2 text-sm text-muted-foreground underline">Svuota</button>
          </div>
        )}
      </aside>
    </div>
  );
}

export function MobileBar() {
  const items = [
    { href: site.phone ? `tel:${site.phone.replace(/\s/g, "")}` : "/contatti", label: "Chiama", Icon: Phone, ext: false },
    { href: waLink(GENERIC), label: "WhatsApp", Icon: MessageCircle, ext: true },
    { href: "/menu", label: "Menu", Icon: BookOpen, ext: false },
    { href: mapsLink(), label: "Indicazioni", Icon: MapPin, ext: true },
  ];
  return (
    <nav aria-label="Azioni rapide" className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      {items.map(({ href, label, Icon, ext }) => (
        <a key={label} href={href} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-primary-deep">
          <Icon className="h-5 w-5 text-primary" />{label}
        </a>
      ))}
    </nav>
  );
}

export function FloatingWhatsApp() {
  return (
    <ExtA href={waLink(GENERIC)} aria-label="Scrivici su WhatsApp" className="fixed bottom-20 right-4 z-30 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft transition-transform hover:scale-105 md:bottom-6">
      <MessageCircle className="h-6 w-6" />
    </ExtA>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary-deep pb-24 text-primary-foreground md:pb-10">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4 lg:px-8">
        <div>
          <img src={logo} alt="Dolce Smeralda" className="mb-4 h-20 w-20 rounded-xl" loading="lazy" />
          <p className="font-display text-2xl">Dolce Smeralda</p>
          <p className="text-sm opacity-75">Cornetteria & Pasticceria · {site.city}</p>
        </div>
        <div>
          <p className="eyebrow mb-3">Link rapidi</p>
          <ul className="space-y-2 text-sm opacity-90">
            {([["/", "Home"], ["/menu", "Menu"], ["/chi-siamo", "Chi Siamo"], ["/gallery", "Gallery"], ["/contatti", "Contatti"]] as const).map(([to, l]) => (
              <li key={to}><Link to={to} className="hover:underline">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-3">Contatti</p>
          <ul className="space-y-2 text-sm opacity-90">
            <li>Telefono: {site.phone ?? PLACEHOLDER}</li>
            <li>WhatsApp: {site.whatsapp ? `+${site.whatsapp}` : PLACEHOLDER}</li>
            <li>Indirizzo: {site.address ?? PLACEHOLDER}</li>
            <li>Orari: {site.hours ? <Link to="/contatti" className="underline">vedi orari</Link> : PLACEHOLDER}</li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-3">Social</p>
          <div className="flex gap-3">
            <ExtA href={instagramUrl()} aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full border border-primary-foreground/30"><span className="text-xs font-bold">IG</span></ExtA>
            <ExtA href={site.social.facebook ?? "https://facebook.com"} aria-label="Facebook" className="grid h-11 w-11 place-items-center rounded-full border border-primary-foreground/30"><span className="text-xs font-bold">FB</span></ExtA>
            <ExtA href={site.social.tiktok ? `https://tiktok.com/@${site.social.tiktok}` : "https://tiktok.com"} aria-label="TikTok" className="grid h-11 w-11 place-items-center rounded-full border border-primary-foreground/30 text-xs font-bold">TT</ExtA>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-primary-foreground/15 px-6 pt-6 text-xs opacity-75 sm:flex-row sm:justify-between lg:px-8">
        <p>© Dolce Smeralda — Tutti i diritti riservati.</p>
        <div className="flex gap-4">
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link to="/cookie-policy" className="hover:underline">Cookie Policy</Link>
          <Link to="/termini" className="hover:underline">Termini e Condizioni</Link>
        </div>
      </div>
    </footer>
  );
}

type Consent = { necessary: true; analytics: boolean; marketing: boolean };
export function CookieBanner() {
  const [show, setShow] = useState(false);
  const [custom, setCustom] = useState(false);
  const [c, setC] = useState({ analytics: false, marketing: false });
  useEffect(() => { if (!localStorage.getItem("ds-consent")) setShow(true); }, []);
  const save = (v: Consent) => {
    localStorage.setItem("ds-consent", JSON.stringify(v));
    window.dispatchEvent(new Event("ds-consent"));
    setShow(false);
  };
  if (!show) return null;
  return (
    <div role="dialog" aria-label="Preferenze cookie" className="fixed inset-x-3 bottom-20 z-50 mx-auto max-w-xl rounded-2xl border bg-card p-5 shadow-soft md:bottom-6">
      <p className="font-display text-lg text-primary-deep">Un biscotto, prima di iniziare?</p>
      <p className="mt-1 text-sm text-muted-foreground">Usiamo cookie tecnici necessari. Con il tuo consenso useremo anche cookie analitici. <Link to="/cookie-policy" className="underline">Cookie Policy</Link></p>
      {custom && (
        <div className="mt-3 space-y-2 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" checked disabled /> Necessari</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={c.analytics} onChange={(e) => setC({ ...c, analytics: e.target.checked })} /> Analitici</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={c.marketing} onChange={(e) => setC({ ...c, marketing: e.target.checked })} /> Marketing</label>
        </div>
      )}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <button className={`${btn.outline} px-2 text-xs`} onClick={() => save({ necessary: true, analytics: false, marketing: false })}>Rifiuta</button>
        {custom ? (
          <button className={`${btn.outline} px-2 text-xs`} onClick={() => save({ necessary: true, ...c })}>Salva</button>
        ) : (
          <button className={`${btn.outline} px-2 text-xs`} onClick={() => setCustom(true)}>Personalizza</button>
        )}
        <button className={`${btn.primary} px-2 text-xs`} onClick={() => save({ necessary: true, analytics: true, marketing: true })}>Accetta tutti</button>
      </div>
    </div>
  );
}

// Carica GA4 solo dopo il consenso analitico e solo se configurato.
export function Analytics() {
  useEffect(() => {
    const load = () => {
      if (!site.ga4Id || document.getElementById("ga4")) return;
      const consent = JSON.parse(localStorage.getItem("ds-consent") || "{}");
      if (!consent.analytics) return;
      const s = document.createElement("script");
      s.id = "ga4"; s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${site.ga4Id}`;
      document.head.appendChild(s);
      const w = window as unknown as { dataLayer: unknown[]; gtag: (...a: unknown[]) => void };
      w.dataLayer = w.dataLayer || [];
      w.gtag = function (...a: unknown[]) { w.dataLayer.push(a); };
      w.gtag("js", new Date()); w.gtag("config", site.ga4Id);
    };
    load(); window.addEventListener("ds-consent", load);
    return () => window.removeEventListener("ds-consent", load);
  }, []);
  return null;
}

export function PromoPopup() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!site.promoPopup.enabled || !isPromoActive() || sessionStorage.getItem("ds-popup")) return;
    const t = setTimeout(() => setShow(true), site.promoPopup.delayMs);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  const close = () => { sessionStorage.setItem("ds-popup", "1"); setShow(false); };
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 animate-in fade-in" onClick={close}>
      <div role="dialog" aria-modal="true" aria-label="Promozione" className="w-full max-w-sm overflow-hidden rounded-2xl bg-card shadow-soft animate-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
        <img src={promo.image} alt={promo.title} className="h-48 w-full object-cover" />
        <div className="p-6 text-center">
          <p className="eyebrow">Promo del giorno</p>
          <p className="mt-2 font-display text-2xl text-primary-deep">{promo.title}</p>
          <p className="mt-2 text-sm text-muted-foreground">{promo.description}</p>
          <ExtA href={waLink(`Ciao Dolce Smeralda! Vorrei approfittare della promo: ${promo.title}.`)} className={`${btn.primary} mt-5 w-full`} onClick={close}>{promo.cta}</ExtA>
          <button onClick={close} className="mt-2 py-2 text-sm text-muted-foreground underline">No, grazie</button>
        </div>
      </div>
    </div>
  );
}
