import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { failedFilingsAction, receivedFilingsAction, uploadAction, uploadFailedAction } from '../actions';
import { fetchFilingsSaga, uploadSaga, navigate } from '../sagas';
import { WORKSPACE_APPS } from '../workspace-apps';
import { exampleFiling, exampleFilingVersion } from '../../tests/model-examples';
import { ValidationParams } from '../../models';
import { apiFetchJson } from '../../api-fetch';

// TODO: doesn't actually call the service yet.
xdescribe('fetchFilingsSaga', () => {
  it('dispatches RECEIVED if all goes well', () => {
    const saga = fetchFilingsSaga();

    // expect(saga.next()).toEqual(call(something));

    expect(saga.next([exampleFiling]).value).toEqual(put(
      receivedFilingsAction([exampleFiling])));
  });

  it('dispatches FAILED if call to service fails', () => {
    const saga = fetchFilingsSaga();

    saga.next();  // First step as above.
    expect(saga.throw && saga.throw(new Error('LOLWAT')).value).toEqual(put(
      failedFilingsAction(jasmine.stringMatching(/LOLWAT/) as any)));
  });
});

describe('uploadSaga', () => {
  const file = new File(['Hello world'], 'name-of-file.txt', {type: 'text/plain'});
  const params: ValidationParams = {
    profile: 'uiid-of-profile',
    file,
  };
  const app = WORKSPACE_APPS.validator;

  it('dispatches RECEIVED if all goes well', () => {
    const saga = uploadSaga(uploadAction(app, params));

    const formData = new FormData();
    formData.append('validationProfile', 'uuid-of-profile');
    formData.append('name', 'name-of-file.txt');
    formData.append('file', file, 'name-of-file.txt');
    // Does not set dataSet (so servier will use the default dataset).
    expect(saga.next().value).toEqual(call(apiFetchJson, '/api/document-service/v1/filings/', {
      method: 'POST',
      body: formData,
    }));

    const inProgress = {...exampleFilingVersion, status: 'RUNNING'};

    // Then poll for updates after 1 second.
    expect(saga.next({versions: [inProgress]}).value).toEqual(call(delay, 1000));
    expect(saga.next().value).toEqual(call(apiFetchJson, '/api/document-service/v1/filing-versions/f09be954-1895-4954-b333-6c9c89b833f1'));
    const url = app.filingHref!.replace('{id}', 'f09be954-1895-4954-b333-6c9c89b833f1');
    expect(saga.next(exampleFilingVersion).value).toEqual(call(
      navigate, url));
  });

  xit('dispatches FAILED if call to service fails', () => {
    const saga = fetchFilingsSaga();

    expect(saga.throw && saga.throw(new Error('LOLWAT')).value).toEqual(put(
      failedFilingsAction(jasmine.stringMatching(/LOLWAT/) as any)));
  });

  it('dispatches FAILED if polling fails', () => {
    const saga = uploadSaga(uploadAction(app, params));

    saga.next(); saga.next(exampleFiling); saga.next();  // First few steps as above.

    expect(saga.throw && saga.throw(new Error('LOLWAT')).value).toEqual(put(uploadFailedAction('LOLWAT')));
  });

  it('dispatches FAILED if polling fails with response', () => {
    const saga = uploadSaga(uploadAction(app, params));

    saga.next(); saga.next(exampleFiling); saga.next();  // First few steps as above.

    expect(saga.throw && saga.throw({status: 400, statusText: 'Nope.'}).value)
    .toEqual(put(uploadFailedAction(jasmine.stringMatching(/Nope./) as any)));
  });

});
