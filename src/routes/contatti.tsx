import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { photos } from "@/lib/products";
import { site, waLink, mapsLink, instagramUrl, PLACEHOLDER } from "@/lib/site-config";
import { PageHero, Hours, OpenBadge } from "@/components/site/Sections";
import { btn, ExtA } from "@/components/site/ui";

export const Route = createFileRoute("/contatti")({
  head: () => seo("/contatti", "Contatti e Orari", "Indirizzo, telefono, WhatsApp e orari di Dolce Smeralda a Porto Cervo. Scopri come arrivare."),
  component: Contatti,
});

function Contatti() {
  const rows: [string, string | null][] = [
    ["Indirizzo", site.address],
    ["Telefono", site.phone],
    ["WhatsApp", site.whatsapp ? `+${site.whatsapp}` : null],
    ["Email", site.email],
    ["Instagram", site.social.instagram ? `@${site.social.instagram}` : null],
  ];
  return (
    <>
      <PageHero eyebrow="Contatti" title="Passa a trovarci" image={photos.cappuccino} />
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:grid-cols-2 lg:px-8">
        <div className="rounded-2xl border bg-card p-6 shadow-soft">
          <dl className="divide-y">
            {rows.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-3 text-sm"><dt className="font-semibold">{k}</dt><dd className={v ? "" : "italic text-muted-foreground"}>{v ?? PLACEHOLDER}</dd></div>
            ))}
          </dl>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <ExtA href={mapsLink()} className={btn.primary}>Come arrivare</ExtA>
            <ExtA href={waLink("Ciao Dolce Smeralda!")} className={btn.outline}>Scrivici su WhatsApp</ExtA>
            {site.phone && <a href={`tel:${site.phone.replace(/\s/g, "")}`} className={btn.outline}>Chiamaci</a>}
            <ExtA href={instagramUrl()} className={btn.outline}>Instagram</ExtA>
          </div>
        </div>
        <div className="rounded-2xl border bg-card p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between"><h2 className="text-2xl text-primary-deep">Orari</h2><OpenBadge /></div>
          <Hours />
        </div>
        {site.address && (
          <iframe title="Mappa Dolce Smeralda" loading="lazy" className="h-80 w-full rounded-2xl border md:col-span-2" src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery ?? site.address)}&output=embed`} />
        )}
      </section>
    </>
  );
}
