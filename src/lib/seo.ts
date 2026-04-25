import { env as publicEnv } from "$env/dynamic/public";

export const SITE_NAME = "KC Cram Course";
export const DEFAULT_DESCRIPTION =
  "Focused ACT prep classes, scholarship planning tools, and enrollment support designed for the week before test day.";
export const DEFAULT_OG_IMAGE = "/branding/logo.jpg";
export const TWITTER_HANDLE = publicEnv.PUBLIC_TWITTER_HANDLE?.trim() || "";

export function getSiteUrl(fallbackOrigin?: string) {
  const siteUrl = publicEnv.PUBLIC_SITE_URL?.trim();

  if (siteUrl) {
    return siteUrl.replace(/\/+$/, "");
  }

  return (fallbackOrigin || "http://localhost:5173").replace(/\/+$/, "");
}

export function toAbsoluteUrl(pathOrUrl: string, fallbackOrigin?: string) {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  const siteUrl = getSiteUrl(fallbackOrigin);
  const normalizedPath = pathOrUrl.startsWith("/")
    ? pathOrUrl
    : `/${pathOrUrl}`;

  return `${siteUrl}${normalizedPath}`;
}
