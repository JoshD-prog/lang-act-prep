import { browser } from '$app/environment';
import { env as publicEnv } from '$env/dynamic/public';

const GTAG_SCRIPT_ID = 'ga4-google-tag';
const MARKETING_PARAMS_STORAGE_KEY = 'marketing_params';

export const MARKETING_PARAM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content'
] as const;

export type AnalyticsEventParams = Record<string, string | number | boolean | null | undefined>;
export type MarketingParamKey = (typeof MARKETING_PARAM_KEYS)[number];
export type MarketingParams = Partial<Record<MarketingParamKey, string>>;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let initialized = false;

export function analyticsEnabled() {
  return browser && Boolean(publicEnv.PUBLIC_GA_MEASUREMENT_ID);
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

function ensureGtag() {
  if (!analyticsEnabled()) {
    return false;
  }

  window.dataLayer = window.dataLayer || [];

  if (!window.gtag) {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer.push(args);
    };
  }

  return true;
}

export function initAnalytics() {
  if (!ensureGtag()) {
    return false;
  }

  if (!document.getElementById(GTAG_SCRIPT_ID)) {
    const script = document.createElement('script');
    script.id = GTAG_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(publicEnv.PUBLIC_GA_MEASUREMENT_ID ?? '')}`;
    document.head.appendChild(script);
  }

  if (initialized) {
    return true;
  }

  initialized = true;
  window.gtag?.('js', new Date());
  window.gtag?.('config', publicEnv.PUBLIC_GA_MEASUREMENT_ID, {
    send_page_view: false
  });

  return true;
}

export function trackPageView(input: URL | Location | string) {
  if (!initAnalytics()) {
    return;
  }

  const url = toUrl(input);
  const pagePath = `${url.pathname}${url.search}`;

  window.gtag?.('event', 'page_view', {
    page_location: url.toString(),
    page_path: pagePath,
    page_title: document.title
  });
}

export function trackEvent(name: string, params: AnalyticsEventParams = {}) {
  if (!initAnalytics()) {
    return;
  }

  window.gtag?.('event', name, params);
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
