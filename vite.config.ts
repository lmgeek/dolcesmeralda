// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { existsSync } from "node:fs";
import { dirname, isAbsolute, resolve } from "node:path";
import type { Plugin } from "vite";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const SIDECAR_SUFFIX = ".asset.json";
const SIDECAR_VIRTUAL = "\0asset-sidecar:";

function resolveImagePath(
  specifier: string,
  importer: string | undefined,
  aliasRoot: string,
) {
  if (specifier.startsWith("@/")) return `${aliasRoot}/${specifier.slice(2)}`;
  if (isAbsolute(specifier)) return specifier;
  if (specifier.startsWith(".") && importer)
    return resolve(dirname(importer), specifier);
}

// Lovable editor imports assets via `*.asset.json` sidecars; this fallback lets
// the same code build locally/docker when the sidecars are absent.
function assetSidecarFallback(): Plugin {
  const aliasRoot = `${process.cwd()}/src`;
  return {
    name: "asset-sidecar-fallback",
    enforce: "pre",
    resolveId(id, importer) {
      const [file] = id.split("?", 1);
      if (!file.endsWith(SIDECAR_SUFFIX)) return;
      const image = resolveImagePath(file, importer, aliasRoot);
      if (
        !image ||
        !existsSync(image) ||
        existsSync(`${image}${SIDECAR_SUFFIX}`)
      )
        return;
      return `${SIDECAR_VIRTUAL}${image}`;
    },
    async load(id) {
      if (!id.startsWith(SIDECAR_VIRTUAL)) return;
      const resolved = await this.resolve(id.slice(SIDECAR_VIRTUAL.length));
      if (!resolved) return;
      return `import url from ${JSON.stringify(resolved.id)};\nexport default { url };`;
    },
  };
}

// Docker builds run with NITRO_PRESET=node-server and must mount the TanStack SSR
// renderer on `/**`. The Lovable cloud build ignores NITRO_PRESET, so this never
// applies there (it keeps its default renderer/template handling).
const usesNodePreset = (process.env.NITRO_PRESET ?? "").startsWith("node");

export default defineConfig({
  plugins: [assetSidecarFallback()],
  nitro: usesNodePreset
    ? {
        renderer: {
          handler: resolve(
            process.cwd(),
            "node_modules/nitro/dist/runtime/internal/vite/ssr-renderer.mjs",
          ),
        },
      }
    : undefined,
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
