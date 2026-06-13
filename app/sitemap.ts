import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const lastModified = new Date();
  return [
    { url: base,                      lastModified, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${base}/#storitve`,       lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/#o-podjetju`,     lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/#zmogljivosti`,   lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/#kontakt`,        lastModified, changeFrequency: 'monthly', priority: 0.7 },
  ];
}
