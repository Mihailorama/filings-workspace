
/**
 * Minimal model of the Platform search API results.
 */
export interface SearchResults {
  results: SearchResult[];
}

export interface SearchResult {
  company: CompanyDetails;
  matchingFilings: MatchingFiling[];
}

export interface MatchingFiling {
  id: string;
  companyId: string;
  type?: string;
  date: string;
  publicationMonth?: string;
}

export interface CompanyDetails {
  id: string;
  name: string;
}

/**
 * A single matching filing with company details.
 */
export interface FilingMatch {
  company: CompanyDetails;
  filing: MatchingFiling;
  filingName: string;
}
