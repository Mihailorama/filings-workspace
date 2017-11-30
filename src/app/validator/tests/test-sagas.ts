import { filingsApi, validationFilingVersionsApi } from '../../urls';
import { call, put, all } from 'redux-saga/effects';

import { fetchAction, receivedAction, failedAction } from '../actions';
import { fetchSaga } from '../sagas';

describe('fetchValidatorSaga', () => {
  const filingVersionId = '1234';

  it('dispatches RECEIVED if all goes well', () => {
    const saga = fetchSaga(fetchAction(filingVersionId));
    const name = 'Filing.zip';
    const severity = 'OK';

    expect(saga.next().value).toEqual(all([
      call([validationFilingVersionsApi, validationFilingVersionsApi.getFilingVersion], {filingVersionId}),
      call([filingsApi, filingsApi.getFilingVersion], {filingVersionId}),
    ]));
    expect(saga.next([{severity}, {filing: {name}}]).value).toEqual(put(
      receivedAction(filingVersionId, name, severity)));
  });

  it('dispatches FAILED if call to service fails', () => {
    const saga = fetchSaga(fetchAction(filingVersionId));

    saga.next();  // First step as above.
    expect(saga.throw && saga.throw(new Error('LOLWAT')).value).toEqual(put(
      failedAction(filingVersionId, jasmine.stringMatching(/LOLWAT/) as any)));
  });
});
