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
} from './actions';

import { AnalysisResponse } from '@cfl/digit-frequency-analysis-service';
import { BenfordPhase } from './models';

export interface BenfordsState {
  phase: BenfordPhase;
  searchText: string;
  message?: string;
  filingName?: string;
  analysisResults?: AnalysisResponse;
}

export function reducer(state: BenfordsState | undefined, action: Action): BenfordsState {
  if (!state) {
    return {
      phase: 'ready',
      searchText: '',
      filingName: undefined,
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
      return { ...state, filingName, phase: 'analysing'};
    }
    case FAILED: {
      const { message } = action as FailedAction;
      return { ...state, phase: 'failed', message };
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
