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

import AppBar from './app-bar';
import { WORKSPACE_APPS } from '../workspace/workspace-apps';
import { MemoryRouter } from 'react-router';

const sub = 'uuid-of-user';

storiesOf('AppBar', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>
    <div style={{height: '400px', backgroundColor: '#DDD'}}>
      {story()}
    </div>
  </MemoryRouter>)
  .add('User with email only', () => <AppBar app={WORKSPACE_APPS.validator}
    apps={{validator: WORKSPACE_APPS.validator}}
    user={{sub, email: 'b@example.com'}}/>)
  .add('User with name', () => <AppBar app={WORKSPACE_APPS.validator}
    apps={{validator: WORKSPACE_APPS.validator}}
    user={{sub, name: 'Tamandani Pleško', email: 'tp@example.com'}}/>)
  .add('Only filing apps', () => <AppBar app={WORKSPACE_APPS.validator}
    apps={{
      validator: WORKSPACE_APPS.validator,
      viewer: WORKSPACE_APPS.viewer,
      statistics: WORKSPACE_APPS.statistics,
      benford: WORKSPACE_APPS['benfords-analyser-report'],
      oimConverter: WORKSPACE_APPS['oim-converter'],
    }}
    user={{sub, email: 'tp@example.com'}}/>)
  .add('Only non-filing apps', () => <AppBar app={WORKSPACE_APPS.changeReport}
    apps={{
      changeReport: WORKSPACE_APPS.changeReport,
      taxonomyInfo: WORKSPACE_APPS.taxonomyInfo,
      taxonomyPackager: WORKSPACE_APPS.taxonomyPackager,
    }}
    user={{sub, email: 'tp@example.com'}}/>)
  .add('All apps', () => <AppBar app={WORKSPACE_APPS.validator}
    apps={WORKSPACE_APPS}
  user={{sub, email: 'tp@example.com'}}/>);
