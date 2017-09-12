
import { Effect } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { validationProfilesReceivedAction, validationProfilesFailedAction } from './actions';
import { apiFetchJson } from './api-fetch';
import { Category } from './models';

/**
 * Fetch the validation profiles.
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
