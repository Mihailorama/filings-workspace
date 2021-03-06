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

import { delay, Effect } from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  SEARCH, searchResultsReceived, failedAction, SearchAction,
  analyseResultsReceived,
  AnalyseAction,
  ANALYSE,
  nameVersionLinkAction,
} from './actions';
import { FilingMatch } from '../fullbeam-search/models';
import { analyseFiling } from './urls';
import { latestFiling, linkToPlatform, isFilingVersionReady, filingVersionName } from '../fullbeam-search/urls';
import { push } from 'react-router-redux';

const POLL_MILLIS = 1000;

export function* searchSaga(action: SearchAction): IterableIterator<Effect> {
  try {
    const result: FilingMatch = yield call(latestFiling, action.search);
    yield put(searchResultsReceived(result ? result.filingName : undefined));
    if (result) {
      const filingVersionId = yield call(linkToPlatform, result);
      yield(put(nameVersionLinkAction(filingVersionId, result.filingName)));
      while (!(yield call(isFilingVersionReady, filingVersionId))) {
        yield call(delay, POLL_MILLIS);
      }
      yield put(push(`/filings-workspace/benfords-analyser-report/filing-versions/${filingVersionId}`));
    }
  } catch (res) {
    yield put(failedAction(`Error searching (${res.message || res.statusText || res.status}).`));
  }
}

export function* analyseSaga(action: AnalyseAction): IterableIterator<Effect> {
  const {filingVersionId} = action;
  try {
    const [name, analyseResult] = yield all([
      call(filingVersionName, filingVersionId),
      call(analyseFiling, filingVersionId),
    ]);
    yield all([
      put(nameVersionLinkAction(filingVersionId, name)),
      put(analyseResultsReceived(analyseResult)),
    ]);
  } catch (res) {
    const message = res.status && res.status === 404 ?
       'No valid filing found.' : `Error analysing (${res.message || res.statusText || res.status}).`;
    yield put(failedAction(message));
  }
}

/**
 * Watch for actions.
 */
export function* saga(): IterableIterator<Effect> {
  yield all([
    takeLatest(SEARCH, searchSaga),
    takeLatest(ANALYSE, analyseSaga),
  ]);
}
