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
import { all, call, put, takeEvery } from 'redux-saga/effects';

import {
  PROFILES_FETCH, FILINGS_FETCH, UPLOAD,
  receivedProfilesAction, failedProfilesAction,
  receivedFilingsAction, failedFilingsAction,
  UploadAction, uploadFailedAction,
} from './actions';
import { apiFetchJson } from '../api-fetch';
import { documentServiceFilingVersion, documentServiceCategories, DOCUMENT_SERVICE_FILINGS } from '../urls';
import { Filing, FilingVersion, Category } from '../models';
import { WorkspaceFiling } from './reducers';

export const POLL_MILLIS = 1000;

export const LATEST_FILINGS = `${DOCUMENT_SERVICE_FILINGS}?pageNumber=1&pageSize=20&sort=creationDate&sortOrder=desc`;

export function* fetchProfilesSaga(): IterableIterator<Effect> {
  try {
    const category: Category = yield call(apiFetchJson, documentServiceCategories('validation'));
    const { profiles } = category;
    if (!profiles || profiles.length === 0) {
      yield put(failedProfilesAction('Startup failed (No profiles)'));
      return;
    }
    yield put(receivedProfilesAction(profiles));
  } catch (res) {
    yield put(failedProfilesAction(`Startup failed (${res.message || res.statusText || res.status}).`));
  }
}

export function* fetchFilingsSaga(): IterableIterator<Effect> {
  try {
    const filings: Filing[] = yield call(apiFetchJson, LATEST_FILINGS);
    const workspaceFilings: WorkspaceFiling[] = filings
    .map(filing => ({...filing,
        versions: filing.versions && filing.versions.filter(version => version.status === 'DONE'),
      }))
      .filter(filing => filing.versions && filing.versions.length)
      .map(filing => {
        const latestVersion = filing.versions![filing.versions!.length - 1];
        return {id: latestVersion.id, name: filing.name, date: new Date(latestVersion.created)};
      }).slice(0, 10);

    yield put(receivedFilingsAction(workspaceFilings));
  } catch (res) {
    yield put(failedFilingsAction(res.message || res.statusText || `Status: ${res.status}`));
  }
}

export function navigate(href: string): void {
  window.location.href = href;
}

export function* uploadSaga(action: UploadAction): IterableIterator<Effect> {
  const { app, params } = action;

  // Create the filing by uplaoding the file to the Document Service.
  const { profile, file } = params;
  const formData = new FormData();
  formData.append('file', file, file.name);
  formData.append('name', file.name);
  formData.append('validationProfile', profile);
  const init: RequestInit = {
    method: 'POST',
    body: formData,
  };

  let filing: Filing;
  try {
    filing = yield call(apiFetchJson, DOCUMENT_SERVICE_FILINGS, init);
  } catch (res) {
    yield put(uploadFailedAction(`File error (${res.message || res.statusText || res.status}).`));
    return;
  }
  if (!filing.versions) {
    yield put(uploadFailedAction('Filing has no versions'));
    return;
  }

  try {
    // Poll for filing completion status.
    let version: FilingVersion = filing.versions[0];
    while (version.status !== 'DONE') {
      yield call(delay, POLL_MILLIS);
      version = yield call(apiFetchJson, documentServiceFilingVersion(version.id));
    }

    const url = app.filingHref!.replace('{id}', version.id);
    yield call(navigate, url);
  } catch (res) {
    yield put(uploadFailedAction(res.message || res.statusText || `Status: ${res.status}`));
  }
}

export function* saga(): IterableIterator<Effect> {
  yield all([
    takeEvery(PROFILES_FETCH, fetchProfilesSaga),
    takeEvery(FILINGS_FETCH, fetchFilingsSaga),
    takeEvery(UPLOAD, uploadSaga),
  ]);
}
