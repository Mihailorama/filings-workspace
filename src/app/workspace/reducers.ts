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
  ReceivedProfilesAction,
  FailedProfilesAction,
  PROFILES_FETCH,
  PROFILES_RECEIVED,
  PROFILES_FAILED,
  ReceivedFilingsAction,
  FailedFilingsAction,
  FILINGS_FAILED,
  FILINGS_FETCH,
  FILINGS_RECEIVED,
  FailedUploadAction,
  SHOW_UPLOAD,
  UPLOAD,
  UPLOAD_FAILED,
  ShowUploadAction,
} from './actions';
import { State } from '../state';

export function reducer(state: State | undefined, action: Action): State | undefined {
  if (!state) {
    return undefined;
  }
  switch (action.type) {
    case PROFILES_FETCH: {
      return { ...state, profiles: {loading: true} };
    }
    case PROFILES_RECEIVED: {
      const { profiles } = action as ReceivedProfilesAction;
      return { ...state, profiles: {loading: false, value: profiles} };
    }
    case PROFILES_FAILED: {
      const { error } = action as FailedProfilesAction;
      return { ...state, profiles: {loading: false, error} };
    }
    case FILINGS_FETCH: {
      return { ...state, recentFilings: {loading: true} };
    }
    case FILINGS_RECEIVED: {
      const { filings } = action as ReceivedFilingsAction;
      return { ...state, recentFilings: {loading: false, value: filings} };
    }
    case FILINGS_FAILED: {
      const { error } = action as FailedFilingsAction;
      return { ...state, recentFilings: {loading: false, error} };
    }
    case SHOW_UPLOAD: {
      const { show } = action as ShowUploadAction;
      const upload = show ? {uploading: false} : undefined;
      return { ...state, upload };
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