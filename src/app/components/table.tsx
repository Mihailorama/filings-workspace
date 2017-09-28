import * as React from 'react';
import TableViewer, { Pager, ZAxisNavigation } from '@cfl/table-viewer';
import { QueryableTablePage } from '@cfl/table-viewer';
import { Option, TableMetadata } from '@cfl/table-rendering-service';

import './table.less';

export interface TableProps {
  tables: TableMetadata[];
  metadata: TableMetadata;
  zOptions: Option[][];
  table: QueryableTablePage;
  onChangePage: (x: number, y: number, z: number) => void;
}
export default function Table(props: TableProps): JSX.Element {
  const { tables, metadata, zOptions, table, onChangePage } = props;
  return (
    <div className={'ckr-TableHolder'}>
      <div style={{height: 100}}>
        <select>
          {tables.map(t => <option>{t.name}</option>)}
        </select>
        <ZAxisNavigation
          breakdowns={metadata.z.breakdowns}
          options={zOptions}
          selected={table.zHeaders}
          onSelect={z => onChangePage(table.x, table.y, z)}
        />

        {table.hasMultiplePages && <Pager
          pages={table.pageCoordinates}
          x={table.x}
          y={table.y}
          onSelect={(x, y) => onChangePage(x, y, table.z)}
        />}
      </div>
      <div className={'ckr-TableHolder-table'}>
        <TableViewer
          data={table}
          onSelect={() => undefined}
          autoWidth
        />
      </div>
    </div>
  );
}
