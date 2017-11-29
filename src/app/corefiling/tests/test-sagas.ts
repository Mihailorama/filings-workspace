import { call, put } from 'redux-saga/effects';

import { apiFetchJson } from '../../api-fetch';
import { saga as appBarSaga } from '../sagas';
import { receivedAction, failedAction } from '../actions';

import { exampleUser } from '../../tests/model-examples';

describe('appBarSaga', () => {
  it('calls API and dispatches', () => {
    const saga = appBarSaga();

    expect(saga.next().value).toEqual(call(apiFetchJson, '/api/user'));
    expect(saga.next(exampleUser).value).toEqual(put(receivedAction(exampleUser)));
  });

  it('is sad if error fetching', () => {
    const saga = appBarSaga();

    saga.next();
    expect(saga.throw && saga.throw({status: 403, statusText: 'LOLWAT'}).value)
    .toEqual(put(failedAction(jasmine.stringMatching(/LOLWAT/) as any)));
  });
});
