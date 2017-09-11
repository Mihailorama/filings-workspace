import * as classNames from 'classnames';
import * as React from 'react';
import { Component, Props } from 'react';

import { ValidationStatus } from '../state';

import './validation-result.less';

const textByStatus = {
  loading: 'Your documnent is being validated.',
  valid: 'Your document has been passed as valid XBRL.',
  invalid: 'Your document is not valid XBRL. Contact us to find out more!',
  failed: 'Your document could not be validated.',
};

export interface ValidationResultProps extends Props<ValidationResult> {
  status: ValidationStatus;
}

export default class ValidationResult extends Component<ValidationResultProps> {
  render(): JSX.Element {
    const { status } = this.props;

    return <div className={classNames('ckr-ValidationResult', `ckr-ValidationResult-${status}`)}>
      {status !== 'loading' &&
        <b className={classNames('ckr-ValidationResult-status', `ckr-ValidationResult-${status}Status`)}>{status}</b>}
      <p className={classNames('ckr-ValidationResult-detail', `ckr-ValidationResult-${status}Detail`)}>{textByStatus[status]}</p>
    </div>;
  }
}
