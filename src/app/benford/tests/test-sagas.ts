/*
 *  Copyright 2017 CoreFiling S.A.R.L.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { all, call, put } from 'redux-saga/effects';

import {
  searchAction, searchResultsReceived, failedAction, analyseResultsReceived, analyseAction,
} from '../actions';
import { isFilingVersionReady, latestFiling, linkToPlatform, analyseFiling, filingVersionName } from '../urls';
import { searchSaga, analyseSaga } from '../sagas';
import { exampleFilingMatch, exampleAnalysis } from './model-examples';
import { delay } from 'redux-saga';
import { push } from 'react-router-redux';

describe('searchSaga', () => {
  it('happy path no delay', () => {
    const searchTerm = 'llama';
    const filingVersionId = 'fvid';
    const saga = searchSaga(searchAction(searchTerm));

    expect(saga.next().value).toEqual(
      call(latestFiling, searchTerm),
    );
    expect(saga.next(exampleFilingMatch).value)
      .toEqual(put(searchResultsReceived(exampleFilingMatch.filingName)));
    expect(saga.next(exampleFilingMatch).value)
      .toEqual(call(linkToPlatform, exampleFilingMatch));
    expect(saga.next(filingVersionId).value)
      .toEqual(call(isFilingVersionReady, filingVersionId));
    expect(saga.next(true).value)
      .toEqual(put(push('/filings-workspace/benfords-analyser-report/filing-versions/fvid')));
  });

  it('polls until the document service is ready', () => {
    const searchTerm = 'llama';
    const filingVersionId = 'fvid';
    const saga = searchSaga(searchAction(searchTerm));

    saga.next();
    saga.next(exampleFilingMatch);
    saga.next(exampleFilingMatch);
    saga.next(filingVersionId);
    expect(saga.next(false).value)
      .toEqual(call(delay, 1000));
    saga.next(true);
    saga.next(exampleAnalysis);
  });

  it('does not invoke analysis with no results', () => {
    const searchTerm = 'llama';
    const saga = searchSaga(searchAction(searchTerm));

    expect(saga.next().value).toEqual(
      call(latestFiling, searchTerm),
    );
    expect(saga.next(undefined).value)
      .toEqual(put(searchResultsReceived(undefined)));
  });

  it('is sad if error fetching', () => {
    const saga = searchSaga(searchAction('duck'));

    saga.next();
    expect(saga.throw && saga.throw({status: 403, statusText: 'LOLWAT'}).value)
    .toEqual(put(failedAction(jasmine.stringMatching(/LOLWAT/) as any)));
  });
});

describe('analyseSaga', () => {
  it('happy path', () => {
    const filingVersionId = 'fvid';
    const name = 'the name';
    const saga = analyseSaga(analyseAction(filingVersionId));

    expect(saga.next(true).value)
      .toEqual(all([
        call(filingVersionName, filingVersionId),
        call(analyseFiling, filingVersionId),
      ]));
    expect(saga.next([name, exampleAnalysis]).value)
      .toEqual(all([
        put(searchResultsReceived(name)),
        put(analyseResultsReceived(exampleAnalysis)),
      ]));
  });
  it('is sad if error fetching', () => {
    const filingVersionId = 'fvid';
    const saga = analyseSaga(analyseAction(filingVersionId));

    saga.next();
    expect(saga.throw && saga.throw({status: 403, statusText: 'LOLWAT'}).value)
    .toEqual(put(failedAction(jasmine.stringMatching(/LOLWAT/) as any)));
  });
});
