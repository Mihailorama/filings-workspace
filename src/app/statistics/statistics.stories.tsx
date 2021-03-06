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

import * as React from 'react';
import { Statistic } from '@cfl/filing-statistics-service';
import { storiesOf } from '@storybook/react';

import Statistics from './statistics';

const statistics: Statistic[] = [
  {name: 'table-count', format: 'integer', label: 'Table count', value: 12},
  {name: 'fact-count', format: 'integer', label: 'Fact count', value: 123},
  {name: 'document-tagged-percentage', format: 'percentage', label: 'Percentage of document tagged', value: 9.87654321},
];

storiesOf('Statistics', module)
  .add('Loading', () => {
    return (
      <Statistics statistics={{loading: true}} />
    );
  })
  .add('No statistics', () => {
    return (
      <Statistics statistics={{loading: false, value: []}} name='Example filing.zip' />
    );
  })
  .add('With statistics', () => {
    return (
      <Statistics statistics={{loading: false, value: statistics}} name='Example filing.zip' />
    );
  })
  .add('Error', () => {
    return (
      <Statistics statistics={{loading: false, error: 'Something went wrong.'}} />
    );
  });
