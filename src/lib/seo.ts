import { site } from "./site-config";

export function seo(path: string, title: string, description: string) {
  const full = `${title} | Dolce Smeralda ${site.city}`;
  return {
    meta: [
      { title: full },
      { name: "description", content: description },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${site.url}${path}` },
      { property: "og:locale", content: "it_IT" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${site.url}${path}` }],
  };
}

// Solo dati reali: i campi null vengono omessi.
export function jsonLd() {
  const d: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["Bakery", "FoodEstablishment", "LocalBusiness"],
    name: site.name,
    url: site.url,
    address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "IT", ...(site.address ? { streetAddress: site.address } : {}) },
  };
  if (site.phone) d["telephone"] = site.phone;
  if (site.email) d["email"] = site.email;
  const same = [
    site.social.instagram && `https://instagram.com/${site.social.instagram}`,
    site.social.facebook,
    site.social.tiktok && `https://tiktok.com/@${site.social.tiktok}`,
  ].filter(Boolean);
  if (same.length) d["sameAs"] = same;
  return JSON.stringify(d);
}
