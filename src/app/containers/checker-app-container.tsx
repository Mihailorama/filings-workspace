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

import * as React from 'react';
import { Component, Props } from 'react';
import { connect, MapDispatchToProps } from 'react-redux';

import { checkingStartAction } from '../actions';
import { Profile, ValidationStatus } from '../models';
import { CheckingPhase, CheckerState } from '../state';
import CheckerApp from '../components/checker-app';

type OwnProps = Props<CheckerAppContainer>;

interface PropsFromState {
  phase?: CheckingPhase;
  profiles?: Profile[];
  status?: ValidationStatus;
  message?: string;
}

interface PropsFromDispatch {
  onCheckingStart?: typeof checkingStartAction;
}

type CheckerAppContainerProps = OwnProps & PropsFromState & PropsFromDispatch;

class CheckerAppContainer extends Component<CheckerAppContainerProps> {
  render(): JSX.Element {
    const { phase, profiles, status, message, onCheckingStart } = this.props;
    return <CheckerApp phase={phase} profiles={profiles} status={status} error={message} onSubmit={onCheckingStart}/>;
  }
}

function propsFromState(state: CheckerState): PropsFromState {
  const { phase, profiles, status, message } = state;
  return { phase, profiles, status, message };
}

const propsFromDispatch: MapDispatchToProps<PropsFromDispatch, {}> = {
  onCheckingStart: checkingStartAction,
};

export default connect(propsFromState, propsFromDispatch)(CheckerAppContainer);
