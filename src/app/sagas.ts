
import { Effect, delay } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';

import { validationProfilesReceivedAction, validationProfilesFailedAction,
  CHECKING_START, CheckingAction, checkingRequestedAction, checkingReceivedAction, checkingFailedAction } from './actions';
import { apiFetchJson } from './api-fetch';
import { Category, Filing, FilingVersion } from './models';

const POLL_MILLIS = 1000;

/**
 * Fetch the validation profiles. Runs once when starting up.
 */
export function* validationProfilesSaga(): IterableIterator<Effect> {
  try {
    const obj: Category = yield call(apiFetchJson, '/api/document-service/v1/categories/validation');
    const { profiles } = obj;
    if (!profiles) {
      return put(validationProfilesFailedAction('No profiles'));
    }
    yield put(validationProfilesReceivedAction(profiles));
  } catch (res) {
    return put(validationProfilesFailedAction(res.message || res.statusText));
  }
}

/**
 * Start checking one filing. Triggered by `checkingSaga`. Exported for testing.
 */
export function* checkingStartSaga(action: CheckingAction): IterableIterator<Effect> {
  const { params } = action;
  yield put(checkingRequestedAction(params));

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
  const filing: Filing = yield call(apiFetchJson, '/api/document-service/v1/filings/', init);
  if (!filing.versions) {
    return put(checkingFailedAction('Filing has no versions'));
  }

  // Poll for valdiation status.
  let version: FilingVersion = filing.versions[0];
  while (version.status !== 'DONE') {
    yield call(delay, POLL_MILLIS);
    version = yield call(apiFetchJson, '/api/document-service/v1/filing-versions/' + version.id);
  }
  const { validationStatus } = version;
  if (!validationStatus) {
    return put(checkingFailedAction('Filing version has no validation status'));
  }
  yield put(checkingReceivedAction(validationStatus));
}

/**
 * Watch for `CHECKING_START` actions.
 */
export function* checkingSaga(): IterableIterator<Effect> {
  yield takeEvery(CHECKING_START, checkingStartSaga);
}
