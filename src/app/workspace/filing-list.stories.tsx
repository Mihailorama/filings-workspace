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
  {id: '3', name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
    'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ' +
    'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia ' +
    'deserunt mollit anim id est laborum.', date: new Date('2017-01-03')},
];

const app: WorkspaceAppSpec = {name: 'Test App', action: 'CHECK', href: '/test-app', filingHref: '/test-app/{id}'};

storiesOf('FilingList', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>
    {story()}
  </MemoryRouter>)
  .add('Loading', () => {
    return (
      <FilingList filings={{loading: true}} app={app} showUpload={action('Upload')} />
    );
  })
  .add('No filings', () => {
    return (
      <FilingList filings={{loading: false, value: []}} app={app} showUpload={action('Upload')} />
    );
  })
  .add('With filings', () => {
    return (
      <FilingList filings={{loading: false, value: filings}} app={app} showUpload={action('Upload')} />
    );
  })
  .add('Many filings', () => {
    const manyFilings: WorkspaceFiling[] = new Array(100).fill({}).map((_, index) => ({
      id: `${index + 1}`,
      name: `Filing ${index + 1}`,
      date: new Date('2017-01-01'),
    }));
    return (
      <FilingList filings={{loading: false, value: manyFilings}} app={app} showUpload={action('Upload')} />
    );
  })
  .add('Error', () => {
    return (
      <FilingList filings={{loading: false, error: 'Something went wrong.'}} app={app} showUpload={action('Upload')} />
    );
  });
