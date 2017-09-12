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
}

interface PropsFromDispatch {
  onCheckingStart?: typeof checkingStartAction;
}

type CheckerAppContainerProps = OwnProps & PropsFromState & PropsFromDispatch;

class CheckerAppContainer extends Component<CheckerAppContainerProps> {
  render(): JSX.Element {
    const { phase, profiles, status, onCheckingStart } = this.props;
    return <CheckerApp phase={phase} profiles={profiles} status={status} onSubmit={onCheckingStart}/>;
  }
}

function propsFromState(state: CheckerState): PropsFromState {
  const { phase, profiles, status } = state;
  return { phase, profiles, status };
}

const propsFromDispatch: MapDispatchToProps<PropsFromDispatch, {}> = {
  onCheckingStart: checkingStartAction,
};

export default connect(propsFromState, propsFromDispatch)(CheckerAppContainer);
