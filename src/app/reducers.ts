/**
 * Reducers (in the Redux sense).
 */
import { Action } from 'redux';

import { STARTUP_INFO_RECEIVED, StartupInfoReceivedAction,
  UPLOAD_STARTED, UPLOAD_FAILED, UploadFailedAction,
  CHECKING_STARTED, CHECKING_FAILED, CheckingFailedAction,
  CHECKING_RECEIVED, CheckingReceivedAction } from './actions';
import { CheckerState } from './state';

export function checker(state: CheckerState | undefined, action: Action): CheckerState {
  if (!state) {
    return {phase: 'form'};
  }

  switch (action.type) {
    case STARTUP_INFO_RECEIVED:
      {
        const { user, apps, profiles } = action as StartupInfoReceivedAction;
        return { ...state, user, apps, profiles };
      }
    case UPLOAD_STARTED:
      return { ...state, phase: 'uploading', status: undefined };
    case UPLOAD_FAILED:
      {
        const { message } = action as UploadFailedAction;
        return { ...state, phase: 'uploading-failed', status: undefined, message };
      }
    case CHECKING_STARTED:
      return { ...state, phase: 'checking', status: undefined };
    case CHECKING_FAILED:
      {
        const { message } = action as CheckingFailedAction;
        return { ...state, phase: 'checking-failed', status: 'FATAL_ERROR', message };
      }
    case CHECKING_RECEIVED:
      {
        const { status } = action as CheckingReceivedAction;
        return { ...state, phase: 'results', status };
      }
    default:
      break;
  }

  return state;
}
