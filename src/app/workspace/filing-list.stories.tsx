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

import { FilingMatch } from '../fullbeam-search/models';
import FilingList, { FilingListPageProps } from './filing-list';
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

const filingMatches: FilingMatch[] = [
  {filing: {id: 1}, filingName: 'Wibble wobble'} as any,
  {filing: {id: 2}, filingName: 'Carrot'},
  {filing: {id: 3}, filingName: 'Alphabet'},
  {filing: {id: 4}, filingName: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
  'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
  'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ' +
  'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia ' +
  'deserunt mollit anim id est laborum.'},
];

const app: WorkspaceAppSpec = {name: 'Test App', action: 'SEARCH', href: '/test-app', filingHref: '/test-app/{id}'};

const etc: FilingListPageProps = {
  app,
  mode: 'user',
  searchPerformed: false,
  userFilings: {loading: true},
  searchResultFilings: {loading: false},
  searchText: '' ,
  showUpload: action('Upload'),
  onSearch: action('Search'),
  onSearchTextChange: action('Search Text Changed'),
  onSearchSelection: action('Search Selected'),
  changeMode: action('Mode Change'),
};

storiesOf('FilingList', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>
    {story()}
  </MemoryRouter>)
  .add('Loading', () => {
    return (
      <FilingList {...etc} />
    );
  })
  .add('No filings', () => {
    return (
      <FilingList {...etc} userFilings={{loading: false, value: []}} />
    );
  })
  .add('With filings', () => {
    return (
      <FilingList {...etc} userFilings={{loading: false, value: filings}} />
    );
  })
  .add('Many filings', () => {
    const manyFilings: WorkspaceFiling[] = new Array(100).fill({}).map((_, index) => ({
      id: `${index + 1}`,
      name: `Filing ${index + 1}`,
      date: new Date('2017-01-01'),
    }));
    return (
      <FilingList {...etc} userFilings={{loading: false, value: manyFilings}} />
    );
  })
  .add('Error', () => {
    return (
      <FilingList {...etc} userFilings={{loading: false, error: 'Something went wrong.'}} />
    );
  })
  .add('Initial search', () => {
    return (
      <FilingList {...etc} mode='search' />
    );
  })
  .add('With search text', () => {
    return (
      <FilingList {...etc} mode='search' searchText='Wibble' />
    );
  })
  .add('Searching', () => {
    return (
      <FilingList {...etc} mode='search' searchText='Wibble' searchResultFilings={{loading: true}} />
    );
  })
  .add('With search results', () => {
    return (
      <FilingList {...etc} mode='search' searchPerformed={true} searchText='Wibble'
        searchResultFilings={{loading: false, value: filingMatches}} />
    );
  })
  .add('No search results', () => {
    return (
      <FilingList {...etc} mode='search' searchPerformed={true} searchText='Wibble'
        searchResultFilings={{loading: false, value: []}} />
    );
  })
  .add('Search error', () => {
    return (
      <FilingList {...etc} mode='search' searchPerformed={true} searchText='Wibble'
        searchResultFilings={{loading: false, error: 'Something went wrong.'}} />
    );
  })
  ;
