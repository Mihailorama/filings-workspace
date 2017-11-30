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

import { AnalysisResponse } from '@cfl/digit-frequency-analysis-service';
import { FilingMatch } from '../../fullbeam-search/models';

export const exampleFilingMatch: FilingMatch = {
  company: {
    id: 'company-id',
    name: 'Company Name',
  },
  filing: {
    id: 'filing-id',
    type: '10-Q',
    companyId: 'company-id',
    date: '2016-12-31',
    publicationMonth: '2017-03',
  },
  filingName: 'filing name',
};

export const exampleAnalysis: AnalysisResponse = {
  analysedFactCount: 1234,
  meanAbsoluteDeviation: 1.2345,
  chiSquared: 12.345,
  digits: [
    {
      digit: 1,
      proportion: {
        actualValue: 1.23,
        zTest: 0.01,
        expectedPercentiles: [
          { value: 1.23, percentile: 50 },
        ],
      },
    },
  ],
};
