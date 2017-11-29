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
  FailedAction,
  SEARCH,
  SEARCH_RESULTS_RECEIVED, SearchResultsReceivedAction,
  SEARCH_TEXT_CHANGED, SearchTextChangedAction,
  ANALYSE_RESULTS_RECEIVED, AnalyseResultsReceivedAction,
  FAILED,
} from './actions';
import { State } from '../state';

export function reducer(state: State, action: Action): State | undefined {
  const {benford} = state;
  switch (action.type)  {
    case SEARCH_TEXT_CHANGED: {
      const { searchText } = action as SearchTextChangedAction;
      return { ...state, benford: {... benford, searchText} };
    }
    case SEARCH: {
      return { ...state, benford: {... benford, filingName: undefined, analysisResults: undefined, phase: 'searching'}};
    }
    case SEARCH_RESULTS_RECEIVED: {
      const { filingName } = action as SearchResultsReceivedAction;
      return { ...state, benford: {... benford, filingName, phase: 'analysing'} };
    }
    case FAILED: {
      const { message } = action as FailedAction;
      return { ...state, benford: {... benford, phase: 'failed', message }};
    }
    case ANALYSE_RESULTS_RECEIVED: {
      const { results } = action as AnalyseResultsReceivedAction;
      return { ...state, benford: {... benford, phase: 'ready', analysisResults: results }};
    }
    default:
      break;
  }

  return undefined;
}
