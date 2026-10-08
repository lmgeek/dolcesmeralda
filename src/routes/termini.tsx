import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/termini")({
  head: () => seo("/termini", "Termini e Condizioni", "Termini e Condizioni di Dolce Smeralda."),
  component: () => (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-4xl text-primary-deep">Termini e Condizioni</h1>
      <p className="mt-4 italic text-muted-foreground">Bozza: il testo definitivo deve essere redatto con i dati del titolare (ragione sociale, P.IVA, sede, contatti) e verificato da un consulente.</p>
      <div className="mt-8 space-y-4 text-foreground/85"><p>Gli ordini inviati tramite WhatsApp sono richieste da confermare da parte di Dolce Smeralda. I prezzi indicati sul sito sono indicativi; fa fede quanto confermato in negozio.</p></div>
    </article>
  ),
});
