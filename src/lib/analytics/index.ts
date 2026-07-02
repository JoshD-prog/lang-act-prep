import { browser } from '$app/environment';
import { env as publicEnv } from '$env/dynamic/public';

const GTAG_SCRIPT_ID = 'ga4-google-tag';
const META_PIXEL_SCRIPT_ID = 'meta-pixel-script';
const MARKETING_PARAMS_STORAGE_KEY = 'marketing_params';

export const MARKETING_PARAM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content'
] as const;

export type AnalyticsEventParams = Record<
  string,
  string | number | boolean | string[] | null | undefined
>;
export type MarketingParamKey = (typeof MARKETING_PARAM_KEYS)[number];
export type MarketingParams = Partial<Record<MarketingParamKey, string>>;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: MetaPixelFunction;
    _fbq?: MetaPixelFunction;
  }
}

type MetaPixelFunction = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  push?: MetaPixelFunction;
  loaded?: boolean;
  version?: string;
  queue?: IArguments[];
};

let initialized = false;
let metaInitialized = false;

export function analyticsEnabled() {
  return browser && getGoogleTagIds().length > 0;
}

export function metaPixelEnabled() {
  return browser && Boolean(publicEnv.PUBLIC_META_PIXEL_ID?.trim());
}

function toUrl(input: URL | Location | string) {
  if (input instanceof URL) {
    return input;
  }

  if (typeof input === 'string') {
    return new URL(input, window.location.origin);
  }

  return new URL(input.href);
}

function getGoogleTagIds() {
  const ids = [publicEnv.PUBLIC_GA_MEASUREMENT_ID, publicEnv.PUBLIC_GOOGLE_ADS_ID].filter(
    (value): value is string => Boolean(value?.trim())
  );

  return [...new Set(ids)];
}

function getPrimaryGoogleTagId() {
  return publicEnv.PUBLIC_GA_MEASUREMENT_ID || publicEnv.PUBLIC_GOOGLE_ADS_ID || '';
}

function cleanEventParams(params: AnalyticsEventParams) {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined));
}

function ensureGtag() {
  if (!analyticsEnabled()) {
    return false;
  }

  window.dataLayer = window.dataLayer || [];

  if (!window.gtag) {
    window.gtag = function gtag(..._args: unknown[]) {
      window.dataLayer.push(arguments);
    };
  }

  return true;
}

function ensureMetaPixel() {
  if (!metaPixelEnabled()) {
    return false;
  }

  if (!window.fbq) {
    let fbq: MetaPixelFunction;
    fbq = function (...args: unknown[]) {
      if (fbq.callMethod) {
        fbq.callMethod(...args);
        return;
      }

      fbq.queue?.push(arguments);
    };

    if (!window._fbq) {
      window._fbq = fbq;
    }

    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    window.fbq = fbq;
  }

  return true;
}

