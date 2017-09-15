import * as cookie from 'cookie';

/**
 * Wrapper around the `fetch` builtin to add authentication information.
 *
 * Should have same signature as `window.fetch` and return a promise of the decoded JSON object.
 */
export async function apiFetchJson<T>(url: RequestInfo, init: RequestInit = {}): Promise<T> {
  const headers = { ...init.headers };
  const xsrfToken = getXsrfToken();
  if (xsrfToken) {
    headers['X-XSRF-TOKEN'] = xsrfToken;
  }
  const res = await fetch(url, {
    credentials: 'same-origin',
    ...init,
    headers,
  });
  if (res.ok) {
    return res.json();
  }
  throw res;
}

function getXsrfToken(): string | undefined {
  return cookie.parse(document.cookie)['XSRF-TOKEN'];
}
