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

import { TableMetadata, Option } from '@cfl/table-rendering-service';
import { QueryableTablePage } from '@cfl/table-viewer';

import Table from './table';
import TableSelector from './table-selector';
import { Item } from '../state';

import './viewer.less';

export interface ViewerProps extends React.Props<Viewer> {
  tables: Item<TableMetadata[]>;
  selectedTable?: TableMetadata;
  table: Item<QueryableTablePage>;
  zOptions?: Option[][];
  onChangePage: (x: number, y: number, z: number) => void;
  onChangeTable: (table: TableMetadata) => void;
}

export default class Viewer extends React.Component<ViewerProps> {
  renderTable(): JSX.Element | undefined {
    const {table, zOptions, selectedTable, onChangePage} = this.props;
    if (selectedTable) {
      return <Table metadata={selectedTable} zOptions={zOptions} table={table && table.value}
                    onChangePage={onChangePage} />;
    }
    return undefined;
  }

  render(): JSX.Element {
    const {tables, selectedTable, table, zOptions, onChangeTable, onChangePage} = this.props;
    const error = tables.error || (table && table.error);
    return <section className='app-Viewer'>
      <header className='app-Viewer-resultHeading'>
        {error ?
          <div className='app-Viewer-error'>{error}</div> :
          tables.value ?
          <TableSelector className='app-Viewer-tableSelector'
            tables={tables.value}
            selectedTable={selectedTable}
            onChangeTable={onChangeTable}
          /> :
          <div className='app-Viewer-loading'>Loading...</div>
        }
      </header>
      <Table metadata={selectedTable} zOptions={zOptions} table={table.value}
                onChangePage={onChangePage} onChangeTable={onChangeTable}/>
    </section>;
  }
}
