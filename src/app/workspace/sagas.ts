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
import { Category, Filing, FilingVersionSummary } from '@cfl/document-service';

import {
  PROFILES_FETCH, FILINGS_FETCH, UPLOAD,
  receivedProfilesAction, failedProfilesAction,
  receivedFilingsAction, failedFilingsAction,
  UploadAction, uploadFailedAction,
  SEARCH, searchResultsReceivedAction, searchFailedAction, SearchAction,
  SEARCH_SELECTION, SearchSelectionAction, searchSelectionFailedAction,
} from './actions';
import { FilingMatch } from '../fullbeam-search/models';
import { DOCUMENT_SERVICE_FILINGS } from '../urls';
import { WorkspaceFiling } from './reducers';
import { matchingFilings, linkToPlatform, isFilingVersionReady } from '../fullbeam-search/urls';
import { apiFetchJson } from '../api-fetch';
import { categoriesApi, filingsApi } from '../urls';

export const POLL_MILLIS = 1000;

export const LATEST_FILINGS = {pageNumber: 1, pageSize: 20, sort: 'creationDate', sortOrder: 'desc'};

export function* fetchProfilesSaga(): IterableIterator<Effect> {
  try {
    const category: Category = yield call([categoriesApi, categoriesApi.getCategory], {category: 'validation'});
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
    const filings: Filing[] = yield call([filingsApi, filingsApi.getFilings], LATEST_FILINGS);
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

export function stripExtension(name: string): string {
  return name.replace(/^(.+)\.[A-Za-z0-9]{3,4}$/, '$1');
}

export function* uploadSaga(action: UploadAction): IterableIterator<Effect> {
  const { app, params } = action;

  // Create the filing by uplaoding the file to the Document Service.
  const { profile, file } = params;
  const formData = new FormData();
  formData.append('file', file, file.name);
  formData.append('name', stripExtension(file.name));
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
    let version: FilingVersionSummary = filing.versions[0];
    while (version.status !== 'DONE') {
      yield call(delay, POLL_MILLIS);
      version = yield call([filingsApi, filingsApi.getFilingVersion], {filingVersionId: version.id});
    }

    const url = app.filingHref!.replace('{id}', version.id);
    yield call(navigate, url);
  } catch (res) {
    yield put(uploadFailedAction(res.message || res.statusText || `Status: ${res.status}`));
  }
}

export function* searchSaga(action: SearchAction): IterableIterator<Effect> {
  try {
    const result: FilingMatch[] = yield call(matchingFilings, action.search);
    yield put(searchResultsReceivedAction(result));
  } catch (res) {
    yield put(searchFailedAction(`Error searching (${res.message || res.statusText || res.status}).`));
  }
}

export function* searchSelectionSaga(action: SearchSelectionAction): IterableIterator<Effect> {
  const { app, selectedFiling } = action;
  try {
    const filingVersionId = yield call(linkToPlatform, selectedFiling);
    while (!(yield call(isFilingVersionReady, filingVersionId))) {
      yield call(delay, POLL_MILLIS);
    }
    const url = app.filingHref!.replace('{id}', filingVersionId);
    yield call(navigate, url);
  } catch (res) {
    yield put(searchSelectionFailedAction(`Error linking (${res.message || res.statusText || res.status}).`));
  }
}

export function* saga(): IterableIterator<Effect> {
  yield all([
    takeEvery(PROFILES_FETCH, fetchProfilesSaga),
    takeEvery(FILINGS_FETCH, fetchFilingsSaga),
    takeEvery(UPLOAD, uploadSaga),
    takeEvery(SEARCH, searchSaga),
    takeEvery(SEARCH_SELECTION, searchSelectionSaga),
  ]);
}
