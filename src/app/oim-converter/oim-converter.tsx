
import * as React from 'react';
import { FilingVersion } from '@cfl/document-service';
import { documentContentURL } from './urls';

import Button from '../components/button';

import './oim-converter.less';

interface OimConverterProps {
  filingVersion?: FilingVersion;
  message?: string;
}

function contents(props: OimConverterProps): JSX.Element {
  const { message, filingVersion } = props;
  if (message) {
    return <div className='app-OimConverter-error'>
      <div className='app-OimConverter-image app-OimConverter-errorImage'/>
      {message}
    </div>;
  }
  if (filingVersion) {
    const jsonDocuments = filingVersion.documents.filter(d => d.category === 'json-rendering');
    if (jsonDocuments.length > 0) {
      window.location.href = documentContentURL(jsonDocuments[0].id);
      return <div className='app-OimConverter-download'>
        <div className='app-OimConverter-image app-OimConverter-downloadImage'/>
        Downloaded
        <Button primary className='app-OimConverter-downloadButton'>Download again</Button>
      </div>;
    }
    return <div className='app-OimConverter-error'>
      <div className='app-OimConverter-image app-OimConverter-errorImage'/>
      No JSON download available.
    </div>;
  }
  return <div className='app-OimConverter-loading'>loading...</div>;
}

export default function OimConverter(props: OimConverterProps): JSX.Element {
  return <div className='app-OimConverter'>
    {contents(props)}
  </div>;

}
