import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Star, X, MapPin, Clock } from "lucide-react";
import { photos, categories, products, dolceDelGiornoId, promo, isPromoActive, formatPrice } from "@/lib/products";
import { site, waLink, mapsLink, instagramUrl, openStatus, dayName, PLACEHOLDER } from "@/lib/site-config";
import { singleOrderLink } from "@/lib/cart";
import { btn, ExtA, SectionHead, Placeholder } from "./ui";
import { Reveal } from "./Reveal";

const ORDER = "Ciao Dolce Smeralda! Vorrei fare un ordine.";
const wrap = "mx-auto max-w-7xl px-5 lg:px-8";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden">
      <img src={photos.cornetto} alt="Cornetto artigianale Dolce Smeralda appena sfornato" className="absolute inset-0 -z-10 h-full w-full scale-105 object-cover" fetchPriority="high" />
      <div className="absolute inset-0 -z-10 bg-hero-fade" />
      <div className={`${wrap} w-full pb-14 pt-32 text-primary-foreground`}>
        <p className="eyebrow animate-rise">Porto Cervo · Preparati freschi ogni giorno</p>
        <h1 className="mt-4 max-w-3xl animate-rise text-5xl font-medium leading-[1.02] sm:text-7xl" style={{ animationDelay: "120ms" }}>
          Il tuo momento <em className="font-light italic text-gold">più dolce.</em>
        </h1>
        <p className="mt-5 max-w-md animate-rise text-lg opacity-90" style={{ animationDelay: "240ms" }}>
          Cornetti, dolci e specialità preparati ogni giorno con passione.
        </p>
        <div className="mt-8 flex animate-rise flex-col gap-3 sm:flex-row" style={{ animationDelay: "360ms" }}>
          <Link to="/menu" className={btn.gold}>Scopri il menu</Link>
          <ExtA href={waLink(ORDER)} className={btn.ghostLight}>Ordina su WhatsApp</ExtA>
        </div>
      </div>
    </section>
  );
}

