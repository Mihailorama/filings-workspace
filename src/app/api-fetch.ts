// import * as cookie from 'cookie';

/**
 * Wrapper around the `fetch` builtin to add authentication information.
 *
 * Should have same signature as `window.fetch` and return a promise.
 */
export function apiFetchJson<T>(url: RequestInfo, init: RequestInit = {}): Promise<T> {
  return fetch(url, {
    ...init,
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      ...init.headers,
      // 'X-XSRF-TOKEN': getXsrfToken(),
    },
  })
  .then(res => res.json());
}

// function getXsrfToken(): string {
//   return cookie.parse(document.cookie)['XSRF-TOKEN'];
// }
