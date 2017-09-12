/**
 * Reducers (in the Redux sense).
 */
import { Action } from 'redux';

import { VALIDATION_PROFILES_RECEIVED, ValidationProfilesReceivedAction,
  CHECKING_REQUESTED, CHECKING_RECEIVED, CheckingReceivedAction } from './actions';
import { CheckerState } from './state';

export function checker(state: CheckerState | undefined, action: Action): CheckerState {
  if (!state) {
    return {phase: 'form'};
  }

  switch (action.type) {
    case VALIDATION_PROFILES_RECEIVED:
      {
        const { profiles } = action as ValidationProfilesReceivedAction;
        return {...state, profiles};
      }
    case CHECKING_REQUESTED:
      return {...state, phase: 'checking', status: undefined};
    case CHECKING_RECEIVED:
      {
        const { status } = action as CheckingReceivedAction;
        return {...state, status};
      }
    default:
      break;
  }

  return state;
}
