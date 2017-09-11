import { call, put } from 'redux-saga/effects';

import { validationProfilesReceivedAction, validationProfilesFailedAction } from '../actions';
import { apiFetchJson } from '../api-fetch';
import { exampleCategory } from '../models';
import { validationProfilesSaga } from '../sagas';

describe('validationProfilesSaga', () => {
  it('calls getCategories(validation) and dispatches profiles', () => {
    const saga = validationProfilesSaga();
    expect(saga.next().value).toEqual(call(apiFetchJson, '/api/document-service/v1/categories/validation'));
    expect(saga.next(exampleCategory).value).toEqual(put(validationProfilesReceivedAction(exampleCategory.profiles)));
  });

  it('is sad if no profiles', () => {
    const saga = validationProfilesSaga();
    expect(saga.next().value).toEqual(call(apiFetchJson, '/api/document-service/v1/categories/validation'));
    expect(saga.next({}).value).toEqual(put(validationProfilesFailedAction('No profiles')));
  });

  it('is sad if error fetching profiles', () => {
    const saga = validationProfilesSaga();
    expect(saga.next().value).toEqual(call(apiFetchJson, '/api/document-service/v1/categories/validation'));
    expect(saga.throw && saga.throw({status: 403, statusText: 'LOLWAT'}).value).toEqual(put(validationProfilesFailedAction('LOLWAT')));
  });
});