export function Categories() {
  return (
    <section className={`${wrap} py-20`}>
      <SectionHead eyebrow="Le nostre categorie" title="Scegli la tua golosità" />
      <div className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
        {categories.map((c, i) => (
          <Reveal key={c.id} delay={i * 60} className="w-[72%] shrink-0 snap-start sm:w-[45%] md:w-auto">
            <Link to="/menu" search={{ cat: c.id }} className="group block overflow-hidden rounded-2xl bg-card shadow-soft">
              <div className="aspect-[4/5] overflow-hidden"><img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
              <div className="p-4">
                <h3 className="text-xl text-primary-deep">{c.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
                <span className="mt-3 inline-block text-xs font-bold uppercase tracking-widest text-primary">Scopri →</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Signature() {
  const feat = products.filter((p) => p.featured);
  return (
    <section className="bg-secondary py-20">
      <div className={wrap}>
        <SectionHead eyebrow="I nostri dolci" title="Impossibile resistere." sub="Scopri le specialità Dolce Smeralda." />
        <div className="grid gap-4 md:grid-cols-4 md:grid-rows-2 md:h-[36rem]">
          {feat.slice(0, 4).map((p, i) => (
            <Reveal key={p.id} delay={i * 80} className={i === 0 ? "md:col-span-2 md:row-span-2" : i === 1 ? "md:col-span-2" : ""}>
              <a href={singleOrderLink(p.name)} target="_blank" rel="noopener noreferrer" className="group relative block h-full min-h-64 overflow-hidden rounded-2xl">
                <img src={p.image} alt={p.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-hero-fade" />
                <div className="absolute bottom-0 p-5 text-primary-foreground">
                  <p className="font-display text-2xl sm:text-3xl">{p.name}</p>
                  <p className="text-sm opacity-85">{p.description}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center"><Link to="/menu" className={btn.outline}>Vedi tutto il menu</Link></div>
      </div>
    </section>
  );
}

export function DolceDelGiorno() {
  const p = products.find((x) => x.id === dolceDelGiornoId);
  if (!p) return null;
  return (
    <section className={`${wrap} py-20`}>
      <Reveal className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-primary-deep text-primary-foreground md:grid-cols-2">
        <img src={p.image} alt={p.name} loading="lazy" className="h-80 w-full object-cover md:h-full md:min-h-[28rem]" />
        <div className="p-8 md:p-12">
          <p className="eyebrow">Il Dolce del Giorno</p>
          <h2 className="mt-3 text-4xl font-medium sm:text-5xl">{p.name}</h2>
          <p className="mt-4 text-lg opacity-85">{p.description}</p>
          <p className="mt-4 font-display text-2xl text-gold">{formatPrice(p.price)}</p>
          <ExtA href={singleOrderLink(p.name)} className={`${btn.gold} mt-8`}>Ordinalo ora</ExtA>
        </div>
      </Reveal>
    </section>
  );
}

export function PromoDelGiorno() {
  const [active, setActive] = useState(false);
  useEffect(() => setActive(isPromoActive()), []);
  if (!active) return null;
  return (
    <section className={`${wrap} pb-20`}>
      <Reveal className="relative overflow-hidden rounded-[2rem] border-2 border-gold bg-card p-6 sm:p-10">
        <div className="grid items-center gap-6 md:grid-cols-[1fr_1.2fr]">
          <img src={promo.image} alt={promo.title} loading="lazy" className="aspect-square w-full rounded-2xl object-cover md:aspect-[4/3]" />
          <div>
            <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold tracking-widest text-ink">PROMO DEL GIORNO</span>
            <h2 className="mt-4 text-4xl text-primary-deep">{promo.title}</h2>
            <p className="mt-3 text-muted-foreground">{promo.description}</p>
            <p className="mt-4 flex items-baseline gap-3">
              {promo.oldPrice != null && <s className="text-muted-foreground">{formatPrice(promo.oldPrice)}</s>}
              <span className="font-display text-3xl text-primary">{formatPrice(promo.price)}</span>
            </p>
            <ExtA href={waLink(`Ciao Dolce Smeralda! Vorrei approfittare della promo: ${promo.title}.`)} className={`${btn.primary} mt-6`}>{promo.cta}</ExtA>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function About({ full = false }: { full?: boolean }) {
  return (
    <section className={`${wrap} grid items-center gap-10 py-20 md:grid-cols-2`}>
      <Reveal className="relative">
        <img src={photos.preparazione} alt="Impasti in lievitazione nel laboratorio Dolce Smeralda" loading="lazy" className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-soft" />
        <img src={photos.vassoio} alt="" loading="lazy" className="absolute -bottom-6 -right-2 hidden w-44 rotate-3 rounded-2xl border-4 border-background shadow-soft sm:block" />
      </Reveal>
      <Reveal delay={120}>
        <p className="eyebrow">Chi siamo</p>
        <h2 className="mt-3 text-4xl font-medium text-primary-deep sm:text-5xl">Passione, gusto e semplicità.</h2>
        <p className="mt-5 text-lg text-muted-foreground">Dolce Smeralda nasce dalla passione per i sapori autentici e per quei piccoli momenti che rendono speciale ogni giornata.</p>
        {full ? (
          <div className="mt-8 space-y-6">
            {["La nostra storia", "Il team", "La preparazione", "La filosofia Dolce Smeralda"].map((t) => (
              <div key={t} className="border-l-2 border-gold pl-4">
                <h3 className="text-xl text-primary-deep">{t}</h3>
                <p className="text-sm"><Placeholder>Contenuto in arrivo — testo e fotografie da fornire.</Placeholder></p>
              </div>
            ))}
          </div>
        ) : (
          <Link to="/chi-siamo" className={`${btn.outline} mt-8`}>La nostra storia</Link>
        )}
      </Reveal>
    </section>
  );
}

// Recensioni DEMO: sostituire con recensioni reali o integrazione Google Reviews.
const reviews = [
  { name: "Recensione demo", stars: 5, text: "Spazio riservato a una recensione reale dei clienti." },
  { name: "Recensione demo", stars: 5, text: "Qui comparirà un commento verificato, ad esempio da Google." },
  { name: "Recensione demo", stars: 5, text: "Contenuto segnaposto: nessuna recensione è stata inventata." },
];
export function Reviews() {
  return (
    <section className="bg-accent py-20">
      <div className={wrap}>
        <SectionHead eyebrow="Recensioni" title="Dicono di noi" sub="Contenuti dimostrativi — presto le recensioni reali dei nostri clienti." />
        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={i} delay={i * 80}>
              <figure className="h-full rounded-2xl bg-card p-6 shadow-soft">
                <div className="flex gap-0.5 text-gold" aria-label={`${r.stars} stelle su 5`}>
                  {Array.from({ length: r.stars }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
                </div>
                <blockquote className="mt-4 font-display text-lg italic text-primary-deep">“{r.text}”</blockquote>
                <figcaption className="mt-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">{r.name} · placeholder</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const galleryImgs = [
  { src: photos.banco, alt: "Vetrina di cornetti e girelle" },
  { src: photos.pistacchio, alt: "Laminati bicolore al pistacchio" },
  { src: photos.preparazione, alt: "Preparazione degli impasti" },
  { src: photos.pasteis, alt: "Tortine alla crema e fagottini" },
  { src: photos.cornetto, alt: "Cornetto classico" },
  { src: photos.laminati, alt: "Fagottini al cioccolato" },
  { src: photos.vassoio, alt: "Cornetti sul banco" },
  { src: photos.cappuccino, alt: "Cappuccino e cornetto" },
  { src: photos.eventi, alt: "Vassoio di mignon per eventi" },
  { src: photos.focacciaBurrata, alt: "Focaccia con crudo e burrata" },
  { src: photos.focacciaPistacchio, alt: "Focaccia mortadella e pistacchio" },
  { src: photos.bomboloni, alt: "Bomboloni alla crema in vetrina" },
  { src: photos.focacciaCrudo, alt: "Focaccia crudo e rucola" },
  { src: photos.focacciaFichi, alt: "Focacce con fichi e crudo" },
  { src: photos.laboratorio, alt: "Carrello di lievitazione in laboratorio" },
];
export function Gallery({ limit }: { limit?: number }) {
  const [open, setOpen] = useState<number | null>(null);
  const list = limit ? galleryImgs.slice(0, limit) : galleryImgs;
  const cur = open != null ? list[open] : undefined;
  useEffect(() => {
    if (open == null) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, [open]);
  return (
    <section className={`${wrap} py-20`}>
      <SectionHead eyebrow="Gallery" title="Dal nostro laboratorio" />
      <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
        {list.map((g, i) => (
          <button key={i} onClick={() => setOpen(i)} className="group aspect-square overflow-hidden rounded-lg sm:rounded-2xl" aria-label={`Apri foto: ${g.alt}`}>
            <img src={g.src} alt={g.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </button>
        ))}
      </div>
      {limit && <div className="mt-8 text-center"><Link to="/gallery" className={btn.outline}>Vedi la gallery</Link></div>}
      {cur && (
        <div role="dialog" aria-modal="true" aria-label={cur.alt} className="fixed inset-0 z-50 grid place-items-center bg-ink/90 p-4 animate-in fade-in" onClick={() => setOpen(null)}>
          <button aria-label="Chiudi" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-card"><X className="h-5 w-5" /></button>
          <img src={cur.src} alt={cur.alt} className="max-h-[85vh] max-w-full rounded-2xl object-contain animate-in zoom-in-95" />
        </div>
      )}
    </section>
  );
}

export function InstagramBlock() {
  return (
    <section className={`${wrap} pb-20`}>
      <Reveal className="rounded-[2rem] bg-secondary px-6 py-14 text-center">
        <p className="eyebrow">@{site.social.instagram ?? "dolcesmeralda"}</p>
        <h2 className="mt-3 text-4xl text-primary-deep">Seguici su Instagram</h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">Seguici e scopri ogni giorno le nostre novità.</p>
        <ExtA href={instagramUrl()} className={`${btn.primary} mt-7`}>Seguici su Instagram</ExtA>
      </Reveal>
    </section>
  );
}

export function Events() {
  const list = ["Compleanni", "Feste", "Eventi", "Ordini personalizzati", "Catering dolce", "Vassoi", "Torte (su richiesta)", "Preparazioni speciali"];
  return (
    <section className="relative isolate overflow-hidden py-24 text-primary-foreground">
      <img src={photos.eventi} alt="Vassoio di pasticceria mignon per eventi" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-primary-deep/85" />
      <div className={`${wrap} max-w-3xl text-center`}>
        <p className="eyebrow">Eventi e ordini speciali</p>
        <h2 className="mt-3 text-4xl font-medium sm:text-6xl">Rendi speciale il tuo evento.</h2>
        <ul className="mt-8 flex flex-wrap justify-center gap-2">
          {list.map((l) => <li key={l} className="rounded-full border border-primary-foreground/30 px-4 py-2 text-sm">{l}</li>)}
        </ul>
        <ExtA href={waLink("Ciao Dolce Smeralda! Vorrei ricevere informazioni per un ordine o un evento personalizzato.")} className={`${btn.gold} mt-10`}>Richiedi informazioni</ExtA>
      </div>
    </section>
  );
}

export function OpenBadge() {
  const [s, setS] = useState<"open" | "closed" | "unknown" | null>(null);
  useEffect(() => { setS(openStatus()); const t = setInterval(() => setS(openStatus()), 60000); return () => clearInterval(t); }, []);
  if (!s) return null;
  const map = { open: ["APERTO ORA", "bg-primary text-primary-foreground"], closed: ["CHIUSO", "bg-ink text-cream"], unknown: ["ORARI IN ARRIVO", "bg-muted text-muted-foreground"] } as const;
  return <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold tracking-widest ${map[s][1]}`}><span className="h-2 w-2 rounded-full bg-current" />{map[s][0]}</span>;
}

export function Hours() {
  return (
    <ul className="divide-y">
      {[1, 2, 3, 4, 5, 6, 0].map((d) => {
        const slots = site.hours?.[d];
        return (
          <li key={d} className="flex justify-between py-2.5 text-sm">
            <span>{dayName(d)}</span>
            <span className="text-muted-foreground">{!site.hours ? PLACEHOLDER : slots?.length ? slots.map((s) => `${s.open}–${s.close}`).join(" · ") : "Chiuso"}</span>
          </li>
        );
      })}
    </ul>
  );
}

export function Location() {
  return (
    <section className={`${wrap} grid gap-8 py-20 md:grid-cols-2`}>
      <Reveal>
        <p className="eyebrow">Vieni a trovarci</p>
        <h2 className="mt-3 text-4xl text-primary-deep">Posizione e orari</h2>
        <p className="mt-4 flex items-start gap-2"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />{site.address ?? <Placeholder>Indirizzo in arrivo · {site.city}</Placeholder>}</p>
        <div className="mt-4 flex items-center gap-2"><Clock className="h-5 w-5 text-primary" /><OpenBadge /></div>
        <ExtA href={mapsLink()} className={`${btn.primary} mt-7`}>Come arrivare</ExtA>
      </Reveal>
      <Reveal delay={100} className="rounded-2xl border bg-card p-6 shadow-soft"><Hours /></Reveal>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden py-28 text-center text-primary-foreground">
      <img src={photos.laminati} alt="" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-hero-fade" />
      <div className={wrap}>
        <h2 className="text-5xl font-medium sm:text-7xl">Ti è venuta voglia?</h2>
        <p className="mx-auto mt-4 max-w-md text-lg opacity-90">Il tuo prossimo momento dolce ti aspetta da Dolce Smeralda.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/menu" className={btn.gold}>Scopri il menu</Link>
          <ExtA href={waLink(ORDER)} className={btn.ghostLight}>Ordina ora</ExtA>
        </div>
      </div>
    </section>
  );
}

export function PageHero({ eyebrow, title, sub, image }: { eyebrow: string; title: string; sub?: string; image: string }) {
  return (
    <section className="relative isolate overflow-hidden py-24 text-primary-foreground sm:py-32">
      <img src={image} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-hero-fade" />
      <div className={wrap}>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 text-5xl font-medium sm:text-6xl">{title}</h1>
        {sub && <p className="mt-3 max-w-lg text-lg opacity-90">{sub}</p>}
      </div>
    </section>
  );
}
