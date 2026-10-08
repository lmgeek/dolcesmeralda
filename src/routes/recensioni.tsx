import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { Reviews, FinalCTA } from "@/components/site/Sections";

export const Route = createFileRoute("/recensioni")({
  head: () => seo("/recensioni", "Recensioni", "Cosa dicono i clienti di Dolce Smeralda, la cornetteria artigianale di Porto Cervo."),
  component: () => (
    <>
      <div className="pt-6" />
      <Reviews />
      <FinalCTA />
    </>
  ),
});
