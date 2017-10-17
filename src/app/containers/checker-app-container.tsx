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
import { Option, TableMetadata } from '@cfl/table-rendering-service';
import { QueryableTablePage } from '@cfl/table-viewer';

import { tableRenderPageAction, checkingStartAction, resultsDismissAction } from '../actions';
import { Profile, ValidationStatus } from '../models';
import { CheckingPhase, CheckerState } from '../state';
import CheckerApp from '../components/checker-app';
import AppBarContainer from '../corefiling/app-bar-container';

type OwnProps = Props<CheckerAppContainer>;

interface PropsFromState {
  phase?: CheckingPhase;
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
}

type CheckerAppContainerProps = OwnProps & PropsFromState & PropsFromDispatch;

class CheckerAppContainer extends Component<CheckerAppContainerProps> {
  render(): JSX.Element {
    const {
      phase, profiles, status, message, onCheckingStart, onResultsDismiss, tables, metadata, zOptions, table, onTableRenderPage,
    } = this.props;
    return (
      <div>
        <AppBarContainer className='ckr-CheckerApp-appBar'/>
        <CheckerApp
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
          onChangePage={(x, y, z) => onTableRenderPage && metadata && onTableRenderPage(metadata, x, y, z)}
          onChangeTable={newTable => onTableRenderPage && onTableRenderPage(newTable, 0, 0, 0)}
        />
      </div>
    );
  }
}

function propsFromState(state: CheckerState): PropsFromState {
  const {
    global: {phase, profiles, message},
    filing: {status, tables, selectedTable: metadata, zOptions, tableRendering: table},
  } = state;
  return {phase, profiles, message, status, tables, metadata, zOptions, table};
}

const propsFromDispatch: MapDispatchToProps<PropsFromDispatch, {}> = {
  onCheckingStart: checkingStartAction,
  onResultsDismiss: resultsDismissAction,
  onTableRenderPage: tableRenderPageAction,
};

export default connect(propsFromState, propsFromDispatch)(CheckerAppContainer);
