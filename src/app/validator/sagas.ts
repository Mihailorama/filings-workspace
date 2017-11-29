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

import { Effect } from 'redux-saga';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { FilingVersion } from '@cfl/document-service';
import { FilingVersionSummary } from '@cfl/validation-service';

import { receivedAction, failedAction, FETCH, FetchAction } from './actions';
import { filingsApi, validationFilingVersionsApi } from '../urls';

export function* fetchSaga(action: FetchAction): IterableIterator<Effect> {
  const { filingVersionId } = action;
  try {
    const [validationSummary, filingVersion]: [FilingVersionSummary, FilingVersion] = yield all([
      call([validationFilingVersionsApi, validationFilingVersionsApi.getFilingVersion], {filingVersionId}),
      call([filingsApi, filingsApi.getFilingVersion], {filingVersionId}),
    ]);
    yield put(receivedAction(filingVersionId, filingVersion.filing.name, validationSummary.severity));
  } catch (res) {
    yield put(failedAction(filingVersionId, res.message || res.statusText || `Status: ${res.status}`));
  }
}

export function* saga(): IterableIterator<Effect> {
  yield takeEvery(FETCH, fetchSaga);
}
