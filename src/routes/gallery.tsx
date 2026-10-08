import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { photos } from "@/lib/products";
import { PageHero, Gallery, InstagramBlock } from "@/components/site/Sections";

export const Route = createFileRoute("/gallery")({
  head: () => seo("/gallery", "Gallery", "Foto dal laboratorio Dolce Smeralda: cornetti, laminati, colazioni e preparazione artigianale."),
  component: () => (
    <>
      <PageHero eyebrow="Gallery" title="Guarda, poi assaggia" image={photos.pistacchio} />
      <Gallery />
      <InstagramBlock />
    </>
  ),
});