export function initAnalytics() {
  const hasGoogleAnalytics = ensureGtag();
  const hasMetaPixel = initMetaPixel();

  if (!hasGoogleAnalytics) {
    return hasMetaPixel;
  }

  if (!document.getElementById(GTAG_SCRIPT_ID)) {
    const script = document.createElement('script');
    script.id = GTAG_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(getPrimaryGoogleTagId())}`;
    document.head.appendChild(script);
  }

  if (initialized) {
    return true;
  }

  initialized = true;
  window.gtag?.('js', new Date());

  if (publicEnv.PUBLIC_GA_MEASUREMENT_ID) {
    window.gtag?.('config', publicEnv.PUBLIC_GA_MEASUREMENT_ID, {
      send_page_view: false
    });
  }

  if (publicEnv.PUBLIC_GOOGLE_ADS_ID) {
    window.gtag?.('config', publicEnv.PUBLIC_GOOGLE_ADS_ID);
  }

  return true;
}

export function initMetaPixel() {
  if (!ensureMetaPixel()) {
    return false;
  }

  if (!document.getElementById(META_PIXEL_SCRIPT_ID)) {
    const script = document.createElement('script');
    script.id = META_PIXEL_SCRIPT_ID;
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);
  }

  if (metaInitialized) {
    return true;
  }

  metaInitialized = true;
  window.fbq?.('init', publicEnv.PUBLIC_META_PIXEL_ID);

  return true;
}

export function trackPageView(input: URL | Location | string) {
  const analyticsReady = initAnalytics();
  const metaReady = initMetaPixel();

  if (!analyticsReady && !metaReady) {
    return;
  }

  const url = toUrl(input);
  const pagePath = `${url.pathname}${url.search}`;

  if (analyticsReady) {
    window.gtag?.('event', 'page_view', {
      page_location: url.toString(),
      page_path: pagePath,
      page_title: document.title
    });
  }

  if (metaReady) {
    window.fbq?.('track', 'PageView');
  }
}

export function trackEvent(name: string, params: AnalyticsEventParams = {}) {
  if (initAnalytics()) {
    window.gtag?.('event', name, cleanEventParams(params));
  }
}

export function trackMetaEvent(name: string, params: AnalyticsEventParams = {}) {
  if (!initMetaPixel()) {
    return;
  }

  window.fbq?.('track', name, cleanEventParams(params));
}

export function trackMetaPurchase(params: {
  value?: number;
  currency?: string;
  transactionId?: string;
}) {
  if (!initMetaPixel()) {
    return;
  }

  window.fbq?.(
    'track',
    'Purchase',
    cleanEventParams({
      value: params.value,
      currency: params.currency,
      order_id: params.transactionId
    })
  );
}

export function trackGoogleAdsConversion(params: {
  value?: number;
  currency?: string;
  transactionId?: string;
}) {
  if (!initAnalytics()) {
    return;
  }

  if (!publicEnv.PUBLIC_GOOGLE_ADS_ID || !publicEnv.PUBLIC_GOOGLE_ADS_CONVERSION_LABEL) {
    return;
  }

  window.gtag?.(
    'event',
    'conversion',
    cleanEventParams({
      send_to: `${publicEnv.PUBLIC_GOOGLE_ADS_ID}/${publicEnv.PUBLIC_GOOGLE_ADS_CONVERSION_LABEL}`,
      value: params.value,
      currency: params.currency,
      transaction_id: params.transactionId
    })
  );
}

export function getMarketingParams(source: URL | URLSearchParams | FormData) {
  const params: MarketingParams = {};

  for (const key of MARKETING_PARAM_KEYS) {
    const value =
      source instanceof URL
        ? source.searchParams.get(key)
        : source instanceof URLSearchParams
          ? source.get(key)
          : source.get(key);

    if (typeof value === 'string' && value.trim()) {
      params[key] = value.trim();
    }
  }

  return params;
}

export function appendMarketingParams(path: string, params: MarketingParams) {
  const isAbsoluteUrl = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(path);
  const url = new URL(path, 'https://analytics.local');

  for (const [key, value] of Object.entries(params)) {
    if (value && !url.searchParams.has(key)) {
      url.searchParams.set(key, value);
    }
  }

  if (isAbsoluteUrl) {
    return url.toString();
  }

  const search = url.searchParams.toString();
  return `${url.pathname}${search ? `?${search}` : ''}${url.hash}`;
}

export function rememberMarketingParams(input: URL | Location | string) {
  if (!browser) {
    return;
  }

  const params = getMarketingParams(toUrl(input));
  if (!Object.keys(params).length) {
    return;
  }

  sessionStorage.setItem(MARKETING_PARAMS_STORAGE_KEY, JSON.stringify(params));
}

export function getStoredMarketingParams() {
  if (!browser) {
    return {} satisfies MarketingParams;
  }

  const rawValue = sessionStorage.getItem(MARKETING_PARAMS_STORAGE_KEY);
  if (!rawValue) {
    return {} satisfies MarketingParams;
  }

  try {
    const parsed = JSON.parse(rawValue) as MarketingParams;
    const params: MarketingParams = {};

    for (const key of MARKETING_PARAM_KEYS) {
      const value = parsed[key];
      if (typeof value === 'string' && value.trim()) {
        params[key] = value;
      }
    }

    return params;
  } catch {
    return {} satisfies MarketingParams;
  }
}

export function marketingParamsEntries(params: MarketingParams) {
  return Object.entries(params).filter((entry): entry is [MarketingParamKey, string] => Boolean(entry[1]));
}

export function preserveMarketingParams(
  node: HTMLAnchorElement | HTMLFormElement,
  sourceParams?: MarketingParams
) {
  if (!browser) {
    return {
      destroy() {}
    };
  }

  const apply = () => {
    const params = Object.keys(sourceParams ?? {}).length ? sourceParams! : getStoredMarketingParams();
    if (!Object.keys(params).length) {
      return;
    }

    if (node instanceof HTMLAnchorElement) {
      node.href = appendMarketingParams(node.getAttribute('href') ?? node.href, params);
      return;
    }

    for (const key of MARKETING_PARAM_KEYS) {
      node.querySelector(`input[name="${key}"]`)?.remove();
    }

    for (const [key, value] of marketingParamsEntries(params)) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      node.appendChild(input);
    }
  };

  apply();

  return {
    update(nextParams?: MarketingParams) {
      sourceParams = nextParams;
      apply();
    },
    destroy() {}
  };
}

export function trackEnrollCta(
  node: HTMLAnchorElement,
  params: AnalyticsEventParams = {}
) {
  const handleClick = () => {
    trackEvent('enroll_click', {
      destination_path: `${node.pathname}${node.search}`,
      ...params
    });
  };

  node.addEventListener('click', handleClick);

  return {
    update(nextParams: AnalyticsEventParams = {}) {
      params = nextParams;
    },
    destroy() {
      node.removeEventListener('click', handleClick);
    }
  };
}

export function markEventOnce(key: string) {
  if (!browser) {
    return true;
  }

  const storageKey = `analytics_event:${key}`;
  if (sessionStorage.getItem(storageKey)) {
    return false;
  }

  sessionStorage.setItem(storageKey, '1');
  return true;
}
