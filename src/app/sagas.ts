
import { Effect, delay } from 'redux-saga';
import { all, call, put, takeEvery } from 'redux-saga/effects';

import { startupInfoReceivedAction, startupInfoFailedAction,
  CHECKING_START, CheckingAction, uploadStartedAction, uploadFailedAction,
  checkingStartedAction, checkingReceivedAction, checkingFailedAction } from './actions';
import { apiFetchJson } from './api-fetch';
import { User, App, Category, Filing, FilingVersion } from './models';
import { USER, APPS, DOCUMENT_SERVICE_FILINGS, documentServiceCategories, documentServiceFilingVersion } from './urls';

const POLL_MILLIS = 1000;

/**
 * Fetch the information needed at startup. If this fails we cannot show the app.
 */
export function* startupInfoSaga(): IterableIterator<Effect> {
  try {
    const [user, category, apps]: [User, Category, App[]] = yield all([
      call(apiFetchJson, USER),
      call(apiFetchJson, documentServiceCategories('validation')),
      call(apiFetchJson, APPS),
    ]);
    const { profiles } = category;
    if (!profiles || profiles.length === 0) {
      yield put(startupInfoFailedAction('Startup failed (No profiles)'));
      return;
    }
    yield put(startupInfoReceivedAction(user, apps, profiles));
  } catch (res) {
    yield put(startupInfoFailedAction(`Startup failed (${res.message || res.statusText || res.status}).`));
  }
}

/**
 * Start checking one filing. Triggered by `checkingSaga`. Exported for testing.
 */
export function* checkingStartSaga(action: CheckingAction): IterableIterator<Effect> {
  const { params } = action;
  yield put(uploadStartedAction(params));

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
    console.log(res);
    yield put(uploadFailedAction(`File error (${res.message || res.statusText || res.status}).`));
    return;
  }
  if (!filing.versions) {
    yield put(uploadFailedAction('Filing has no versions'));
    return;
  }
  yield put(checkingStartedAction());

  try {
    // Poll for validation status.
    let version: FilingVersion = filing.versions[0];
    while (version.status !== 'DONE') {
      yield call(delay, POLL_MILLIS);
      version = yield call(apiFetchJson, documentServiceFilingVersion(version));
    }
    const { validationStatus } = version;
    if (!validationStatus) {
      yield put(checkingFailedAction('Filing version has no validation status'));
      return;
    }

    yield put(checkingReceivedAction(validationStatus));
  } catch (res) {
    yield put(checkingFailedAction(res.message || res.statusText || `Status: ${res.status}`));
  }
}

/**
 * Watch for `CHECKING_START` actions.
 */
export function* checkingSaga(): IterableIterator<Effect> {
  yield takeEvery(CHECKING_START, checkingStartSaga);
}
