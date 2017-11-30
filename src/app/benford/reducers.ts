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
  FailedAction,
  SEARCH,
  SEARCH_RESULTS_RECEIVED, SearchResultsReceivedAction,
  SEARCH_TEXT_CHANGED, SearchTextChangedAction,
  ANALYSE_RESULTS_RECEIVED, AnalyseResultsReceivedAction,
  FAILED,
  ANALYSE,
  AnalyseAction,
  NAME_VERSION_LINK,
  NameVersionLinkAction,
} from './actions';

import { AnalysisResponse } from '@cfl/digit-frequency-analysis-service';
import { BenfordPhase } from './models';

export interface BenfordsState {
  phase: BenfordPhase;
  searchText: string;
  message?: string;
  // The filing version ID for the filing name, once the relationship is known from analyse or link to platform.
  filingVersionId?: string;
  // The filing name,
  filingName?: string;
  analysisResults?: AnalysisResponse;
}

export function reducer(state: BenfordsState | undefined, action: Action): BenfordsState {
  if (!state) {
    return {
      phase: 'ready',
      searchText: '',
      filingName: undefined,
      filingVersionId: undefined,
    };
  }
  switch (action.type)  {
    case SEARCH_TEXT_CHANGED: {
      const { searchText } = action as SearchTextChangedAction;
      return { ...state, searchText };
    }
    case SEARCH: {
      return { ...state, filingName: undefined, analysisResults: undefined, phase: 'searching'};
    }
    case SEARCH_RESULTS_RECEIVED: {
      const { filingName } = action as SearchResultsReceivedAction;
      return { ...state, filingName, phase: filingName ? 'analysing' : 'ready'};
    }
    case FAILED: {
      const { message } = action as FailedAction;
      return { ...state, phase: 'failed', message };
    }
    case NAME_VERSION_LINK: {
      const {filingName, filingVersionId} = action as NameVersionLinkAction;
      return {... state, filingName, filingVersionId};
    }
    case ANALYSE: {
      // We want to clear the filing name, if it wasn't added by a preceding search for the filing
      // version ID we're analysing.  In that case it's better to continue to display it.
      const {filingVersionId} = action as AnalyseAction;
      const filingName = filingVersionId === state.filingVersionId ? state.filingName : undefined;
      return { ...state, filingName, filingVersionId, analysisResults: undefined, phase: 'analysing'};
    }
    case ANALYSE_RESULTS_RECEIVED: {
      const { results } = action as AnalyseResultsReceivedAction;
      return { ...state, phase: 'ready', analysisResults: results };
    }
    default:
      break;
  }

  return state;
}
