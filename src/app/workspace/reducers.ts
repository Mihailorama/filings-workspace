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
import { Profile } from '@cfl/document-service';

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
  FailedAction,
  SHOW_UPLOAD,
  UPLOAD,
  UPLOAD_FAILED,
  ShowUploadAction,
  SEARCH_TEXT_CHANGED,
  SearchTextChangedAction,
  SEARCH_SELECTION_FAILED,
  MODE_CHANGED,
  ModeChangedAction,
  SEARCH,
  SEARCH_SELECTION,
  SEARCH_RESULTS_RECEIVED,
  SearchResultsReceivedAction,
  SearchAction,
  SEARCH_FAILED,
} from './actions';
import { Item } from '../state';
import { FilingMatch } from '../fullbeam-search/models';

export type FilingListMode = 'user' | 'search';

export interface UploadStatus {
  uploading: boolean;
  error?: string;
}

export interface WorkspaceAppSpec {
  name: string;
  href: string;
  action: 'VIEW' | 'UPLOAD' | 'ANALYSE' | 'CHECK' | 'DOWNLOAD' | 'COMPARE';
  description?: string;
  filingHref?: string;
  external?: boolean;
  icon?: (extraProps: any) => JSX.Element;
}

export interface WorkspaceFiling {
  id: string;
  name: string;
  date: Date;
}

export interface WorkspaceState {
  profiles: Item<Profile[]>;
  // UI state tracking an in-progress upload.
  upload?: UploadStatus;
  // The recent filings.
  recentFilings: Item<WorkspaceFiling[]>;
  search: { searchPerformed: boolean; text: string; filings: Item<FilingMatch[]> };
  mode: FilingListMode;
}

export function reducer(state: WorkspaceState | undefined, action: Action): WorkspaceState {
  if (!state) {
    return {
      profiles: {loading: false, value: []},
      recentFilings: {loading: false, value: []},
      search: { searchPerformed: false, text: '', filings: { loading: false } },
      mode: 'user',
    };
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
      const { error } = action as FailedAction;
      return { ...state, upload: {uploading: false, error} };
    }
    case MODE_CHANGED: {
      const { mode } = action as ModeChangedAction;
      return { ...state, mode, search: { ...state.search, searchPerformed: false } };
    }
    case SEARCH_TEXT_CHANGED: {
      const { searchText } = action as SearchTextChangedAction;
      return { ...state, mode: 'search', search: { ...state.search, text: searchText,
        filings: { ...state.search.filings, loading: false, error: undefined } } };
    }
    case SEARCH: {
      const { search } = action as SearchAction;
      return { ...state, search: { ...state.search, text: search, filings: { ...state.search.filings, loading: true } } };
    }
    case SEARCH_FAILED: {
      const { error } = action as FailedAction;
      return { ...state, search: { ...state.search, filings: { ...state.search.filings, loading: false, error } } };
    }
    case SEARCH_RESULTS_RECEIVED: {
      const { filings } = action as SearchResultsReceivedAction;
      return { ...state, search: { ...state.search, searchPerformed: true, filings: { loading: false, value: filings } } };
    }
    case SEARCH_SELECTION: {
      return { ...state, search: { ...state.search, filings: { ...state.search.filings, loading: true } } };
    }
    case SEARCH_SELECTION_FAILED: {
      const { error } = action as FailedAction;
      return { ...state, search: { ...state.search, filings: { loading: false, error } } };
    }
    default:
      return state;
  }
}
