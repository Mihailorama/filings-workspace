
import * as React from 'react';
import { FilingVersion } from '@cfl/document-service';
import { documentContentURL } from './urls';

interface OimConverterProps {
  filingVersion?: FilingVersion;
  message?: string;
}

export default function OimConverter(props: OimConverterProps): JSX.Element {
  const { message, filingVersion } = props;
  if (message) {
    return <div>{message}</div>;
  }
  if (filingVersion) {
    const jsonDocuments = filingVersion.documents.filter(d => d.category === 'json-rendering');
    if (jsonDocuments.length > 0) {
      const jsonDocument = jsonDocuments[0];
      return <a href={documentContentURL(jsonDocument.id)}>Download</a>;
    }
    return <div>No JSON download available.</div>;
  }
  return <div>Loading...</div>;
}
