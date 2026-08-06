import { env as publicEnv } from "$env/dynamic/public";

export const SITE_NAME = "KC Cram Course";
export const LEGAL_NAME = "Kansas City Cram Course LLC";
export const FOUNDER_NAME = "Adam Lang";
export const TWITTER_HANDLE = "@KCCramCourse";
export const TWITTER_URL = "https://x.com/KCCramCourse";
export const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61574479443415";
export const INSTAGRAM_URL = "https://www.instagram.com/kansascitycramcourse/";
export const SERVICE_AREA = "Kansas City metro";
export const PRIMARY_LOCATION = "Kansas City, Kansas";
export const DEFAULT_DESCRIPTION =
  "Four ACT preparation classes held during the week before the test, with practice on timing, difficult questions, and common mistakes.";
export const BRAND_LOGO_IMAGE = "/branding/logo.png";
export const DEFAULT_OG_IMAGE = "/branding/logo-social.jpg";
export const PRODUCTION_SITE_URL = "https://kccramcourse.com";

export function getSiteUrl(fallbackOrigin?: string) {
  const siteUrl = publicEnv.PUBLIC_SITE_URL?.trim();

  if (siteUrl) {
    return siteUrl.replace(/\/+$/, "");
  }

  if (
    fallbackOrigin &&
    !/^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/i.test(fallbackOrigin)
  ) {
    return fallbackOrigin.replace(/\/+$/, "");
  }

  return PRODUCTION_SITE_URL;
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

export function getOrganizationSchema(siteUrl = getSiteUrl()) {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": `${siteUrl}/#organization`,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: siteUrl,
    logo: toAbsoluteUrl(BRAND_LOGO_IMAGE, siteUrl),
    image: toAbsoluteUrl(DEFAULT_OG_IMAGE, siteUrl),
    sameAs: [FACEBOOK_URL, INSTAGRAM_URL, TWITTER_URL],
    founder: {
      "@type": "Person",
      name: FOUNDER_NAME,
      jobTitle: "Test prep instructor"
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kansas City",
      addressRegion: "KS",
      addressCountry: "US"
    },
    areaServed: [
      {
        "@type": "City",
        name: "Kansas City"
      },
      {
        "@type": "AdministrativeArea",
        name: "Kansas City metro"
      }
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      areaServed: "US"
    },
    description: DEFAULT_DESCRIPTION
  };
}

export function getWebsiteSchema(siteUrl = getSiteUrl()) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: SITE_NAME,
    url: siteUrl,
    publisher: {
      "@id": `${siteUrl}/#organization`
    },
    description: DEFAULT_DESCRIPTION
  };
}

export function getFaqSchema(questions: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}
