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

import ValidationResult from './validation-result';

storiesOf('ValidationResult', module)
  .addDecorator(story => <div className='ckr-CheckerApp ckr-CheckerApp-checking'>
    <h1>Backgorund</h1>
    <div className='ckr-CheckerApp-resultOverlay'>
      {story()}
    </div>
  </div>)
  .add('Loading', () => <ValidationResult/>)
  .add('Invalid', () => <ValidationResult status='ERROR'/>)
  .add('Valid with warnings', () => <ValidationResult status='WARNING'/>)
  .add('Valid', () => <ValidationResult status='OK'/>)
  .add('Failed', () => <ValidationResult status='FATAL_ERROR'/>);
