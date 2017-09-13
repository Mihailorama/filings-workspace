import * as classNames from 'classnames';
import * as React from 'react';
import { Component, Props } from 'react';

import { Profile, ValidationParams, ValidationStatus } from '../models';
import { CheckingPhase } from '../state';
import ContactDetails from './contact-details';
import ValidationForm from './validation-form';
import ValidationResult from './validation-result';

import './checker-app.less';

export interface CheckerAppProps extends Props<CheckerApp> {
  phase?: CheckingPhase;
  profiles?: Profile[];
  status?: ValidationStatus;
  onSubmit?: (params: ValidationParams) => void;
}

export default class CheckerApp extends Component<CheckerAppProps> {
  render(): JSX.Element {
    const { phase, profiles, status, onSubmit } = this.props;

    return <div className={classNames('ckr-CheckerApp', `ckr-CheckerApp-${phase}`)}>
      {phase === 'form'
        ? <ValidationForm profiles={profiles} onSubmit={onSubmit}/>
        : <ValidationResult status={status}/>
      }
      <ContactDetails/>
    </div>;
  }
}
