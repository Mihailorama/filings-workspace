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
import { searchAction } from '../actions';
import { exampleAnalysis, exampleFilingMatch } from '../tests/model-examples';
import { State } from '../../state';

describe('reducer', () => {

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
