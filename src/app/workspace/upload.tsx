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

import { Item, UploadStatus } from '../state';
import { ValidationParams, Profile } from '../models';
import ContactDetails from '../components/contact-details';
import ValidationForm from './validation-form';

import './upload.less';

export interface UploadProps {
  profiles: Item<Profile[]>;
  upload: UploadStatus;
  onSubmit?: (params: ValidationParams) => void;
}

export default function Upload(props: UploadProps): JSX.Element {
  const { profiles, upload, onSubmit } = props;
  const loading = profiles.loading;
  return (
    <div className={classNames('app-Upload', {'app-Upload-loading': loading})}>
      <div className='app-Upload-formHolder'>
        <ValidationForm profiles={profiles.value} error={upload.error} onSubmit={onSubmit}/>
        <ContactDetails />
      </div>
    </div>
  );
}
