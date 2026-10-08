import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { photos } from "@/lib/products";
import { PageHero, About, Gallery, FinalCTA } from "@/components/site/Sections";

export const Route = createFileRoute("/chi-siamo")({
  head: () => seo("/chi-siamo", "Chi Siamo", "La storia di Dolce Smeralda: passione per i sapori autentici e cornetti artigianali preparati ogni giorno a Porto Cervo."),
  component: () => (
    <>
      <PageHero eyebrow="Chi siamo" title="La nostra passione" image={photos.preparazione} />
      <About full />
      <Gallery limit={3} />
      <FinalCTA />
    </>
  ),
});
