
import * as React from 'react';
import { FilingVersion } from '@cfl/document-service';

interface OimConverterProps {
  documentContentFetcher: (id: string) => void;
  filingVersion?: FilingVersion;
  documentContent?: string;
  message?: string;
}

export default function OimConverter(props: OimConverterProps): JSX.Element {
  const { message, documentContentFetcher, filingVersion, documentContent } = props;
  if (message) {
    return <div>{message}</div>;
  }
  if (documentContent) {
    return <div>{JSON.stringify(documentContent)}</div>;
  }
  if (filingVersion) {
    const jsonDocuments = filingVersion.documents.filter(d => d.category === 'json-rendering');
    if (jsonDocuments.length > 0) {
      const jsonDocument = jsonDocuments[0];
      documentContentFetcher(jsonDocument.id);
      return <div>Downloading...</div>;
    }
    return <div>No JSON download available.</div>;
  }
  return <div>Loading...</div>;
}
