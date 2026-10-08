import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/cookie-policy")({
  head: () => seo("/cookie-policy", "Cookie Policy", "Cookie Policy di Dolce Smeralda."),
  component: () => (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-4xl text-primary-deep">Cookie Policy</h1>
      <p className="mt-4 italic text-muted-foreground">Bozza: il testo definitivo deve essere redatto con i dati del titolare (ragione sociale, P.IVA, sede, contatti) e verificato da un consulente.</p>
      <div className="mt-8 space-y-4 text-foreground/85"><p>Questo sito usa cookie tecnici necessari al funzionamento (preferenze di consenso, riepilogo ordine). I cookie analitici (Google Analytics 4) vengono attivati solo dopo il tuo consenso esplicito.</p><p>Puoi modificare le tue scelte cancellando i dati del sito dal browser: il banner riapparirà.</p></div>
    </article>
  ),
});
