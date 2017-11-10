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
import { Option, TableMetadata } from '@cfl/table-rendering-service';
import { QueryableTablePage } from '@cfl/table-viewer';

import Table from './table';
import Button from './button';
import StatisticsPopup from './statistics';
import TableSelector from './table-selector';
import ValidationResult from './validation-result';
import { ValidationStatus } from '../models';

import './results.less';

export interface ResultsProps {
  error?: string;
  status?: ValidationStatus;
  statistics?: Statistic[];
  tables?: TableMetadata[];
  metadata?: TableMetadata;
  zOptions?: Option[][];
  table?: QueryableTablePage;
  onChangePage?: (x: number, y: number, z: number) => void;
  onChangeTable?: (table: TableMetadata) => void;
  onResultsDismiss?: () => void;
  onFetchStatistics?: () => void;
}

interface ResultsState {
  showStatistics?: boolean;
}

export default class Results extends React.Component<ResultsProps, ResultsState> {
  constructor(props: ResultsProps) {
    super(props);
    this.state = {showStatistics: false};
  }
  showStatistics(): void {
    this.setState({showStatistics: true}, () =>
      this.props.onFetchStatistics && this.props.onFetchStatistics());
  }
  hideStatistics(): void {
    this.setState({showStatistics: false});
  }
  render(): JSX.Element {
    const {
      error, status, statistics, tables, metadata, zOptions, table,
      onChangePage, onChangeTable, onResultsDismiss,
    } = this.props;
    const { showStatistics } = this.state;
    return (
      <div className='app-Results-resultView'>
        <div className='app-Results-resultHeading'>
          <ValidationResult status={status} error={error}/>
          {!error && tables && tables.length > 1 && onChangeTable &&
            [
              <TableSelector tables={tables} onChangeTable={onChangeTable}/>,
              <Button className='app-Results-filingStatistics' onClick={() => this.showStatistics()}>Filing statistics</Button>,
            ]
          }
          <Button primary className='app-Results-resultReset' onClick={onResultsDismiss}>Upload</Button>
        </div>
        {showStatistics && <StatisticsPopup statistics={statistics} onCloseClick={() => this.hideStatistics()}/>}
        {status
        && <Table status={status} metadata={metadata} zOptions={zOptions} table={table}
                  onChangePage={onChangePage} onChangeTable={onChangeTable}/>}
      </div>
    );
  }
}
