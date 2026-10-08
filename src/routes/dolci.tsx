import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { Signature, DolceDelGiorno, PromoDelGiorno, FinalCTA } from "@/components/site/Sections";

export const Route = createFileRoute("/dolci")({
  head: () => seo("/dolci", "I Nostri Dolci", "Le specialità Dolce Smeralda: cornetti al pistacchio, laminati bicolore, fagottini e pasticceria artigianale."),
  component: () => (
    <>
      <Signature />
      <DolceDelGiorno />
      <PromoDelGiorno />
      <FinalCTA />
    </>
  ),
});
