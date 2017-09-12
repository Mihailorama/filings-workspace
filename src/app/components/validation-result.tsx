import * as classNames from 'classnames';
import * as React from 'react';
import { Component, Props } from 'react';

import { ValidationStatus } from '../models';

import './validation-result.less';

const textByStatus = {
  loading: 'Your document is being validated.',
  OK: 'Your document has been passed as valid XBRL.',
  WARNING: 'Your document has warnings.',
  ERROR: 'Your document is not valid XBRL. Contact us to find out more!',
  FATAL_ERROR: 'Your document could not be validated.',
};

export interface ValidationResultProps extends Props<ValidationResult> {
  status?: ValidationStatus;
}

export default class ValidationResult extends Component<ValidationResultProps> {
  render(): JSX.Element {
    const { status = 'loading' } = this.props;
    const lowerStatus = status.toLowerCase().split('_').map((x, i) => i === 0 ? x : x.charAt(0).toUpperCase() + x.substr(1)).join('');

    return <div className={classNames('ckr-ValidationResult', `ckr-ValidationResult-${lowerStatus}`)}>
      {status !== 'loading' &&
        <b className={classNames('ckr-ValidationResult-status', `ckr-ValidationResult-${lowerStatus}Status`)}>{status}</b>}
      <p className={classNames('ckr-ValidationResult-detail', `ckr-ValidationResult-${lowerStatus}Detail`)}>{textByStatus[status]}</p>
    </div>;
  }
}
