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
import { Component } from 'react';
import { connect } from 'react-redux';

import { TableMetadata, Option } from '@cfl/table-rendering-service';
import { QueryableTablePage } from '@cfl/table-viewer';

import { fetchTablesAction, fetchPageAction } from './actions';
import Viewer from './viewer';
import { filingVersionId, FilingRouterProps } from '../containers/filing-version-route';
import { Item } from '../state';
import { ViewerState, tablePageKey } from './reducers';

export interface PropsFromState {
  tables: Item<TableMetadata[]>;
  selectedTable?: TableMetadata;
  table: Item<QueryableTablePage>;
  zOptions?: Option[][];
}

export interface ContainerProps extends FilingRouterProps, PropsFromState {
  fetchTablesAction: typeof fetchTablesAction;
  fetchPageAction: typeof fetchPageAction;
}

class Container extends Component<ContainerProps> {

  componentDidMount(): void {
    this.props.fetchTablesAction(filingVersionId(this.props));
  }

  componentWillReceiveProps(nextProps: ContainerProps): void {
    const nextFilingVersionId = filingVersionId(nextProps);
    if (nextFilingVersionId !== filingVersionId(this.props)) {
      this.props.fetchTablesAction(nextFilingVersionId);
    }
  }

  render(): JSX.Element {
    const {tables, selectedTable, table, zOptions, fetchPageAction} = this.props;
    const fvid = filingVersionId(this.props);
    const onChangePage = (x: number, y: number, z: number) => selectedTable &&
      fetchPageAction(fvid, {table: selectedTable, x, y, z});
    const onChangeTable = (t: TableMetadata) => fetchPageAction(fvid, {table: t, x: 0, y: 0, z: 0});
    return <Viewer
      tables={tables}
      selectedTable={selectedTable}
      table={table}
      zOptions={zOptions}
      onChangePage={onChangePage}
      onChangeTable={onChangeTable}
    />;
  }
}

export default connect(
  ({viewer: state}: {viewer: ViewerState}, routerProps: FilingRouterProps): PropsFromState => {
    const fvid = filingVersionId(routerProps);
    const tables = state.tables[fvid] || {loading: true};
    const page = state.selectedTablePage[fvid];
    const table = page && state.tableRendering[tablePageKey(page)] || {loading: true};
    const zOptions = page && state.zOptions[page.table.id];

    return {tables, selectedTable: page && page.table, table, zOptions};
  },
  {fetchTablesAction, fetchPageAction},
)(Container);
