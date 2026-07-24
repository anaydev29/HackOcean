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
  title: {
    default: "DeepSea Guardian — AI-Powered Ocean Monitoring",
    template: "%s | DeepSea Guardian",
  },
  description:
    "Real-time monitoring dashboard for deep-sea ecosystems. Track pollution, ghost fishing nets, coral bleaching, and biodiversity using multi-sensor fusion.",
  keywords: [
    "deep sea",
    "ocean monitoring",
    "biodiversity",
    "pollution",
    "coral bleaching",
    "AI",
    "dashboard",
  ],
  authors: [
    { name: "Anay Shivhare" },
    { name: "Harsh Vardhan Rajput" },
    { name: "Rashi Gupta" },
  ],
  openGraph: {
    title: "DeepSea Guardian — AI-Powered Ocean Monitoring",
    description:
      "Turning fragmented ocean data into one live, explainable command center.",
    type: "website",
  },
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
