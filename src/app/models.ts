/**
 * One of the ways the backend might be asked to validate a document.
 */
export interface ValidationProfile {
  category?: 'validation';
  id: string;  // Internal name.
  name: string;  // Human-readable label.
  description?: string;
}

/**
 * Container for ValdiationProfile instances.
 */
export interface Category {
  name: string;
  profiles: ValidationProfile[];
}

export const exampleCategory: Category = {
  name: 'validation',
  profiles: [
    {category: 'validation', description: '',
      name: 'CRDIV 2.3 (deleted)', id: 'db5e944b-966e-447d-bc1c-c0a5bb0ecee4'},
    {category: 'validation', description: 'Validation profile for testing purposes. Not currently deployed.',
      name: 'QA', id: 'eab5ffd7-86b0-47de-ba63-fe20a0df20e0'},
    {category: 'validation', description: 'Validation profile for Solvency II 2.0.1 instances. XIIF and TNEFRVM SII EIOPA enabled.',
      name: 'SII 2.0.1', id: 'cab5627a-0afa-434c-9891-cd7e37927ee5'},
    {category: 'validation', description: 'Validation profile for CRD IV 2.5 instances. Only XIIF enabled.',
      name: 'CRDIV 2.5 (disabled)', id: '1bc2e150-f7f4-42a5-9f3c-91a0c951fc23'},
    {category: 'validation',
      name: 'US SEC (disabled)', id: '20a74db3-8300 - 44f2-a5d3 - 45f0c2787168'},
    {category: 'validation',
      name: 'FRC 2.1.0,  UK 2009-09 - 01 & HMRC DPL 2013-10 - 01',  id: '24b17ed4-0d2b-4e0c-83a2-c1d72e67aa64'},
    {category: 'validation', description: '',
      name: 'CRDIV 2.2 (deleted)',  id: '7dbde9b3-1d64-4b4e-a3eb - e98535cb82d6'},
  ],
};

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
  const { profile,  file } = params;
  return !!profile && !!file;
}
