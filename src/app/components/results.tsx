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

import { Option, TableMetadata } from '@cfl/table-rendering-service';
import { QueryableTablePage } from '@cfl/table-viewer';

import Table from './table';
import Button from './button';
import TableSelector from './table-selector';
import ValidationResult from './validation-result';
import { ValidationStatus } from '../models';

import './results.less';

export interface ResultsProps {
  status?: ValidationStatus;
  tables?: TableMetadata[];
  metadata?: TableMetadata;
  zOptions?: Option[][];
  table?: QueryableTablePage;
  onChangePage?: (x: number, y: number, z: number) => void;
  onChangeTable?: (table: TableMetadata) => void;
  onResultsDismiss?: () => void;
}
export default function Results(props: ResultsProps): JSX.Element {
  const { status, tables, metadata, zOptions, table, onChangePage, onChangeTable, onResultsDismiss } = props;
  return (
    <div className='ckr-Results-resultView'>
      <div className='ckr-Results-resultHeading'>
        <ValidationResult status={status}/>
        {tables && tables.length > 1 && onChangeTable && <TableSelector tables={tables} onChangeTable={onChangeTable}/>}
        <Button primary className='ckr-Results-resultReset' onClick={onResultsDismiss}>Upload</Button>
      </div>
      {status && onChangePage && onChangeTable
      && <Table status={status} metadata={metadata} zOptions={zOptions} table={table}
                onChangePage={onChangePage} onChangeTable={onChangeTable}/>}
    </div>
  );
}
