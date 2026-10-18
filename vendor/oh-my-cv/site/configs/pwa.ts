import type { ModuleOptions } from "@vite-pwa/nuxt";

const scope = "/build-resume/";

export const pwa: ModuleOptions = {
  registerType: "autoUpdate",
  scope,
  base: scope,
  manifest: {
    id: scope,
    scope,
    start_url: scope,
    theme_color: "#F3F4F6",
    background_color: "#F3F4F6",
    display: "standalone",
    name: "Sheljin · Resume",
    short_name: "Sheljin Resume",
    icons: [
      {
        src: `${scope}pwa-192x192.png`,
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: `${scope}pwa-512x512.png`,
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: `${scope}favicon.svg`,
        sizes: "512x512",
        type: "image/svg",
        purpose: "any maskable"
      }
    ]
  },
  workbox: {
    navigateFallback: `${scope}index.html`,
    cacheId: "hello-me-build-resume",
    // Font families load on demand; do not download every bundled font at startup.
    globPatterns: ["**/*.{js,css,html,png,svg}"],
    maximumFileSizeToCacheInBytes: 16000000,
    cleanupOutdatedCaches: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts.googleapis.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "google-fonts-cache",
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  },
  registerWebManifestInRouteRules: true,
  writePlugin: true
};
