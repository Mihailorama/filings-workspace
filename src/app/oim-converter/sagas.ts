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
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { FilingVersion } from '@cfl/document-service';

import {
  GET_FILING_VERSION, GetFilingVersionAction, filingVersionReceivedAction,
  GET_DOCUMENT_CONTENT, GetDocumentContentAction, documentContentReceivedAction,
  failedAction,
} from './actions';
import { filingVersion, documentContent } from './urls';

export function* filingVersionSaga(action: GetFilingVersionAction): IterableIterator<Effect> {
  try {
    const result: FilingVersion = yield call(filingVersion, action.filingVersionId);
    yield put(filingVersionReceivedAction(result));
  } catch (res) {
    yield put(failedAction(`Error searching (${res.message || res.statusText || res.status}).`));
  }
}

export function* documentContentSaga(action: GetDocumentContentAction): IterableIterator<Effect> {
  try {
    const content: string = yield call(documentContent, action.documentId);
    yield put(documentContentReceivedAction(content));
  } catch (res) {
    yield put(failedAction(`Error searching (${res.message || res.statusText || res.status}).`));
  }
}

/**
 * Watch for actions.
 */
export function* saga(): IterableIterator<Effect> {
  yield all([
    takeLatest(GET_FILING_VERSION, filingVersionSaga),
    takeLatest(GET_DOCUMENT_CONTENT, documentContentSaga),
  ]);
}
