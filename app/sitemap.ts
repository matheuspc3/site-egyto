import type { MetadataRoute } from "next";
import { siteData } from "@/data/dadosSite";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteData.siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
