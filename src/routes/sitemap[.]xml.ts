import { createFileRoute } from "@tanstack/react-router";

const paths = ["/", "/menu", "/chi-siamo", "/dolci", "/gallery", "/eventi", "/recensioni", "/contatti", "/privacy", "/cookie-policy", "/termini"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((p) => `<url><loc>https://dolcesmeralda.it${p}</loc></url>`).join("")}</urlset>`;
        return new Response(body, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
