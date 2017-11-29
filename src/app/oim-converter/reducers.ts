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

import { FilingVersion } from '@cfl/document-service';
import {
  GET_FILING_VERSION_FAILED, FailedAction,
  RECEIVED_FILING_VERSION, FilingVersionReceivedAction,
} from './actions';

export interface OimState {
  filingVersion?: FilingVersion;
  message?: string;
}

export function reducer(state: OimState | undefined, action: Action): OimState {
  if (!state) {
    return {};
  }
  switch (action.type)  {
    case GET_FILING_VERSION_FAILED: {
      const { message } = action as FailedAction;
      return { ...state, message };
    }
    case RECEIVED_FILING_VERSION: {
      const { filingVersion } = action as FilingVersionReceivedAction;
      return { ...state, message: undefined, filingVersion };
    }
    default:
      break;
  }

  return state;
}
