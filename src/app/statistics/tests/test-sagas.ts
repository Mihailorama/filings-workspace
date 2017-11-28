import { call, put } from 'redux-saga/effects';

import { fetchAction, receivedAction, failedAction } from '../actions';
import { fetchSaga } from '../sagas';
import { filingStatisticsService } from '../../urls';
import { exampleStatistics } from '../../tests/model-examples';

describe('fetchStatisticsSaga', () => {
  const filingVersionId = '1234';

  it('dispatches RECEIVED if all goes well', () => {
    const saga = fetchSaga(fetchAction(filingVersionId));

    expect(saga.next().value).toEqual(call(filingStatisticsService.getStatistics, {filingVersionId}));
    expect(saga.next(exampleStatistics).value).toEqual(put(
      receivedAction(filingVersionId, exampleStatistics)));
  });

  it('dispatches FAILED if call to service fails', () => {
    const saga = fetchSaga(fetchAction(filingVersionId));

    saga.next();  // First step as above.
    expect(saga.throw && saga.throw(new Error('LOLWAT')).value).toEqual(put(
      failedAction(filingVersionId, jasmine.stringMatching(/LOLWAT/) as any)));
  });
});
