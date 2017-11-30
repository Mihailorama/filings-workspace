import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import OimConverter from './oim-converter';

storiesOf('OIM Converter', module)
  .add('Loading', () => {
    return <OimConverter onDownload={action('Download')} />;
  })
  .add('Without download', () => {
    const exampleFilingVersion: any = {
      filing: { name: 'Example filing.zip' },
      documents: [ {category: 'something-else', id: '6d504704-cfed-4400-8772-44da2fc4c145'}, ],
    };
    return <OimConverter filingVersion={exampleFilingVersion} onDownload={action('Download')} />;
  })
  .add('Without documents', () => {
    const exampleFilingVersion: any = {filing: { name: 'Example filing.zip' }, documents: []};
    return <OimConverter filingVersion={exampleFilingVersion} onDownload={action('Download')} />;
  })
  .add('Success', () => {
    const exampleFilingVersion: any = {
      filing: { name: 'Example filing.zip' },
      documents: [ {category: 'json-rendering', id: '6d504704-cfed-4400-8772-44da2fc4c145'}, ],
    };
    return <OimConverter filingVersion={exampleFilingVersion} onDownload={action('Download')} />;
  })
  .add('Error', () => <OimConverter message='Something went wrong.' onDownload={action('Download')} />)
;
