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

import { reducer, BenfordsState } from '../reducers';
import { searchAction, nameVersionLinkAction, analyseAction } from '../actions';
import { exampleAnalysis, exampleFilingMatch } from '../tests/model-examples';

describe('reducer', () => {

  it('preserves name from search when analysing if id matches', () => {
    let state: BenfordsState = {
      searchText: 'foo',
      phase: 'ready',
      analysisResults: exampleAnalysis,
      filingName: exampleFilingMatch.filingName,
      filingVersionId: 'lala',
      message: 'oops',
    };

    state = reducer(state, nameVersionLinkAction('the filingVersionId', 'the filingName'));
    state = reducer(state, analyseAction('the filingVersionId'));
    expect(state.filingName).toEqual('the filingName');
  });

  it('clears name from search when analysing if id does not matches', () => {
    let state: BenfordsState = {
      searchText: 'foo',
      phase: 'ready',
      analysisResults: exampleAnalysis,
      filingName: exampleFilingMatch.filingName,
      filingVersionId: 'lala',
      message: 'oops',
    };

    state = reducer(state, nameVersionLinkAction('the filingVersionId', 'the filingName'));
    state = reducer(state, analyseAction('anohter filingVersionId'));
    expect(state.filingName).toBeUndefined();
  });

  it('clears all results when searching again', () => {
    const withResults: BenfordsState = {
      searchText: 'foo',
      phase: 'ready',
      analysisResults: exampleAnalysis,
      filingName: exampleFilingMatch.filingName,
    };
    const newState = reducer(withResults, searchAction('lala'));
    expect(newState.filingName).toBeUndefined();
    expect(newState.analysisResults).toBeUndefined();
    expect(newState.phase).toEqual('searching');
  });

});
