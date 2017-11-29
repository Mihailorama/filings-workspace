
import { apiFetch } from '../api-fetch';
import { FilingVersion,
  FilingsApiFactory as DocumentServiceFilingsApiFactory,
  DocumentsApiFactory as DocumentServiceDocumentsApiFactory, } from '@cfl/document-service';

const documentServiceFilings = DocumentServiceFilingsApiFactory(apiFetch, '/api/document-service/v1');
const documentServiceDocuments = DocumentServiceDocumentsApiFactory(apiFetch, '/api/document-service/v1');

export async function filingVersion(filingVersionId: string): Promise<FilingVersion> {
  const filingVersion = await documentServiceFilings.getFilingVersion({filingVersionId});
  return filingVersion;
}

export function documentContent(documentId: string): Promise<string> {
  return documentServiceDocuments.getDocumentContent({documentId});
}
