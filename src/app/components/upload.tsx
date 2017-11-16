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

import * as classNames from 'classnames';
import * as React from 'react';

import { Profile, ValidationParams, ValidationStatus } from '../models';
import { Phase } from '../state';
import ContactDetails from './contact-details';
import ValidationForm from './validation-form';

import './app.less';

export interface AppProps {
  phase?: Phase;
  profiles?: Profile[];
  status?: ValidationStatus;
  error?: string;
  onSubmit?: (params: ValidationParams) => void;
}

export default function App(props: AppProps): JSX.Element {
  const { phase, profiles, error, onSubmit, } = props;
  return (
    <div className={classNames('app-App', `app-App-${phase}`)}>
      <div className='app-App-formHolder'>
        <ValidationForm profiles={profiles} error={error} onSubmit={phase === 'form' ? onSubmit : undefined}/>
        <ContactDetails className='app-App-formContact'/>
      </div>
    </div>
  );
}
