/**
 * One of the myriad ways the backend might be asked to validate a document.
 */
export interface ValidationProfile {
  name: string;  // Internal name.
  label: string;  // Human-readable.
}

/**
 * Information needed to request a validation operation.
 */
export interface ValidationParams {
  profile: string;
  file: File;
}

/**
 * Check these params are ready to be submitted.
 */
export function paramsAreComplete(params: Partial<ValidationParams>): params is ValidationParams {
  const { profile, file } = params;
  return !!profile && !!file;
}
