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

import { Action } from 'redux';

import { FETCH, FAILED, RECEIVED, FetchAction, FailedAction, ReceivedAction } from './actions';
import { State } from '../state';

export function reducer(state: State | undefined, action: Action): State | undefined {
  if (!state) {
    return undefined;
  }
  switch (action.type) {
    case FETCH: {
      const { filingVersionId } = action as FetchAction;
      return { ...state, status: { ... state.status, [filingVersionId]: {loading: true} }};
    }
    case RECEIVED: {
      const { filingVersionId, status } = action as ReceivedAction;
      return { ...state, status: { ... state.status, [filingVersionId]: {loading: false, value: status} }};
    }
    case FAILED: {
      const { filingVersionId, error } = action as FailedAction;
      return { ...state, status: { ... state.status, [filingVersionId]: {loading: false, error} }};
    }
    default:
      return undefined;
  }
}
