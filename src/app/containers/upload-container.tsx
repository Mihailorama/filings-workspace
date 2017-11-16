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
import { Component, Props } from 'react';
import { connect, MapDispatchToProps } from 'react-redux';
import { Statistic } from '@cfl/filing-statistics-service';
import { Option, TableMetadata } from '@cfl/table-rendering-service';
import { QueryableTablePage } from '@cfl/table-viewer';

import { tableRenderPageAction, checkingStartAction, resultsDismissAction, filingStatisticsFetchAction } from '../actions';
import { Profile, ValidationStatus } from '../models';
import { Phase, State } from '../state';
import App from '../components/app';

type OwnProps = Props<UploadContainer>;

interface PropsFromState {
  filingVersionId?: string;
  statistics?: Statistic[];
  phase?: Phase;
  profiles?: Profile[];
  status?: ValidationStatus;
  message?: string;
  tables?: TableMetadata[];
  metadata?: TableMetadata;
  zOptions?: Option[][];
  table?: QueryableTablePage;
}

interface PropsFromDispatch {
  onCheckingStart?: typeof checkingStartAction;
  onResultsDismiss?: typeof resultsDismissAction;
  onTableRenderPage?: typeof tableRenderPageAction;
  onFetchStatistics?: typeof filingStatisticsFetchAction;
}

type AppContainerProps = OwnProps & PropsFromState & PropsFromDispatch;

class UploadContainer extends Component<AppContainerProps> {
  render(): JSX.Element {
    const {
      filingVersionId, phase, profiles, status, message, tables, metadata, zOptions, table, statistics,
      onTableRenderPage, onCheckingStart, onResultsDismiss, onFetchStatistics,
    } = this.props;
    return (
      // We definitely want less than this!
      <App
        phase={phase}
        profiles={profiles}
        status={status}
        error={message}
        onSubmit={onCheckingStart}
        onResultsDismiss={onResultsDismiss}
        tables={tables}
        metadata={metadata}
        zOptions={zOptions}
        table={table}
        statistics={statistics}
        onChangePage={(x, y, z) => onTableRenderPage && metadata && onTableRenderPage(metadata, x, y, z)}
        onChangeTable={newTable => onTableRenderPage && onTableRenderPage(newTable, 0, 0, 0)}
        onFetchStatistics={() => onFetchStatistics && filingVersionId && !statistics && onFetchStatistics(filingVersionId)}
      />
    );
  }
}

function propsFromState(state: State): PropsFromState {
  const {
    global: {phase, profiles, message},
    filing: {filingVersionId, status, tables, selectedTable: metadata, zOptions, tableRendering: table, statistics},
  } = state;
  return {filingVersionId, phase, profiles, message, status, tables, metadata, zOptions, table, statistics};
}

const propsFromDispatch: MapDispatchToProps<PropsFromDispatch, {}> = {
  onCheckingStart: checkingStartAction,
  onResultsDismiss: resultsDismissAction,
  onTableRenderPage: tableRenderPageAction,
  onFetchStatistics: filingStatisticsFetchAction,
};

export default connect(propsFromState, propsFromDispatch)(UploadContainer);
