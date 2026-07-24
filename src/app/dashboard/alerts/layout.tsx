import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detection Alerts — Ghost Nets, Dumping, Bleaching & Species Sightings",
  description:
    "Browse and filter all deep-sea detection alerts by type: ghost fishing nets, illegal dumping events, coral bleaching incidents, and rare species sightings. Each alert includes a multi-sensor explainability breakdown showing which data sources corroborated the detection.",
  keywords: [
    "ocean detection alerts",
    "ghost net alert",
    "coral bleaching warning",
    "species sighting log",
    "illegal dumping detection",
    "multi-sensor explainability",
  ],
  openGraph: {
    title: "Detection Alerts — DeepSea Guardian",
    description:
      "Filter and explore deep-sea detection alerts with full source-by-source explainability for every flagged event.",
    url: "https://deepsea-guardian.vercel.app/dashboard/alerts",
  },
  alternates: {
    canonical: "https://deepsea-guardian.vercel.app/dashboard/alerts",
  },
};

export default function AlertsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
