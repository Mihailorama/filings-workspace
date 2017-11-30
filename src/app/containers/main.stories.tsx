/*
import Main from './main';
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
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Main, { appBaseUri } from './main';
import { State } from '../state';
import { profiles } from '../../stories/util';
import QueryableTablePageImpl from '../viewer/models/queryable-table-page-impl';
import { tablePageKey } from '../viewer/reducers';

const { tables, zOptions, tableChunk } = (require('../../stories/table-a.json'));
const table = new QueryableTablePageImpl(tables[0], tableChunk);
const page = {table: tables[0], x: 0, y: 0, z: 0};

const etc: State = {
  appBar: {
    user: {loading: false, value: {email: 'a@b.com', name: 'A Butler', sub: '1234'} },
  },
  workspace: {
    profiles: {loading: false, value: profiles('Profile')},
    recentFilings: {loading: false, value: [
      {id: '1', name: 'Filing 1', date: new Date('2017-01-01')},
      {id: '2', name: 'Filing 2', date: new Date('2017-01-02')},
    ]},
    search : { text: '' },
  },
  statistics: {
    statistics: {1: {loading: false, value: [
      {format: 'integer', name: 'facts', value: 123, label: 'Fact count'},
      {format: 'integer', name: 'tables', value: 12, label: 'Table count'},
      {format: 'integer', name: 'wallies', value: 1, label: 'Wally count'},
      {format: 'percentage', name: 'tagged', value: 12.3, label: 'Percentage tagged'},
    ]}},
  },
  validator: {
    status: {1: {loading: false, value: 'WARNING'}},
  },
  viewer: {
    tables: {1: {loading: false, value: tables}},
    selectedTablePage: {1: page},
    zOptions: {'01901ff9-d32f-4148-bbff-3c868bc60bd7': zOptions},
    tableRendering: {},
  },
  router: undefined!,
  benfords: undefined!,
  oimConverter: undefined!,
};

etc.viewer.tableRendering[tablePageKey(page)] = {loading: false, value: table};

const funcs: Store<State> = {
  getState: () => etc,
  dispatch: action('dispatch') as any,
  subscribe: action('subscribe') as any,
  replaceReducer: action('replaceReducer') as any,
};

storiesOf('Main', module)
  .add('Workspace', () => {
    return (
      <MemoryRouter initialEntries={[appBaseUri]}>
        <Provider store={funcs}>
          <Main />
        </Provider>
      </MemoryRouter>
    );
  })
  .add('Filing list', () => {
    return (
      <MemoryRouter initialEntries={[`${appBaseUri}validator`]}>
        <Provider store={funcs}>
          <Main />
        </Provider>
      </MemoryRouter>
    );
  })
  .add('Upload', () => {
    return (
      <MemoryRouter initialEntries={[`${appBaseUri}validator`]}>
        <Provider store={{...funcs, getState: () => ({...etc, upload: {uploading: false}})}}>
          <Main />
        </Provider>
      </MemoryRouter>
    );
  })
  .add('Processing', () => {
    return (
      <MemoryRouter initialEntries={[`${appBaseUri}validator`]}>
        <Provider store={{...funcs, getState: () => ({...etc, upload: {uploading: true}})}}>
          <Main />
        </Provider>
      </MemoryRouter>
    );
  })
  .add('Validator', () => {
    return (
      <MemoryRouter initialEntries={[`${appBaseUri}validator/filing-versions/1`]}>
        <Provider store={{...funcs, getState: () => ({...etc})}}>
          <Main />
        </Provider>
      </MemoryRouter>
    );
  })
  .add('Viewer', () => {
    return (
      <MemoryRouter initialEntries={[`${appBaseUri}viewer/filing-versions/1`]}>
        <Provider store={{...funcs, getState: () => ({...etc})}}>
          <Main />
        </Provider>
      </MemoryRouter>
    );
  })
  .add('Statistics', () => {
    return (
      <MemoryRouter initialEntries={[`${appBaseUri}statistics/filing-versions/1`]}>
        <Provider store={{...funcs, getState: () => ({...etc})}}>
          <Main />
        </Provider>
      </MemoryRouter>
    );
  });
