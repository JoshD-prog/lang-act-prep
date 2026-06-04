import { dev } from '$app/environment';
import { request as httpRequest } from 'node:http';
import { Agent, request as httpsRequest } from 'node:https';

const localInsecureAgents = new Map<string, Agent>();
const warnedHosts = new Set<string>();
const TLS_VERIFICATION_ERROR_PATTERN =
  /UNABLE_TO_VERIFY_LEAF_SIGNATURE|SELF_SIGNED_CERT_IN_CHAIN|DEPTH_ZERO_SELF_SIGNED_CERT|unable to verify the first certificate/i;

function getErrorText(error: unknown) {
  if (!error) return '';

  if (error instanceof Error) {
    const cause =
      error.cause instanceof Error
        ? ` ${error.cause.message} ${(error.cause as Error & { code?: string }).code ?? ''}`
        : '';

    return `${error.message} ${(error as Error & { code?: string }).code ?? ''}${cause}`;
  }

  return String(error);
}

function isSupabaseApiHost(hostname: string) {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.supabase.co');
}

function canRetryWithLocalInsecureTls(input: string | URL | Request, error: unknown) {
  if (!dev) return false;
  if (!TLS_VERIFICATION_ERROR_PATTERN.test(getErrorText(error))) return false;

  const url = new URL(input instanceof Request ? input.url : input);

  return url.protocol === 'https:' && isSupabaseApiHost(url.hostname);
}

function getLocalInsecureAgent(origin: string) {
  const existing = localInsecureAgents.get(origin);
  if (existing) return existing;

  const agent = new Agent({ rejectUnauthorized: false });
  localInsecureAgents.set(origin, agent);

  return agent;
}

async function fetchWithLocalInsecureTls(input: string | URL | Request, init?: RequestInit) {
  const request = new Request(input, init);
  const url = new URL(request.url);
  const transportRequest = url.protocol === 'http:' ? httpRequest : httpsRequest;
  const headers = Object.fromEntries(request.headers.entries());
  const agent = url.protocol === 'https:' ? getLocalInsecureAgent(url.origin) : undefined;
  const body = request.body ? Buffer.from(await request.arrayBuffer()) : undefined;

  return await new Promise<Response>((resolve, reject) => {
    const outbound = transportRequest(
      url,
      {
        method: request.method,
        headers,
        agent,
        signal: request.signal
      },
      (incoming) => {
        const chunks: Buffer[] = [];

        incoming.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        incoming.on('end', () => {
          resolve(
            new Response(Buffer.concat(chunks), {
              status: incoming.statusCode,
              statusText: incoming.statusMessage,
              headers: incoming.headers as HeadersInit
            })
          );
        });
      }
    );

    outbound.on('error', reject);

    if (body) {
      outbound.write(body);
    }

    outbound.end();
  });
}

export async function fetchSupabaseWithLocalTlsFallback(
  input: string | URL | Request,
  init?: RequestInit
) {
  try {
    return await fetch(input, init);
  } catch (error) {
    if (!canRetryWithLocalInsecureTls(input, error)) {
      throw error;
    }

    const url = new URL(input instanceof Request ? input.url : input);

    if (!warnedHosts.has(url.host)) {
      warnedHosts.add(url.host);
      console.warn(
        `Supabase TLS verification failed for ${url.host}; retrying with a local-development-only TLS fallback. Configure NODE_EXTRA_CA_CERTS with the trusted root CA to avoid this fallback.`
      );
    }

    return fetchWithLocalInsecureTls(input, init);
  }
}
