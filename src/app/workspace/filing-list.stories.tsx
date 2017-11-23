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
import { Profile } from '../models';
import { WorkspaceAppSpec, WorkspaceFiling, UploadStatus, Item } from '../state';

const filings: WorkspaceFiling[] = [
  {id: '1', name: 'Filing 1'},
  {id: '2', name: 'Filing 2'},
  {id: '3', name: 'Filing 3'},
];

const app: WorkspaceAppSpec = {name: 'Test App', urlTemplate: '/test-app/{id}/', useFilingList: true};

const profiles: Item<Profile[]> = {loading: false, value: [{id: 'profile1', name: 'Profile 1'}]};
const upload: UploadStatus = {uploading: false};

storiesOf('FilingList', module)
  .add('Not loaded', () => {
    return (
      <FilingList profiles={profiles} app={app} upload={upload} onUpload={action('Upload')} />
    );
  })
  .add('No filings', () => {
    return (
      <FilingList filings={[]} profiles={profiles} app={app} upload={upload} onUpload={action('Upload')} />
    );
  })
  .add('With filings', () => {
    return (
      <FilingList filings={filings} profiles={profiles} app={app} upload={upload} onUpload={action('Upload')} />
    );
  });
