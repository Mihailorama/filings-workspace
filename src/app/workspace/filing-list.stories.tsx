/*
 *  Copyright 2017 CoreFiling S.A.R.L.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import FilingList from './filing-list';
import { MemoryRouter } from 'react-router';
import { WorkspaceAppSpec, WorkspaceFiling } from './reducers';

const filings: WorkspaceFiling[] = [
  {id: '1', name: 'Filing 1', date: new Date('2017-01-01')},
  {id: '2', name: 'Filing 2', date: new Date('2017-01-02')},
  {id: '3', name: 'Filing 3', date: new Date('2017-01-03')},
];

const app: WorkspaceAppSpec = {name: 'Test App', action: 'CHECK', href: '/test-app', filingHref: '/test-app/{id}'};

storiesOf('FilingList', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>
    {story()}
  </MemoryRouter>)
  .add('Not loaded', () => {
    return (
      <FilingList app={app} showUpload={action('Upload')} />
    );
  })
  .add('No filings', () => {
    return (
      <FilingList filings={[]} app={app} showUpload={action('Upload')} />
    );
  })
  .add('With filings', () => {
    return (
      <FilingList filings={filings} app={app} showUpload={action('Upload')} />
    );
  });
