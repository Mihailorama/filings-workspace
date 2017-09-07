import * as classNames from 'classnames';
import * as React from 'react';
import { Component, Props } from 'react';

import './validation-result.less';

export interface ValidationResultProps extends Props<ValidationResult> {
  status: 'pass' | 'fail';
}

export default class ValidationResult extends Component<ValidationResultProps> {
  render(): JSX.Element {
    const { status } = this.props;

    return <div className={classNames('cflbv-ValidationResult', `cflbv-ValidationResult-${status}`)}>{status}</div>;
  }
}
