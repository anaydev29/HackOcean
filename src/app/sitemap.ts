import type { MetadataRoute } from "next";
import { getZones } from "@/lib/data/getZones";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://deepsea-guardian.vercel.app";
  const zones = await getZones();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dashboard/alerts`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const zonePages: MetadataRoute.Sitemap = zones.map((zone) => ({
    url: `${baseUrl}/dashboard/zone/${zone.id}`,
    lastModified: new Date(),
    changeFrequency: "hourly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...zonePages];
}
