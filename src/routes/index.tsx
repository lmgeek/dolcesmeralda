import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { Hero, Categories, Signature, DolceDelGiorno, PromoDelGiorno, About, Reviews, Gallery, InstagramBlock, Events, Location, FinalCTA } from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  head: () => seo("/", "Cornetteria e Pasticceria Artigianale", "Cornetti artigianali, pistacchio, dolci e colazioni preparati freschi ogni giorno a Porto Cervo. Ordina su WhatsApp."),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Categories />
      <Signature />
      <DolceDelGiorno />
      <PromoDelGiorno />
      <About />
      <Reviews />
      <Gallery limit={6} />
      <InstagramBlock />
      <Events />
      <Location />
      <FinalCTA />
    </>
  );
}
