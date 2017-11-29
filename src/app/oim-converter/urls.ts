
import { apiFetch } from '../api-fetch';
import { FilingVersion, FilingsApiFactory as DocumentServiceFilingsApiFactory } from '@cfl/document-service';

const documentServiceFilings = DocumentServiceFilingsApiFactory(apiFetch, '/api/document-service/v1');

export async function filingVersion(filingVersionId: string): Promise<FilingVersion> {
  const filingVersion = await documentServiceFilings.getFilingVersion({filingVersionId});
  return filingVersion;
}

export function documentContentURL(documentId: string): string {
  return `/api/document-service/v1/documents/${documentId}/content`;
}
