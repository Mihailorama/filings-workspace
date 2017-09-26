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

import { Profile } from '../models';
import ValidationForm from './validation-form';

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

storiesOf('ValidationForm', module)
.addDecorator(story => <div className='ckr-CheckerApp ckr-CheckerApp-form'>{story()}</div>)
.add('Loading', () => <ValidationForm onSubmit={action('submit')}/>)
.add('Startup failed', () => <ValidationForm error='Startup failed (401).'/>)
.add('Form', () => <ValidationForm onSubmit={action('submit')} profiles={profiles('CRD IV 2.7.3', 'Solvency III')}/>)
.add('Upload error', () => <ValidationForm profiles={[profile('CRD IV 2.7.3')]} error='File error (404).'/>)
;
