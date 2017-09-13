// Interface declarations dfor the JSON objects returned by the API.

/**
 * Info about the currently logged-in user.
 */

export interface User {
  sub: string;  // Subject indentifier: uniquely identifies this user.
  email: string;
  name?: string;
  preferred_username?: string;
}

export const exampleUser: User = {
  sub: 'ecdc0363-976d-4a42-a4cc-ae5d63f3a806',
  name: 'Akira Knutson',
  preferred_username: 'at',
  email: 'at@example.com',
};

/**
 * Information about other apps.
 */
export interface App {
  id: string;
  name?: string;
  href?: string;
  colour?: string;
  iconHref?: string;  // Not SRC for reasons I am sure are excellent.
  features?: string[];  // Optional features enabled in this app.
}

export const exampleApps: App[] = [
  {id: 'beacon', name: 'Beacon', href: '/beacon/', colour: '#3c7c34', iconHref: '/img/logo-beacon.svg', features: []},
  {id: 'account', name: 'Manage account', href: '/auth/account', colour: '#3A75C4', features: []},
  {id: 'sms', name: 'Manage organisation', href: '/sms/', colour: '#3A75C4', features: []},
];

/**
 * One of the ways the backend might be asked to validate a document.
 */
export interface Profile {
  category?: 'validation';
  id: string;  // Internal name.
  name: string;  // Human-readable label.
  description?: string;
}

/**
 * Returned by `/categories/validation`. Container for ValdiationProfile instances.
 */
export interface Category {
  name: string;
  profiles: Profile[];
}

export const exampleCategory: Category = {
  name: 'validation',
  profiles: [
    {
      id: 'cab5627a-0afa-434c-9891-cd7e37927ee5',
      category: 'validation',
      name: 'SII 2.0.1',
      description: 'Validation profile for Solvency II 2.0.1 instances. XIIF and TNEFRVM SII EIOPA enabled.',
    },
    {
      id: '24b17ed4-0d2b-4e0c-83a2-c1d72e67aa64',
      category: 'validation',
      name: 'FRC 2.1.0,  UK 2009-09 - 01 & HMRC DPL 2013-10 - 01',
    },
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

/**
 * Information about filing returned by Document Service.
 */
export interface Filing {
  id: string;
  type: 'Filing' | 'FilingSummary';
  name: string;  // Human-chosen name for this filing.  (Defaults to name of uploaded file.)
  versions?: FilingVersion[];  // Included if type is `Filing`.
};

/**
 * Information about one version of a filing. (Filings at present always have exactly one version.)
 */
export interface FilingVersion {
  type: 'FilingVersion' | 'FilingVersionSummary';
  id: string;
  creator?: Actor;
  status: 'PENDING' | 'RUNNING' | 'DONE';
  validationStatus?: ValidationStatus;
  documents?: Document[];  // Included if type is `FilingVersion`
  filing?: Filing;  // Included if type is `FilingVersion`.
  created: string; // Date in XML Schema format
  deleted?: string;  // Date in XML Schema format
};

export type ValidationStatus = 'FATAL_ERROR' | 'ERROR' | 'WARNING' | 'OK';

/**
 * Describes the person or system that performed an action.
 */
export interface Actor {
  id: string;
  name?: string;
};

/**
 * Describes a representation of data associated with a filing.
 */
export interface Document {
  id: string;
  category: 'validation' | 'unknown';
  profile: string;  // Identifies a validation profile.
  creation?: {
    status: 'PENDING' | 'RUNNING' | 'DONE';
  };
  created: string;  // XML Schema data format
}

export const exampleFiling: Filing = {
  id: '8723b794-3261-4cd3-b946-b683c19fb99c',
  type: 'Filing',
  name: 'report.xbrl',
  versions: [
    {
      id: 'f09be954-1895-4954-b333-6c9c89b833f1',
      type: 'FilingVersionSummary',
      created: '2017-09-12T10:09:49.915Z',
      creator: {
        id: '4b7fe222-0d6e-4ae1-977d-c4eb047c2fbc',
        name: 'Gurdeep Tash',
        // https://www.behindthename.com/random/random.php?number=1&gender=u&surname=&randomsurname=yes&norare=yes&nodiminutives=yes&all=yes
      },
      status: 'RUNNING',
    },
  ],
};

export const exampleFilingVersion: FilingVersion = {
  id: 'f09be954-1895-4954-b333-6c9c89b833f1',
  type: 'FilingVersion',
  created: '2017-09-12T10:09:49.915Z',
  creator:  {
    id: '4b7fe222-0d6e-4ae1-977d-c4eb047c2fbc',
    name: 'Gurdeep Tash',
  },
  status: 'DONE',
  validationStatus: 'OK',
  documents: [
    {
      category: 'validation',
      created: '2017-09-12T10:09:50.875Z',
      creation: {status: 'DONE'},
      id: '081c4d35-7c12-40e9-b3a5-df3eb8ddc214',
      profile: 'SII 2.0.1',
    },
    {
      category: 'unknown',
      created: '2017-09-12T10:09:49.915Z',
      id: 'd18a0433-8f5d-44d3-821b-3b505df37d63',
      profile: 'default',
    },
  ],
  filing: {
    type: 'FilingSummary',
    id: '8723b794-3261-4cd3-b946-b683c19fb99c',
    name: 'report.xbrl',
  },
};
