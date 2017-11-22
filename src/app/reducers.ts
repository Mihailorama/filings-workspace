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

import {
  STARTUP_INFO_RECEIVED, StartupInfoReceivedAction, STARTUP_INFO_FAILED, FailedAction,
  UPLOAD_STARTED, UPLOAD_FAILED,
} from './actions';
import { State } from './state';
import { reducer as statisticsReducer } from './statistics/reducers';
import { reducer as validatorReducer } from './validator/reducers';
import { reducer as viewerReducer } from './viewer/reducers';

export function globalReducer(state: State | undefined, action: Action): State {
  if (!state) {
    return {
      apps: {loading: false, value: []},
      user: {loading: false},
      profiles: {loading: false, value: []},
      recentFiles: {loading: false, value: []},
      upload: {uploading: false},
      status: {},
      selectedTablePage: {},
      statistics: {},
      tableRendering: {},
      tables: {},
      zOptions: {},
    };
  }

  let newState;
  newState = statisticsReducer(state, action);
  if (newState) {
    return newState;
  }
  newState = validatorReducer(state, action);
  if (newState) {
    return newState;
  }
  newState = viewerReducer(state, action);
  if (newState) {
    return newState;
  }

  switch (action.type) {
    case STARTUP_INFO_FAILED: {
      const { message } = action as FailedAction;
      return { ...state,
        apps: {loading: false, error: message},
        user: {loading: false, error: message},
        profiles: {loading: false, error: message},
      };
    }
    case STARTUP_INFO_RECEIVED: {
      const { apps, user, profiles } = action as StartupInfoReceivedAction;
      return { ...state,
        apps: {loading: false, value: apps},
        user: {loading: false, value: user},
        profiles: {loading: false, value: profiles},
      };
    }
    case UPLOAD_STARTED: {
      return { ...state, upload: {uploading: true}};
    }
    case UPLOAD_FAILED: {
      const { message } = action as FailedAction;
      return { ...state, upload: {uploading: false, error: message}};
    }
    default:
      return state;
  }
}
export default globalReducer;
