import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => seo("/privacy", "Privacy Policy", "Privacy Policy di Dolce Smeralda."),
  component: () => (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-4xl text-primary-deep">Privacy Policy</h1>
      <p className="mt-4 italic text-muted-foreground">Bozza: il testo definitivo deve essere redatto con i dati del titolare (ragione sociale, P.IVA, sede, contatti) e verificato da un consulente.</p>
      <div className="mt-8 space-y-4 text-foreground/85"><p>Titolare del trattamento: Dolce Smeralda (dati in arrivo). Trattiamo i dati che ci invii volontariamente tramite WhatsApp, telefono o email solo per rispondere alle tue richieste e gestire gli ordini, ai sensi del Regolamento UE 2016/679 (GDPR).</p><p>Puoi esercitare i diritti di accesso, rettifica, cancellazione, limitazione, opposizione e portabilità contattando il titolare.</p></div>
    </article>
  ),
});
