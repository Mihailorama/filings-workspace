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

import {
  FetchFilingsAction,
  ReceivedFilingsAction,
  FailedFilingsAction,
  FILINGS_FAILED,
  FILINGS_FETCH,
  FILINGS_RECEIVED,
  FailedUploadAction,
  UPLOAD,
  UPLOAD_FAILED,
} from './actions';
import { State } from '../state';

export function reducer(state: State | undefined, action: Action): State | undefined {
  if (!state) {
    return undefined;
  }
  switch (action.type) {
    case FILINGS_FETCH: {
      const { app } = action as FetchFilingsAction;
      return { ...state, recentFilings: {loading: true}, app };
    }
    case FILINGS_RECEIVED: {
      const { filings } = action as ReceivedFilingsAction;
      return { ...state, recentFilings: {loading: false, value: filings} };
    }
    case FILINGS_FAILED: {
      const { error } = action as FailedFilingsAction;
      return { ...state, recentFilings: {loading: false, error} };
    }
    case UPLOAD: {
      return { ...state, upload: {uploading: true} };
    }
    case UPLOAD_FAILED: {
      const { error } = action as FailedUploadAction;
      return { ...state, upload: {uploading: false, error} };
    }
    default:
      return undefined;
  }
}
