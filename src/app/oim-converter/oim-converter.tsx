
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
    return <div>{message}</div>;
  }
  if (filingVersion) {
    const jsonDocuments = filingVersion.documents.filter(d => d.category === 'json-rendering');
    if (jsonDocuments.length > 0) {
      window.location.href = documentContentURL(jsonDocuments[0].id);
      return <Button className='app-OimConverter-button'
                     onClick={() => window.location.href = documentContentURL(jsonDocuments[0].id)}>
              Download again
             </Button>;
    }
    return <div>No JSON download available.</div>;
  }
  return <div>Loading...</div>;
}

export default function OimConverter(props: OimConverterProps): JSX.Element {
  return <div className='app-OimConverter'>
    <div className='app-OimConverter-box'>
      <div className='app-OimConverter-title'>OIM/JSON Conversion</div>
      {contents(props)}
    </div>
  </div>;

}
