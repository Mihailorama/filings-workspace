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

/**
 * Reducers (in the Redux sense).
 */
import { Action } from 'redux';

import { STARTUP_INFO_RECEIVED, StartupInfoReceivedAction, STARTUP_INFO_FAILED, FailedAction,
  UPLOAD_STARTED, UPLOAD_FAILED,
  CHECKING_STARTED, CHECKING_FAILED,
  CHECKING_RECEIVED, CheckingReceivedAction } from './actions';
import { CheckerState } from './state';

export function checker(state: CheckerState | undefined, action: Action): CheckerState {
  if (!state) {
    return {phase: 'form'};
  }

  switch (action.type) {
    case STARTUP_INFO_FAILED:
      {
        const { message } = action as FailedAction;
        return { ...state, phase: 'startup-failed', message };
      }
    case STARTUP_INFO_RECEIVED:
      {
        const { user, apps, profiles } = action as StartupInfoReceivedAction;
        return { ...state, user, apps, profiles };
      }
    case UPLOAD_STARTED:
      return { ...state, phase: 'uploading', status: undefined };
    case UPLOAD_FAILED:
      {
        const { message } = action as FailedAction;
        return { ...state, phase: 'uploading-failed', status: undefined, message };
      }
    case CHECKING_STARTED:
      return { ...state, phase: 'checking', status: undefined };
    case CHECKING_FAILED:
      {
        const { message } = action as FailedAction;
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
