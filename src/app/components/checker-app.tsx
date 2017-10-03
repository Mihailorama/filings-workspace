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

import * as classNames from 'classnames';
import * as React from 'react';
import { Option, TableMetadata } from '@cfl/table-rendering-service';
import { QueryableTablePage } from '@cfl/table-viewer';

import { Profile, ValidationParams, ValidationStatus } from '../models';
import { CheckingPhase } from '../state';
import ContactDetails from './contact-details';
import ValidationForm from './validation-form';
import ValidationResult from './validation-result';
import CloseSymbol from './close-symbol';
import Table from './table';
import TableSelector from './table-selector';

import './checker-app.less';

export interface CheckerAppProps {
  phase?: CheckingPhase;
  profiles?: Profile[];
  status?: ValidationStatus;
  error?: string;
  onSubmit?: (params: ValidationParams) => void;
  onResultsDismiss?: () => void;
  tables?: TableMetadata[];
  metadata?: TableMetadata;
  zOptions?: Option[][];
  table?: QueryableTablePage;
  onChangePage?: (x: number, y: number, z: number) => void;
  onChangeTable?: (table: TableMetadata) => void;
}

export default function CheckerApp(props: CheckerAppProps): JSX.Element {
  const { phase, profiles, status, error, onSubmit, onResultsDismiss, tables, metadata, zOptions, table,
      onChangePage, onChangeTable } = props;

  let innards: JSX.Element | undefined = undefined;
  switch (phase) {
    case 'startup':
    case 'form':
      innards = <div className='ckr-CheckerApp-formHolder'>
        <ValidationForm profiles={profiles} error={error} onSubmit={phase === 'form' ? onSubmit : undefined}/>
        <ContactDetails className='ckr-CheckerApp-formContact'/>
      </div>;
      break;
    case 'checking':
    case 'uploading':
      innards = <div className='ckr-CheckerApp-loadingOverlay'>
        <div className='ckr-CheckerApp-loading'>Processing&thinsp;…</div>
      </div>;
      break;
    case 'checking-failed':
    case 'results':
      innards = <div className='ckr-CheckerApp-resultHolder'>
        <div className='ckr-CheckerApp-resultHeading'>
          <ValidationResult status={status}/>
          {tables && tables.length > 1 && onChangeTable && <TableSelector tables={tables} onChangeTable={onChangeTable}/>}
          <CloseSymbol onClick={onResultsDismiss}/>
        </div>
        {metadata && zOptions && onChangePage && onChangeTable
          && <Table metadata={metadata} zOptions={zOptions} table={table}
              onChangePage={onChangePage} onChangeTable={onChangeTable}/>}
        <ContactDetails className='ckr-CheckerApp-resultContact'/>
      </div>;
      break;
    default:
      innards = <b>Forgot the case {phase}!?</b>;
      break;
  }

  return <div className={classNames('ckr-CheckerApp', `ckr-CheckerApp-${phase}`)}>
    {innards && innards}
  </div>;
}
