import p1 from "@/assets/photo1.jpg";
import p2 from "@/assets/photo2.jpg";
import p3 from "@/assets/photo3.jpg";
import p4 from "@/assets/photo4.jpg";
import p5 from "@/assets/photo5.jpg";
import p6 from "@/assets/photo6.jpg";
import p7 from "@/assets/photo7.jpg";
import f1 from "@/assets/focaccia1.jpg";
import f3 from "@/assets/focaccia3.jpg";
import f5 from "@/assets/focaccia5.jpg";
import f6 from "@/assets/focaccia6.jpg";
import f7 from "@/assets/focaccia7.jpg";
import f8 from "@/assets/focaccia8.jpg";
import f9 from "@/assets/focaccia9.jpg";
import cappuccino from "@/assets/cappuccino.jpg";
import eventi from "@/assets/eventi.jpg";

export const photos = {
  laminati: p1, // pain au chocolat in primo piano
  vassoio: p2, // cornetti sul banco
  pistacchio: p3, // laminati bicolore
  pasteis: p4, // vassoio misto con tortine
  cornetto: p5, // cornetto classico close-up
  preparazione: p6, // impasti in lievitazione
  banco: p7, // vetrina completa
  cappuccino,
  eventi,
  focacciaMortadella: f1,
  focacciaPistacchio: f3,
  bomboloni: f5,
  focacciaCrudo: f6,
  laboratorio: f7,
  focacciaFichi: f8,
  focacciaBurrata: f9,
};

export type Badge = "NOVITÀ" | "PIÙ VENDUTO" | "SPECIALE" | "ESAURITO";

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  price: number | null; // null = prezzo non ancora fornito
  ingredients?: string;
  allergens?: string;
  available: boolean;
  featured?: boolean;
  badges?: Badge[];
};

export const categories = [
  { id: "cornetti", name: "Cornetti", desc: "Sfogliati a mano, dorati al punto giusto.", image: photos.cornetto },
  { id: "speciali", name: "Cornetti Speciali", desc: "Laminati bicolore e farciture d'autore.", image: photos.pistacchio },
  { id: "pasticceria", name: "Pasticceria", desc: "Piccoli capolavori da vetrina.", image: photos.pasteis },
  { id: "colazione", name: "Colazione", desc: "Il modo giusto di iniziare la giornata.", image: photos.vassoio },
  { id: "caffetteria", name: "Caffetteria", desc: "Espresso, cappuccino e coccole calde.", image: photos.cappuccino },
  { id: "dolci", name: "Dolci", desc: "Girelle, trecce e golosità sfogliate.", image: photos.banco },
  { id: "bevande", name: "Bevande", desc: "Succhi, spremute e bibite fresche.", image: photos.cappuccino },
  { id: "focacce", name: "Focacce Farcite", desc: "Alte, croccanti e generose.", image: photos.focacciaBurrata },
  { id: "specialita", name: "Specialità", desc: "Le creazioni firmate Dolce Smeralda.", image: photos.laminati },
];

