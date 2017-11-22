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

import { ValidationStatus } from '../models';

import './validation-result.less';

interface Spec {
  label?: string;
  detail?: string;
}

const specByStatus: {[status: string]: Spec} = {
  loading: {
    detail: 'Processing\u2009…',
  },
  OK: {
    label: 'Pass',
  },
  WARNING: {
    label: 'Valid',
    detail: 'With Warnings',
  },
  ERROR: {
    label: 'Fail',
  },
  FATAL_ERROR: {
    label: 'Fail',
  },
};

function toLowerStatus(status: string): string {
  return status.toLowerCase().split('_').map((x, i) => i === 0 ? x : x.charAt(0).toUpperCase() + x.substr(1)).join('');
}

export interface ValidationResultProps extends Props<ValidationResult> {
  status?: ValidationStatus;
  error?: string;
}

export default class ValidationResult extends Component<ValidationResultProps> {
  render(): JSX.Element {
    const { status = 'loading', error } = this.props;
    const lowerStatus = toLowerStatus(status);
    const { label, detail } = specByStatus[status];

    return <div className={classNames('app-ValidationResult', `app-ValidationResult-${lowerStatus}`)}>
      {label && <b className={classNames('app-ValidationResult-status', `app-ValidationResult-${lowerStatus}Status`)}>{label}</b>}
      {detail && <p className={classNames('app-ValidationResult-detail', `app-ValidationResult-${lowerStatus}Detail`)}>{detail}</p>}
      {error && <p className={classNames('app-ValidationResult-errorDetail')}>{error}</p>}
    </div>;
  }
}
