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
import { Component, Props } from 'react';
import { ValidationStatus } from '@cfl/validation-service';

import ContactDetails from '../components/contact-details';
import FilingReference from '../components/filing-reference';

import './validation-result.less';
import { Item } from '../state';

interface Spec {
  lowerStatus: string;
  label?: string;
  detail?: string;
  error?: string;
}

const specByStatus: {[status: string]: Spec} = {
  loading: {
    lowerStatus: 'loading',
    detail: 'loading…',
  },
  OK: {
    lowerStatus: 'ok',
    label: 'Pass',
  },
  WARNING: {
    lowerStatus: 'warning',
    label: 'Valid',
    detail: 'With Warnings',
  },
  ERROR: {
    lowerStatus: 'error',
    label: 'Fail',
  },
  FATAL_ERROR: {
    lowerStatus: 'fatalError',
    label: 'Fail',
  },
};

export interface ValidationResultProps extends Props<ValidationResult> {
  name?: string;
  status: Item<ValidationStatus>;
}

export default class ValidationResult extends Component<ValidationResultProps> {
  render(): JSX.Element {
    const { name, status } = this.props;
    const spec = status.error ? {... specByStatus.ERROR, error: status.error} :
      status.value ? specByStatus[status.value] : specByStatus.loading;
    const { lowerStatus, label, detail, error } = spec;

    return <div className='app-ValidationResult-container'>
      <div className={classNames('app-ValidationResult', `app-ValidationResult-${lowerStatus}`)}>
        {label && <div className={classNames('app-ValidationResult-status', `app-ValidationResult-${lowerStatus}Status`)}>{label}</div>}
        {detail && <div className={classNames('app-ValidationResult-detail', `app-ValidationResult-${lowerStatus}Detail`)}>{detail}</div>}
        {error && <div className='app-ValidationResult-error'>{error}</div>}
        {name && <FilingReference
          className={classNames('app-ValidationResult-filing', `app-ValidationResult-filing-${lowerStatus}`)}
          name={name}
        />}
        <ContactDetails className='app-ValidationResult-contact' />
      </div>
    </div>;
  }
}
