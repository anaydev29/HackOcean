import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DeepSea Guardian — AI-Powered Ocean Monitoring",
    short_name: "DeepSea Guardian",
    description:
      "Real-time AI-powered monitoring dashboard for deep-sea ecosystems. Track pollution, ghost nets, coral bleaching, and biodiversity.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B1120",
    theme_color: "#0B1120",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
