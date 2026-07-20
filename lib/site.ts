/**
 * Single source of truth for the site's absolute URL. Set NEXT_PUBLIC_SITE_URL
 * in the deployment environment (e.g. https://qreate.example) so canonical
 * URLs, the sitemap, robots.txt and Open Graph URLs all resolve correctly.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SITE_NAME = "QReate";
