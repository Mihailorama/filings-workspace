import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import {
  receivedProfilesAction, failedProfilesAction,
  receivedFilingsAction, failedFilingsAction,
  uploadAction, uploadFailedAction,
} from '../actions';
import {
  fetchFilingsSaga, uploadSaga, navigate, LATEST_FILINGS, POLL_MILLIS, fetchProfilesSaga, stripExtension,
} from '../sagas';
import { WORKSPACE_APPS } from '../workspace-apps';
import { exampleFiling, exampleFilingVersion, exampleCategory } from '../../tests/model-examples';
import { ValidationParams } from '../../models';
import { apiFetchJson } from '../../api-fetch';
import { categoriesApi, filingsApi } from '../../urls';

describe('profilesSaga', () => {
  it('calls APIs in parallel and dispatches', () => {
    const saga = fetchProfilesSaga();

    expect(saga.next().value)
      .toEqual(call([categoriesApi, categoriesApi.getCategory], {category: 'validation'}));
    expect(saga.next(exampleCategory).value)
      .toEqual(put(receivedProfilesAction(exampleCategory.profiles)));
  });

  it('is sad if error fetching', () => {
    const saga = fetchProfilesSaga();

    saga.next();
    expect(saga.throw && saga.throw({status: 403, statusText: 'LOLWAT'}).value)
    .toEqual(put(failedProfilesAction(jasmine.stringMatching(/LOLWAT/) as any)));
  });
});

describe('fetchFilingsSaga', () => {
  it('dispatches RECEIVED if all goes well', () => {
    const saga = fetchFilingsSaga();

    expect(saga.next().value).toEqual(call([filingsApi, filingsApi.getFilings], LATEST_FILINGS));

    const filings = [
      exampleFiling,
      {...exampleFiling, versions: [exampleFilingVersion, {...exampleFilingVersion, status: 'RUNNING'}]},
    ];
    expect(saga.next(filings).value).toEqual(put(
      receivedFilingsAction([{
        id: 'f09be954-1895-4954-b333-6c9c89b833f1',
        name: 'report.xbrl',
        date: new Date('2017-09-12T10:09:49.915Z'),
      }])));
  });

  it('limits to the latest 10 filing versions', () => {
    const saga = fetchFilingsSaga();

    expect(saga.next().value).toEqual(call([filingsApi, filingsApi.getFilings], LATEST_FILINGS));

    const filings = new Array(20).fill(
      {...exampleFiling, versions: [exampleFilingVersion]},
    );
    expect(saga.next(filings).value).toEqual(put(
      receivedFilingsAction(new Array(10).fill({
          id: 'f09be954-1895-4954-b333-6c9c89b833f1',
          name: 'report.xbrl',
          date: new Date('2017-09-12T10:09:49.915Z'),
        }))));
  });

  it('dispatches FAILED if call to service fails', () => {
    const saga = fetchFilingsSaga();

    saga.next();  // First step as above.
    expect(saga.throw && saga.throw(new Error('LOLWAT')).value).toEqual(put(
      failedFilingsAction(jasmine.stringMatching(/LOLWAT/) as any)));
  });
});

describe('stripExtension', () => {
  it('strips 3-4 character extensions', () => {
    expect(stripExtension('file.tx')).toEqual('file.tx');
    expect(stripExtension('file.txT')).toEqual('file');
    expect(stripExtension('file.txT1')).toEqual('file');
    expect(stripExtension('file.txT12')).toEqual('file.txT12');
  });
  it('handles multi-dotted files', () => {
    expect(stripExtension('File with multiple.parts.txt')).toEqual('File with multiple.parts');
    expect(stripExtension('last part.not.valid')).toEqual('last part.not.valid');
  });
  it('does not strip extensions with nothing before the dot', () => {
    expect(stripExtension('.txt')).toEqual('.txt');
  });
  it('does not strip files with no extension', () => {
    expect(stripExtension('No extension')).toEqual('No extension');
  });
});

describe('uploadSaga', () => {
  const file = new File(['Hello world'], 'name-of-file.txt', {type: 'text/plain'});
  const params: ValidationParams = {
    profile: 'uuid-of-profile',
    file,
  };
  const app = WORKSPACE_APPS.validator;

  it('dispatches RECEIVED if all goes well', () => {
    const saga = uploadSaga(uploadAction(app, params));

    const formData = new FormData();
    formData.append('validationProfile', 'uuid-of-profile');
    formData.append('name', 'name-of-file');
    formData.append('file', file, 'name-of-file.txt');
    // Does not set dataSet (so servier will use the default dataset).
    expect(saga.next().value).toEqual(call(apiFetchJson, '/api/document-service/v1/filings/', {
      method: 'POST',
      body: formData,
    }));

    const inProgress = {...exampleFilingVersion, status: 'RUNNING'};

    // Then poll for updates after 1 second.
    expect(saga.next({versions: [inProgress]}).value).toEqual(call(delay, POLL_MILLIS));
    expect(saga.next().value).toEqual(call([filingsApi, filingsApi.getFilingVersion], {
      filingVersionId: 'f09be954-1895-4954-b333-6c9c89b833f1',
    }));
    const url = app.filingHref!.replace('{id}', 'f09be954-1895-4954-b333-6c9c89b833f1');
    expect(saga.next(exampleFilingVersion).value).toEqual(call(
      navigate, url));
  });

  it('dispatches FAILED if call to service fails', () => {
    const saga = fetchFilingsSaga();

    saga.next(); // First few steps as above.

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
