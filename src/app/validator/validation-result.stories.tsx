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
  .addDecorator(story => <div className='app-Results'>
    <div className='app-Results-resultHeading'>
      {story()}
    </div>
  </div>)
  .add('Loading', () => <ValidationResult status={{loading: true}}/>)
  .add('Error', () => <ValidationResult status={{loading: false, error: 'Something went boom'}}/>)
  .add('Valid with warnings', () => <ValidationResult name='Example filing.zip' status={{loading: false, value: 'WARNING'}}/>)
  .add('Valid', () => <ValidationResult name='Example filing.zip' status={{loading: false, value: 'OK'}}/>)
  .add('Failed (Error)', () => <ValidationResult name='Example filing.zip' status={{loading: false, value: 'ERROR'}}/>)
  .add('Failed (Fatal error)', () => <ValidationResult name='Example filing.zip' status={{loading: false, value: 'FATAL_ERROR'}}/>);
