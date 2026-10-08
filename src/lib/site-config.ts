// CONFIGURAZIONE CENTRALE — modifica qui i dati reali di Dolce Smeralda.
// Ogni valore `null` è un placeholder: il sito mostra "In arrivo" finché non viene compilato.
// Nulla qui è inventato.

export type DayHours = { open: string; close: string }[]; // "07:00" formato 24h

export const site = {
  name: "Dolce Smeralda",
  tagline: "Cornetteria & Pasticceria",
  city: "Porto Cervo",
  url: "https://dolcesmeralda.it",
  timezone: "Europe/Rome",

  // Numero WhatsApp in formato internazionale, solo cifre, es. "393331234567"
  whatsapp: null as string | null,
  phone: null as string | null, // es. "+39 0789 000000"
  email: null as string | null,
  address: null as string | null, // es. "Via ..., 07021 Porto Cervo (SS)"
  mapsQuery: null as string | null, // testo o coordinate per Google Maps

  social: {
    instagram: null as string | null, // solo username, senza @
    facebook: null as string | null, // URL completo
    tiktok: null as string | null, // solo username
  },

  // Orari: 0 = domenica ... 6 = sabato. `null` = orari non ancora forniti.
  hours: null as Record<number, DayHours> | null,

  // ID Google — lasciare null finché non disponibili
  ga4Id: null as string | null,
  searchConsoleVerification: null as string | null,

  promoPopup: { enabled: true, delayMs: 12000 },
};

export const PLACEHOLDER = "In arrivo";

export function waLink(message: string) {
  const base = site.whatsapp ? `https://wa.me/${site.whatsapp}` : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function mapsLink() {
  const q = site.mapsQuery ?? site.address ?? `${site.name} ${site.city}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;
}

export const instagramUrl = () =>
  site.social.instagram ? `https://instagram.com/${site.social.instagram}` : "https://instagram.com";

const DAYS = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
export const dayName = (d: number) => DAYS[d];

export function openStatus(now = new Date()): "open" | "closed" | "unknown" {
  if (!site.hours) return "unknown";
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: site.timezone, weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false,
  }).formatToParts(now);
  const wd = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(wd);
  const hm = `${parts.find((p) => p.type === "hour")?.value}:${parts.find((p) => p.type === "minute")?.value}`;
  const slots = site.hours[day] ?? [];
  return slots.some((s) => hm >= s.open && hm < s.close) ? "open" : "closed";
}
