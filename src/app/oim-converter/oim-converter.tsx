
import * as React from 'react';
import { FilingVersion } from '@cfl/document-service';

import Button from '../components/button';
import ContactDetails from '../components/contact-details';
import FilingReference from '../components/filing-reference';

import './oim-converter.less';

interface OimConverterProps {
  filingVersion?: FilingVersion;
  message?: string;
  onDownload: (documentId: string) => void;
}

function contents(props: OimConverterProps): JSX.Element {
  const { message, filingVersion, onDownload } = props;
  const name = filingVersion && filingVersion.filing.name;
  if (message) {
    return <div className='app-OimConverter-error'>
      <div className='app-OimConverter-image app-OimConverter-errorImage'/>
      {message}
    </div>;
  }
  if (filingVersion) {
    const jsonDocuments = filingVersion.documents.filter(d => d.category === 'json-rendering');
    if (jsonDocuments.length > 0) {
      onDownload(jsonDocuments[0].id);
      return <div className='app-OimConverter-download'>
        <div className='app-OimConverter-image app-OimConverter-downloadImage'/>
        Downloaded
        {name && <FilingReference className='app-OimConverter-filing' name={name} />}
        <Button primary className='app-OimConverter-downloadButton'
          onClick={() => onDownload(jsonDocuments[0].id)}>
          Download again
        </Button>
        <ContactDetails className='app-OimConverter-contact' />
      </div>;
    }
    return <div className='app-OimConverter-error'>
      <div className='app-OimConverter-image app-OimConverter-errorImage'/>
      No JSON download available.
      {name && <FilingReference className='app-OimConverter-filing' name={name} />}
      <ContactDetails className='app-OimConverter-contact' />
    </div>;
  }
  return <div className='app-OimConverter-loading'>loading…</div>;
}

export default function OimConverter(props: OimConverterProps): JSX.Element {
  return <div className='app-OimConverter'>
    {contents(props)}
  </div>;

}
