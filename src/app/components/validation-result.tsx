import * as classNames from 'classnames';
import * as React from 'react';
import { Component, Props } from 'react';

import { ValidationStatus } from '../models';

import './validation-result.less';

const textByStatus = {
  loading: 'Your document is being validated.',
  OK: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
  WARNING: 'Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.',
  ERROR: 'Donec eu libero sit amet quam egestas semper.',
  FATAL_ERROR: ' Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.',
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