// Prodotti dimostrativi: nomi e descrizioni da confermare, prezzi non ancora forniti.
export const products: Product[] = [
  { id: "cornetto-classico", name: "Cornetto Classico", category: "cornetti", description: "Burro, sfoglia e profumo di forno.", image: photos.cornetto, price: null, available: true, featured: true, badges: ["PIÙ VENDUTO"], ingredients: "Da confermare", allergens: "Glutine, latte, uova" },
  { id: "cornetto-pistacchio", name: "Cornetto Pistacchio", category: "speciali", description: "Laminato bicolore con crema al pistacchio.", image: photos.pistacchio, price: null, available: true, featured: true, badges: ["SPECIALE"], ingredients: "Da confermare", allergens: "Glutine, latte, uova, frutta a guscio" },
  { id: "pain-chocolat", name: "Fagottino al Cioccolato", category: "cornetti", description: "Sfoglia croccante, cuore fondente.", image: photos.laminati, price: null, available: true, featured: true, ingredients: "Da confermare", allergens: "Glutine, latte, uova, soia" },
  { id: "girella", name: "Girella Uvetta e Crema", category: "dolci", description: "Spirale sfogliata, crema pasticcera.", image: photos.banco, price: null, available: true, ingredients: "Da confermare", allergens: "Glutine, latte, uova" },
  { id: "pastel", name: "Tortina alla Crema", category: "pasticceria", description: "Guscio sfogliato e crema caramellata.", image: photos.pasteis, price: null, available: true, featured: true, badges: ["NOVITÀ"], ingredients: "Da confermare", allergens: "Glutine, latte, uova" },
  { id: "treccia-frutti", name: "Treccia ai Frutti Rossi", category: "specialita", description: "Intreccio colorato, glassa lucida.", image: photos.banco, price: null, available: false, badges: ["ESAURITO"], ingredients: "Da confermare", allergens: "Glutine, latte, uova" },
  { id: "colazione-smeralda", name: "Colazione Smeralda", category: "colazione", description: "Cornetto a scelta + cappuccino.", image: photos.vassoio, price: null, available: true, ingredients: "Da confermare" },
  { id: "cappuccino", name: "Cappuccino", category: "caffetteria", description: "Schiuma vellutata, espresso intenso.", image: photos.cappuccino, price: null, available: true, allergens: "Latte" },
  { id: "espresso", name: "Espresso", category: "caffetteria", description: "Corto, cremoso, all'italiana.", image: photos.cappuccino, price: null, available: true },
  { id: "spremuta", name: "Spremuta d'Arancia", category: "bevande", description: "Arance fresche, spremute al momento.", image: photos.cappuccino, price: null, available: true },
  { id: "focaccia-mortadella", name: "Focaccia Mortadella e Pistacchio", category: "focacce", description: "Mortadella, crema di pistacchio e granella.", image: photos.focacciaPistacchio, price: null, available: true, featured: true, badges: ["PIÙ VENDUTO"], ingredients: "Da confermare", allergens: "Glutine, latte, frutta a guscio" },
  { id: "focaccia-crudo", name: "Focaccia Crudo e Rucola", category: "focacce", description: "Prosciutto crudo, rucola fresca.", image: photos.focacciaCrudo, price: null, available: true, ingredients: "Da confermare", allergens: "Glutine" },
  { id: "focaccia-burrata", name: "Focaccia Crudo e Burrata", category: "focacce", description: "Crudo, burrata cremosa e rucola.", image: photos.focacciaBurrata, price: null, available: true, badges: ["SPECIALE"], ingredients: "Da confermare", allergens: "Glutine, latte" },
  { id: "focaccia-fichi", name: "Focaccia Fichi e Crudo", category: "focacce", description: "Dolce e sapido, in perfetto equilibrio.", image: photos.focacciaFichi, price: null, available: true, badges: ["NOVITÀ"], ingredients: "Da confermare", allergens: "Glutine, latte" },
  { id: "focaccia-classica", name: "Focaccia Mortadella", category: "focacce", description: "Semplice, soffice, irresistibile.", image: photos.focacciaMortadella, price: null, available: true, ingredients: "Da confermare", allergens: "Glutine" },
  { id: "bomboloni", name: "Bomboloni Farciti", category: "dolci", description: "Fritti, zuccherati, pieni di crema.", image: photos.bomboloni, price: null, available: true, ingredients: "Da confermare", allergens: "Glutine, latte, uova" },
];

// Dolce del giorno: cambia l'id per aggiornarlo.
export const dolceDelGiornoId = "cornetto-pistacchio";

// Promo del giorno: si nasconde automaticamente fuori dalle date.
export const promo = {
  enabled: true,
  title: "Colazione per due",
  description: "Due cornetti a scelta e due cappuccini. Promo dimostrativa: da configurare.",
  image: photos.vassoio,
  oldPrice: null as number | null,
  price: null as number | null,
  start: "2026-01-01",
  end: "2026-12-31",
  cta: "Approfittane ora",
};

export function isPromoActive(now = new Date()) {
  if (!promo.enabled) return false;
  const today = now.toISOString().slice(0, 10);
  return today >= promo.start && today <= promo.end;
}

export const formatPrice = (p: number | null) =>
  p == null ? "Prezzo in arrivo" : new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(p);
