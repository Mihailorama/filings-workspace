/*
 *  Copyright 2017 CoreFiling S.A.R.L.
 *
 *  Licensed under the Apache License, Version 2.0 (the 'License');
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an 'AS IS' BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import {  SearchResults, FilingMatch } from './models';
import { apiFetch, apiFetchJson } from '../api-fetch';
import { FilingsApiFactory as DocumentServiceFilingsApiFactory } from '@cfl/document-service';
import { FilingDetails as LinkServiceFilingDetails,
  SuccessResponse as LinkServiceSuccessResponse,
  FilingApiFactory as LinkServiceApiFactory } from '@cfl/beacon-link-service-api';

// This fixes the dataset to the US SEC.
const mandate = 'us-sec';
const searchServiceBase = `/api/search-service/v1/${mandate}/query`;

const documentService = DocumentServiceFilingsApiFactory(apiFetch, '/api/document-service/v1');
const linkService = LinkServiceApiFactory(apiFetch, '/api/beacon-link-service/v1');

const queryTemplate = (search: string) => (
  {
    query: {
      type: 'any',
      children: [
        {
          name: 'edgar:CIK',
          type: 'match',
          value: search,
          proximity: 0,
        },
        {
          name: 'edgar:ConformedName',
          type: 'match',
          value: search,
        },
      ],
    },
  }
);

export async function filingVersionName(filingVersionId: string): Promise<string> {
  const filingVersion = await documentService.getFilingVersion({filingVersionId});
  return filingVersion.filing.name;
}

export function isFilingVersionReady(filingVersionId: string): Promise<boolean> {
  return documentService.getFilingVersion({filingVersionId})
    .then(r => r.status === 'DONE');
}

function formatResult(searchResults: SearchResults): FilingMatch[] {
  return searchResults.results.map(result => {
    // Generate a name for the filing based on the search result.
    const filing = result.matchingFilings[0];
    const company = result.company;
    const format = new Intl.DateTimeFormat(window.navigator.language || 'en-US', { year: 'numeric', month: 'short', day: '2-digit'});
    const formattedDate = format.format(new Date(filing.date));
    const filingName = `${company.name} (${company.id}) ${filing.type && filing.type + ', '}${formattedDate}`;
    return {company, filing, filingName};
  });
}

function searchForFilings(search: string, size: number): Promise<FilingMatch[]> {
  return apiFetchJson(`${searchServiceBase}?size=${size}`, {
    method: 'POST',
      headers: {'Content-Type': 'application/json'} as any,
      body: JSON.stringify(queryTemplate(search)),
    })
    .then(v => v as SearchResults)
    .then(r => formatResult(r));
}

export function latestFiling(search: string): Promise<FilingMatch|undefined> {
  return searchForFilings(search, 1)
    .then(filings => {
      if (filings.length > 0) {
        // The newest filing is first in the list of matches.
        return filings[0];
      }
      return undefined;
    });
}

export function matchingFilings(search: string): Promise<FilingMatch[]> {
  return searchForFilings(search, 25);
}

/**
 * @param match The filing to link to the platform APIs.
 * @returns The filing version id on the platform APIs.  Note it may not be processed at this point.
 */
export function linkToPlatform(match: FilingMatch): Promise<string> {
  const linkServiceDetails: LinkServiceFilingDetails = {
    name: match.filingName,
    company: match.company.id,
    filing: match.filing.id,
    mandate,
  };

  return linkService.postFiling({filingDetails: linkServiceDetails})
    .then((linkResult: LinkServiceSuccessResponse) => linkResult.filingVersionId);
}
