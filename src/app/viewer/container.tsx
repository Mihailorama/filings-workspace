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
import Table from './table';
import TableSelector from './table-selector';
import { RouterProps, filingVersionId } from '../containers/filing-version-route';
import { Item, State, tablePageKey } from '../state';

export interface PropsFromState {
  tables: Item<TableMetadata[]>;
  selectedTable?: TableMetadata;
  table: Item<QueryableTablePage>;
  zOptions?: Option[][];
}

export interface ViewerContainerProps extends RouterProps, PropsFromState {
  fetchTablesAction: typeof fetchTablesAction;
  fetchPageAction: typeof fetchPageAction;
}

class ViewerContainer extends Component<ViewerContainerProps> {

  componentDidMount(): void {
    this.props.fetchTablesAction(filingVersionId(this.props));
  }

  componentWillReceiveProps(nextProps: ViewerContainerProps): void {
    const nextFilingVersionId = filingVersionId(nextProps);
    if (nextFilingVersionId !== filingVersionId(this.props)) {
      this.props.fetchTablesAction(nextFilingVersionId);
    }
  }

  renderTable(): JSX.Element | undefined {
    const {table, zOptions, selectedTable, fetchPageAction} = this.props;
    if (selectedTable) {
      const fvid = filingVersionId(this.props);
      const onChangePage = (x: number, y: number, z: number) => fetchPageAction(fvid, {table: selectedTable, x, y, z});

      return <Table metadata={selectedTable} zOptions={zOptions} table={table && table.value}
                    onChangePage={onChangePage} />;
    }
    return undefined;
  }

  render(): JSX.Element {
    const {tables, fetchPageAction} = this.props;
    const fvid = filingVersionId(this.props);
    const onChangeTable = (table: TableMetadata) => fetchPageAction(fvid, {table, x: 0, y: 0, z: 0});
    return <div>
      { tables && tables.value && [
          <TableSelector tables={tables.value} onChangeTable={onChangeTable}/>,
          this.renderTable(),
        ]
      }
    </div>;
  }
}

export default connect(
  (state: State, routerProps: RouterProps): PropsFromState => {
    const fvid = filingVersionId(routerProps);
    const tables = state.tables[fvid] || {loading: true};
    const page = state.selectedTablePage[fvid];
    const table = page && state.tableRendering[tablePageKey(page)] || {loading: true};
    const zOptions = page && state.zOptions[page.table.id];
    return {tables, selectedTable: page && page.table, table, zOptions};
  },
  {fetchTablesAction, fetchPageAction},
)(ViewerContainer);
