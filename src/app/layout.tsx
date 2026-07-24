import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import AlertTicker from "@/components/layout/AlertTicker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://deepsea-guardian.vercel.app"),
  title: {
    default: "DeepSea Guardian — AI-Powered Deep Ocean Monitoring Dashboard",
    template: "%s | DeepSea Guardian",
  },
  description:
    "Real-time AI-powered monitoring dashboard for deep-sea ecosystems. Track ocean pollution, ghost fishing nets, coral bleaching events, and marine biodiversity using explainable multi-sensor fusion from underwater drones, sonar arrays, satellite imagery, and IoT sensors.",
  keywords: [
    "deep sea monitoring",
    "ocean pollution tracking",
    "marine biodiversity",
    "coral bleaching detection",
    "ghost fishing net detection",
    "underwater drone monitoring",
    "AI ocean dashboard",
    "deep ocean ecosystem",
    "marine conservation technology",
    "ocean health index",
    "real-time ocean data",
    "multi-sensor fusion",
    "explainable AI",
    "HackOcean 2026",
    "deep sea guardian",
  ],
  authors: [
    { name: "Anay Shivhare" },
    { name: "Harsh Vardhan Rajput" },
    { name: "Rashi Gupta" },
  ],
  creator: "Team HRA",
  publisher: "DeepSea Guardian — HackOcean 2026",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "DeepSea Guardian — AI-Powered Deep Ocean Monitoring",
    description:
      "Turning fragmented ocean data into one live, explainable command center. Track pollution, ghost nets, coral bleaching, and biodiversity in real-time.",
    url: "https://deepsea-guardian.vercel.app",
    siteName: "DeepSea Guardian",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DeepSea Guardian — AI-Powered Ocean Monitoring",
    description:
      "Real-time deep-sea ecosystem monitoring dashboard with explainable AI detection and multi-sensor fusion.",
    creator: "@TeamHRA",
  },
  category: "technology",
  classification: "Marine Conservation Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="canonical" href="https://deepsea-guardian.vercel.app" />
        <meta name="theme-color" content="#0B1120" />
        <meta name="color-scheme" content="dark" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "DeepSea Guardian",
              description:
                "AI-powered real-time monitoring dashboard for deep-sea ecosystems — tracking pollution, ghost fishing nets, coral bleaching, and marine biodiversity.",
              url: "https://deepsea-guardian.vercel.app",
              applicationCategory: "EnvironmentApplication",
              operatingSystem: "Web",
              author: {
                "@type": "Organization",
                name: "Team HRA",
                member: [
                  {
                    "@type": "Person",
                    name: "Anay Shivhare",
                  },
                  {
                    "@type": "Person",
                    name: "Harsh Vardhan Rajput",
                  },
                  {
                    "@type": "Person",
                    name: "Rashi Gupta",
                  },
                ],
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              featureList: [
                "Zone Health Index — composite 0-100 score per monitored zone",
                "Detection Explainability — source-by-source alert transparency",
                "Live Data Ticker — real-time simulated telemetry stream",
                "Interactive Risk Map — dark-themed Leaflet zone visualization",
                "30-Day Trend Charts — pollution, biodiversity, bleaching trends",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1 px-4 pb-12 pt-20 sm:px-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
        <AlertTicker />
      </body>
    </html>
  );
}
