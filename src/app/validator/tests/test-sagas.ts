import { call, put } from 'redux-saga/effects';

import { fetchAction, receivedAction, failedAction } from '../actions';
import { fetchSaga } from '../sagas';
import { validationServiceFilingVersion } from '../../urls';
import { apiFetchJson } from '../../api-fetch';

describe('fetchValidatorSaga', () => {
  const filingVersionId = '1234';

  it('dispatches RECEIVED if all goes well', () => {
    const saga = fetchSaga(fetchAction(filingVersionId));
    const status = 'OK';

    expect(saga.next().value).toEqual(call(apiFetchJson, validationServiceFilingVersion(filingVersionId)));
    expect(saga.next({severity: status}).value).toEqual(put(
      receivedAction(filingVersionId, status)));
  });

  it('dispatches FAILED if call to service fails', () => {
    const saga = fetchSaga(fetchAction(filingVersionId));

    saga.next();  // First step as above.
    expect(saga.throw && saga.throw(new Error('LOLWAT')).value).toEqual(put(
      failedAction(filingVersionId, jasmine.stringMatching(/LOLWAT/) as any)));
  });
});
