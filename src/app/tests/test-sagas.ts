import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { validationProfilesReceivedAction, validationProfilesFailedAction,
  checkingStartAction, checkingRequestedAction, checkingReceivedAction, checkingFailedAction } from '../actions';
import { apiFetchJson } from '../api-fetch';
import { ValidationParams, exampleCategory, exampleFiling, exampleFilingVersion } from '../models';
import { validationProfilesSaga, checkingStartSaga } from '../sagas';

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

describe('checkingStartSaga', () => {
  const file = new File(['Hello world'], 'name-of-file.txt', {type: 'text/plain'});
  const params: ValidationParams = {
    profile: 'uiid-of-profile',
    file,
  };

  it('dispatches REQUESTED and RECEIVED if all goes well', () => {
    const saga = checkingStartSaga(checkingStartAction(params));

    expect(saga.next().value).toEqual(put(checkingRequestedAction(params)));
    const formData = new FormData();
    formData.append('validationProfile', 'uuid-of-profile');
    formData.append('name', 'name-of-file.txt');
    formData.append('file', file, 'name-of-file.txt');
    // Does not set dataSet (so servier will use the default dataset).
    expect(saga.next().value).toEqual(call(apiFetchJson, '/api/document-service/v1/filings/', {
      method: 'POST',
      body: formData,
    }));

    // Then poll for updates after 1 second.
    expect(saga.next(exampleFiling).value).toEqual(call(delay, 1000));
    expect(saga.next().value).toEqual(call(apiFetchJson, '/api/document-service/v1/filing-versions/f09be954-1895-4954-b333-6c9c89b833f1'));
    expect(saga.next({...exampleFilingVersion, status: 'RUNNING'}).value).toEqual(call(delay, 1000));
    expect(saga.next().value).toEqual(call(apiFetchJson, '/api/document-service/v1/filing-versions/f09be954-1895-4954-b333-6c9c89b833f1'));

    // Now results arrive and all is well.
    expect(saga.next({...exampleFilingVersion, status: 'DONE', validationStatus: 'OK'}).value).toEqual(put(checkingReceivedAction('OK')));
  });

  it('dispatches FAILED if initial upload fails', () => {
    const saga = checkingStartSaga(checkingStartAction(params));

    saga.next(); saga.next();  // First few steps as above.

    expect(saga.throw && saga.throw(new Error('LOLWAT')).value).toEqual(put(checkingFailedAction('LOLWAT')));
  });

  it('dispatches FAILED if polling fails', () => {
    const saga = checkingStartSaga(checkingStartAction(params));

    saga.next(); saga.next(); saga.next(exampleFiling); saga.next();  // First few steps as above.

    expect(saga.throw && saga.throw(new Error('LOLWAT')).value).toEqual(put(checkingFailedAction('LOLWAT')));
  });

  it('dispatches FAILED if polling fails with response', () => {
    const saga = checkingStartSaga(checkingStartAction(params));

    saga.next(); saga.next(); saga.next(exampleFiling); saga.next();  // First few steps as above.

    expect(saga.throw && saga.throw({status: 400, statusText: 'Nope.'}).value).toEqual(put(checkingFailedAction('Nope.')));
  });
});
