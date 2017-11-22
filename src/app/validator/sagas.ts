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

import { Effect, delay } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';

import { receivedAction, failedAction, FETCH, FetchAction } from './actions';
import {
  documentServiceFilingVersion,
  validationServiceFilingVersion,
} from '../urls';
import { FilingVersion } from '../models';
import { apiFetchJson } from '../api-fetch';

const POLL_MILLIS = 1000;

export function* fetchSaga(action: FetchAction): IterableIterator<Effect> {
  const { filingVersionId } = action;
  try {
    // Poll for filing completion status.
    let version: FilingVersion;
    do {
      yield call(delay, POLL_MILLIS);
      version = yield call(apiFetchJson, documentServiceFilingVersion(filingVersionId));
    } while (version.status !== 'DONE');

    const validationSummary = yield call(apiFetchJson, validationServiceFilingVersion(filingVersionId));
    yield put(receivedAction(filingVersionId, validationSummary.severity));
  } catch (res) {
    yield put(failedAction(filingVersionId, res.message || res.statusText || `Status: ${res.status}`));
  }
}

export function* saga(): IterableIterator<Effect> {
  yield takeEvery(FETCH, fetchSaga);
}
