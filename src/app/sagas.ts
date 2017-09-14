
import { Effect, delay } from 'redux-saga';
import { all, call, put, takeEvery } from 'redux-saga/effects';

import { startupInfoReceivedAction, startupInfoFailedAction,
  CHECKING_START, CheckingAction, checkingRequestedAction, checkingReceivedAction, checkingFailedAction } from './actions';
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
    if (!profiles) {
      yield put(startupInfoFailedAction('No profiles'));
      return;
    }
    yield put(startupInfoReceivedAction(user, apps, profiles));
  } catch (res) {
    yield put(startupInfoFailedAction(res.message || res.statusText));
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
  try {
    const filing: Filing = yield call(apiFetchJson, DOCUMENT_SERVICE_FILINGS, init);
    if (!filing.versions) {
      yield put(checkingFailedAction('Filing has no versions'));
      return;
    }

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
    yield put(checkingFailedAction(res.message || res.statusText));
  }
}

/**
 * Watch for `CHECKING_START` actions.
 */
export function* checkingSaga(): IterableIterator<Effect> {
  yield takeEvery(CHECKING_START, checkingStartSaga);
}
