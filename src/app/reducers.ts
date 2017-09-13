/**
 * Reducers (in the Redux sense).
 */
import { Action } from 'redux';

import { STARTUP_INFO_RECEIVED, StartupInfoReceivedAction,
  CHECKING_REQUESTED, CHECKING_RECEIVED, CheckingReceivedAction, CHECKING_FAILED } from './actions';
import { CheckerState } from './state';

export function checker(state: CheckerState | undefined, action: Action): CheckerState {
  if (!state) {
    return {phase: 'form'};
  }

  switch (action.type) {
    case STARTUP_INFO_RECEIVED:
      {
        const { user, apps, profiles } = action as StartupInfoReceivedAction;
        return {...state, user, apps, profiles};
      }
    case CHECKING_REQUESTED:
      return {...state, phase: 'checking', status: undefined};
    case CHECKING_RECEIVED:
      {
        const { status } = action as CheckingReceivedAction;
        return {...state, status};
      }
    case CHECKING_FAILED:
      {
        return {...state, status: 'FATAL_ERROR'};
      }
    default:
      break;
  }

  return state;
}
