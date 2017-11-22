import { Effect, delay } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { receivedAction, failedAction, FETCH, ValidatorAction } from './actions';
import {
  documentServiceFilingVersion,
  validationServiceFilingVersion,
} from '../urls';
import { FilingVersion } from '../models';
import { apiFetchJson } from '../api-fetch';

const POLL_MILLIS = 1000;

export function* fetchSaga(action: ValidatorAction): IterableIterator<Effect> {
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
