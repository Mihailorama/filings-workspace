// import * as cookie from 'cookie';

/**
 * Wrapper around the `fetch` builtin to add authentication information.
 *
 * Should have same signature as `window.fetch` and return a promise of the decoded JSON object.
 */
export function apiFetchJson<T>(url: RequestInfo, init: RequestInit = {}): Promise<T> {
  return fetch(url, {
    credentials: 'same-origin',
    ...init,
    headers: {
      ...init.headers,
      // 'X-XSRF-TOKEN': getXsrfToken(),
    },
  })
  .then(res => res.json());
}

// function getXsrfToken(): string {
//   return cookie.parse(document.cookie)['XSRF-TOKEN'];
// }
