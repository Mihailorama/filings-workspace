import * as React from 'react';

import { storiesOf } from '@storybook/react';

import OimConverter from './oim-converter';

storiesOf('OIM Converter', module)
  .add('Loading', () => {
    return <OimConverter />;
  })
  .add('Without download', () => {
    const exampleFilingVersion: any = {documents: [ {category: 'something-else', id: '6d504704-cfed-4400-8772-44da2fc4c145'}]};
    return <OimConverter filingVersion={exampleFilingVersion} />;
  })
  .add('Without documents', () => {
    const exampleFilingVersion: any = {documents: []};
    return <OimConverter filingVersion={exampleFilingVersion} />;
  })
  .add('Error', () => <OimConverter message='Something went wrong.' />)
;
