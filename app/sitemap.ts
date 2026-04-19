import type { MetadataRoute } from "next";
import { ENTITIES } from "@/brand/entities";

const BASE = "https://digital-data-solutions.net";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/brand`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    ...ENTITIES.map((e) => ({
      url: `${BASE}/${e.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
