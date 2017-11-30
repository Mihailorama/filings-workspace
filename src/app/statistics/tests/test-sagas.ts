import { all, call, put } from 'redux-saga/effects';

import { fetchAction, receivedAction, failedAction } from '../actions';
import { fetchSaga } from '../sagas';
import { filingStatisticsService, filingsApi } from '../../urls';
import { exampleStatistics } from '../../tests/model-examples';

describe('fetchStatisticsSaga', () => {
  const filingName = 'Example filing.zip';
  const filingVersionId = '1234';

  it('dispatches RECEIVED if all goes well', () => {
    const saga = fetchSaga(fetchAction(filingVersionId));

    expect(saga.next().value).toEqual(all([
      call([filingStatisticsService, filingStatisticsService.getStatistics], {filingVersionId}),
      call([filingsApi, filingsApi.getFilingVersion], {filingVersionId}),
    ]));
    expect(saga.next([exampleStatistics, {filing: {name: filingName}}]).value).toEqual(put(
      receivedAction(filingVersionId, filingName, exampleStatistics)));
  });

  it('dispatches FAILED if call to service fails', () => {
    const saga = fetchSaga(fetchAction(filingVersionId));

    saga.next();  // First step as above.
    expect(saga.throw && saga.throw(new Error('LOLWAT')).value).toEqual(put(
      failedAction(filingVersionId, jasmine.stringMatching(/LOLWAT/) as any)));
  });
});
