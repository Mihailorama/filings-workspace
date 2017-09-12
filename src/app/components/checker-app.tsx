import * as React from 'react';
import { Component, Props } from 'react';

import { Profile, ValidationParams, ValidationStatus } from '../models';
import { CheckingPhase } from '../state';
import ValidationForm from './validation-form';
import ValidationResult from './validation-result';

export interface CheckerAppProps extends Props<CheckerApp> {
  phase?: CheckingPhase;
  profiles?: Profile[];
  status?: ValidationStatus;
  onSubmit?: (params: ValidationParams) => void;
}

export default class CheckerApp extends Component<CheckerAppProps> {
  render(): JSX.Element {
    const { phase, profiles, status, onSubmit } = this.props;

    if (phase === 'form') {
      return <ValidationForm profiles={profiles} onSubmit={onSubmit}/>;
    }

    return <div className='ckr-ValidationApp-result'>
      <ValidationResult status={status}/>
    </div>;
  }
}
