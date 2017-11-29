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

import { Item } from '../state';
import { FETCH, FAILED, RECEIVED, FetchAction, FailedAction, ReceivedAction } from './actions';
import { Statistic } from '@cfl/filing-statistics-service';

export interface StatisticsState {
  statistics: {[filingVersionId: string]: Item<Statistic[]> | undefined};
}

export function reducer(state: StatisticsState | undefined, action: Action): StatisticsState | undefined {
  if (!state) {
    return {
      statistics: {},
    };
  }
  switch (action.type) {
    case FETCH: {
      const { filingVersionId } = action as FetchAction;
      return { ...state, statistics: { ... state.statistics, [filingVersionId]: {loading: true} }};
    }
    case RECEIVED: {
      const { filingVersionId, statistics } = action as ReceivedAction;
      return { ...state, statistics: { ... state.statistics, [filingVersionId]: {loading: false, value: statistics} }};
    }
    case FAILED: {
      const { filingVersionId, error } = action as FailedAction;
      return { ...state, statistics: { ... state.statistics, [filingVersionId]: {loading: false, error} }};
    }
    default:
      return state;
  }
}
