import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { Events, Gallery, FinalCTA } from "@/components/site/Sections";

export const Route = createFileRoute("/eventi")({
  head: () => seo("/eventi", "Eventi e Ordini Speciali", "Compleanni, feste, catering dolce e vassoi personalizzati: rendi speciale il tuo evento con Dolce Smeralda."),
  component: () => (
    <>
      <Events />
      <Gallery limit={6} />
      <FinalCTA />
    </>
  ),
});
