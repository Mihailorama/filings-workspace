export interface ValidationProfile {
  name: string;  // Internal name.
  label: string;  // Human-readable.
}

export interface ValidationParams {
  profile: string;
  content: File;
}

export function paramsAreComplete(params: Partial<ValidationParams>): params is ValidationParams {
  const { profile, content } = params;
  return !!profile && !!content;
}
