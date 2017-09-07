import * as classNames from 'classnames';
import * as React from 'react';
import { Component, Props } from 'react';

import './validation-result.less';

type ValidationStatus = 'pass' | 'fail';

const textByStatus = {
  pass: 'Your document has been passed as valid XBRL.',
  fail: 'Your document is not valid XBRL. Contact us to find out more!',
};

export interface ValidationResultProps extends Props<ValidationResult> {
  status: ValidationStatus;
}

export default class ValidationResult extends Component<ValidationResultProps> {
  render(): JSX.Element {
    const { status } = this.props;

    return <div className={classNames('cflbv-ValidationResult', `cflbv-ValidationResult-${status}`)}>
      <b className={classNames('cflbv-ValidationResult-status', `cflbv-ValidationResult-${status}Status`)}>{status}</b>
      <p className={classNames('cflbv-ValidationResult-detail', `cflbv-ValidationResult-${status}Detail`)}>{textByStatus[status]}</p>
    </div>;
  }
}
