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
