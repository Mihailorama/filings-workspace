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

import { FETCH, RECEIVED, FAILED, ReceivedAction, FailedAction } from './actions';
import { Item } from '../state';
import { User } from '../models';

export interface AppBarState {
  user: Item<User>;
}

export function reducer(state: AppBarState | undefined, action: Action): AppBarState {
  if (!state) {
    return {user: {loading: false}};
  }
  switch (action.type) {
    case FETCH: {
      return { ...state,
        user: {loading: true},
      };
    }
    case RECEIVED: {
      const { user } = action as ReceivedAction;
      return { ...state,
        user: {loading: false, value: user},
      };
    }
    case FAILED: {
      const { message } = action as FailedAction;
      return { ...state,
        user: {loading: false, error: message},
      };
    }
    default:
      return state;
  }
}
