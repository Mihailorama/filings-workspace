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
import { Component, Props } from 'react';

import { Profile, ValidationParams, ValidationStatus } from '../models';
import { CheckingPhase } from '../state';
import AppBarContainer from '../corefiling/app-bar-container';
import ContactDetails from './contact-details';
import ValidationForm from './validation-form';
import ValidationResult from './validation-result';
import CloseSymbol from './close-symbol';

import './checker-app.less';
import Table from './table';
import { Option, TableMetadata } from '@cfl/table-rendering-service';
import { QueryableTablePage } from '@cfl/table-viewer';

export interface CheckerAppProps extends Props<CheckerApp> {
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

export default class CheckerApp extends Component<CheckerAppProps> {
  render(): JSX.Element {
    const { phase, profiles, status, error, onSubmit, onResultsDismiss, tables, metadata, zOptions, table,
        onChangePage, onChangeTable } = this.props;

    return <div className={classNames('ckr-CheckerApp', `ckr-CheckerApp-${phase}`)}>
      <AppBarContainer className='ckr-CheckerApp-appBar'/>
      <div className='ckr-CheckerApp-formHolder'>
        <ValidationForm profiles={profiles} error={error} onSubmit={phase === 'form' ? onSubmit : undefined}/>
        <ContactDetails className='ckr-CheckerApp-formContact'/>
      </div>
      {(phase === 'uploading' || phase === 'checking' || phase === 'checking-failed' || phase === 'results')
        && <div className='ckr-CheckerApp-resultOverlay'>
          <div className='ckr-CheckerApp-resultHolder'>
            <ValidationResult status={status}/>
            {phase === 'results' && tables && metadata && zOptions && table && onChangePage && onChangeTable
              && <Table tables={tables} metadata={metadata} zOptions={zOptions} table={table}
                  onChangePage={onChangePage} onChangeTable={onChangeTable}/>}
            {(phase === 'checking-failed' || phase === 'results') && <ContactDetails className='ckr-CheckerApp-resultContact'/>}
            {(phase === 'checking-failed' || phase === 'results') && <CloseSymbol onClick={onResultsDismiss}/>}
          </div>
        </div>}
    </div>;
  }
}
