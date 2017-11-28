import { all, call, put } from 'redux-saga/effects';

import { apiFetchJson } from '../../api-fetch';
import { saga as appBarSaga } from '../sagas';
import { receivedAction, failedAction } from '../actions';

import { exampleUser, exampleApps } from '../../tests/model-examples';

describe('appBarSaga', () => {
  it('calls APIs in parallel and dispatches', () => {
    const saga = appBarSaga();

    expect(saga.next().value).toEqual(all([
      call(apiFetchJson, '/api/user'),
      call(apiFetchJson, '/api/apps'),
    ]));
    expect(saga.next([exampleUser, exampleApps]).value)
      .toEqual(put(receivedAction(exampleUser, exampleApps)));
  });

  it('is sad if error fetching', () => {
    const saga = appBarSaga();

    saga.next();
    expect(saga.throw && saga.throw({status: 403, statusText: 'LOLWAT'}).value)
    .toEqual(put(failedAction(jasmine.stringMatching(/LOLWAT/) as any)));
  });
});
