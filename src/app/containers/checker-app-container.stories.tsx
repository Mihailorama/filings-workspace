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

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { App, Profile } from '../models';
import { CheckerState } from '../state';
import CheckerAppContainer from './checker-app-container';

// Some hackery for creating fake profiles.

function id(label: string): string {
  let hash = 0;
  for (let i = 0; i < label.length; i++) {
    const chr = label.charCodeAt(i);
    hash  = (((hash << 5) - hash) + chr) & 0x7FFFFFFF; // tslint:disable-line:no-bitwise
  }
  return `id_${hash.toString(16)}`;
}

function profile(label: string): Profile {
  return {
    id: id(label),
    name: label,
  };
}

function profiles(...labels: string[]): Profile[] {
  return labels.map(x => profile(x));
}

const app = (name: string): App => {
  const id = name.toLowerCase().replace(/[^a-z]+/g, '-');
  return {
    id,
    name,
    href: `/${id}/`,
  };
};

const apps = (...names: string[]): App[] => names.map(name => app(name));

const sub = 'uuid-of-user';

const etc: CheckerState = {
  user: {sub, email: 'b@example.com'},
  apps: apps('Pass/Fail Validator'),
  profiles: profiles('Profile'),
  phase: 'startup',
};
const funcs: Store<CheckerState> = {
  getState: () => etc,
  dispatch: action('dispatch') as any,
  subscribe: action('subscribe') as any,
  replaceReducer: action('replaceReducer') as any,
};

storiesOf('App layout', module)
.add('Form', () => <Provider store={{
    ...funcs,
    getState: () => ({...etc,  phase: 'form'}),
  }}>
    <CheckerAppContainer/>
  </Provider>)
.add('Checking', () => <Provider store={{
    ...funcs,
    getState: () => ({...etc, phase: 'checking'}),
  }}>
    <CheckerAppContainer/>
  </Provider>)
.add('Result', () => <Provider store={{
    ...funcs,
    getState: () => ({...etc, profiles: profiles('Profile'), phase: 'results', status: 'OK'}),
  }}>
    <CheckerAppContainer/>
  </Provider>)
;
