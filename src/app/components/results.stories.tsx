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
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Statistic } from '@cfl/filing-statistics-service';
import { TableMetadata } from '@cfl/table-rendering-service';
import { basicTableWithMetadata } from '@cfl/table-viewer/lib/test-utils';

import Results from './results';

const statistics: Statistic[] = [
  {name: 'table-count', label: 'Table count', value: 12},
  {name: 'fact-count', label: 'Fact count', value: 123},
];

storiesOf('Results', module)
  .add('Full', () => {
    const { table, metadata, zOptions } = basicTableWithMetadata();
    return (
      <Results
        status={'OK'}
        statistics={[]}
        tables={[metadata, {name: 'another table', id: 'uuid-of-another-table'} as TableMetadata]}
        metadata={metadata}
        zOptions={zOptions}
        table={table}
        onChangePage={action('onChangePage') as any}
        onChangeTable={action('onChangeTable') as any}
        onFetchStatistics={action('onFetchStatistics') as any}
      />
    );
  })
  .add('Loading table', () => {
    const { metadata, zOptions } = basicTableWithMetadata();
    return (
      <Results
        status={'OK'}
        statistics={[]}
        tables={[metadata, {name: 'another table'} as TableMetadata]}
        metadata={metadata}
        zOptions={zOptions}
        onChangePage={action('onChangePage') as any}
        onChangeTable={action('onChangeTable') as any}
        onFetchStatistics={action('onFetchStatistics') as any}
      />
    );
  })
  .add('No tables', () => {
    return (
      <Results
        status={'OK'}
        statistics={[]}
      />
    );
  })
  .add('Loading statistics', () => {
    const { table, metadata, zOptions } = basicTableWithMetadata();
    return (
      <Results
        status={'OK'}
        tables={[metadata, {name: 'another table', id: 'uuid-of-another-table'} as TableMetadata]}
        metadata={metadata}
        zOptions={zOptions}
        table={table}
        onChangePage={action('onChangePage') as any}
        onChangeTable={action('onChangeTable') as any}
        onFetchStatistics={action('onFetchStatistics') as any}
      />
    );
  })
  .add('With statistics', () => {
    const { table, metadata, zOptions } = basicTableWithMetadata();
    return (
      <Results
        status={'OK'}
        statistics={statistics}
        tables={[metadata, {name: 'another table', id: 'uuid-of-another-table'} as TableMetadata]}
        metadata={metadata}
        zOptions={zOptions}
        table={table}
        onChangePage={action('onChangePage') as any}
        onChangeTable={action('onChangeTable') as any}
        onFetchStatistics={action('onFetchStatistics') as any}
      />
    );
  })
  .add('No statistics', () => {
    const { table, metadata, zOptions } = basicTableWithMetadata();
    return (
      <Results
        status={'OK'}
        statistics={[]}
        tables={[metadata, {name: 'another table', id: 'uuid-of-another-table'} as TableMetadata]}
        metadata={metadata}
        zOptions={zOptions}
        table={table}
        onChangePage={action('onChangePage') as any}
        onChangeTable={action('onChangeTable') as any}
        onFetchStatistics={action('onFetchStatistics') as any}
      />
    );
  })
  .add('Warning', () => {
    const { table, metadata, zOptions } = basicTableWithMetadata();
    return (
      <Results
        status={'WARNING'}
        statistics={[]}
        tables={[metadata, {name: 'another table with a super long name', id: 'uuid-of-another-table'} as TableMetadata]}
        metadata={metadata}
        zOptions={zOptions}
        table={table}
        onChangePage={action('onChangePage') as any}
        onChangeTable={action('onChangeTable') as any}
        onFetchStatistics={action('onFetchStatistics') as any}
      />
    );
  });
