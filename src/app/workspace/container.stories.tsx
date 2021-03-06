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
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { storiesOf } from '@storybook/react';

import WorkspaceContainer from './container';
import { profiles } from '../../stories/util';
import { action } from '@storybook/addon-actions';
import { WorkspaceAppSpec } from './reducers';

const app: WorkspaceAppSpec = {name: 'Test App', action: 'CHECK', href: '/test-app', filingHref: '/test-app/{id}'};

const etc = {
  workspace: {
    profiles: {loading: false, value: profiles('Profile')},
    recentFilings: {loading: false, value: [
      {id: '1', name: 'Filing 1', date: new Date('2017-01-01')},
      {id: '2', name: 'Filing 2', date: new Date('2017-01-02')},
    ]},
  },
};

const funcs: Store<any> = {
  getState: () => etc,
  dispatch: action('dispatch') as any,
  subscribe: action('subscribe') as any,
  replaceReducer: action('replaceReducer') as any,
};

storiesOf('WorkspaceContainer', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>
    {story()}
  </MemoryRouter>)
  .add('Workspace', () => {
    return (
      <Provider store={funcs}>
        <WorkspaceContainer />
      </Provider>
    );
  })
  .add('Filing list', () => {
    return (
      <Provider store={funcs}>
        <WorkspaceContainer app={app} />
      </Provider>
    );
  })
  .add('Upload', () => {
    return (
      <Provider store={{...funcs, getState: () => ({...etc, upload: {uploading: false}})}}>
        <WorkspaceContainer app={app} />
      </Provider>
    );
  })
  .add('Processing', () => {
    return (
      <Provider store={{...funcs, getState: () => ({...etc, upload: {uploading: true}})}}>
        <WorkspaceContainer app={app} />
      </Provider>
    );
  });
