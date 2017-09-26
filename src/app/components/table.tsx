import * as React from 'react';
import TableViewer, { Pager, ZAxisNavigation } from '@cfl/table-viewer';
import { QueryableTablePage } from '@cfl/table-viewer';
import { Option, TableMetadata } from '@cfl/table-rendering-service';

export interface TableProps {
  metadata: TableMetadata;
  zOptions: Option[][];
  table: QueryableTablePage;
  onChangePage: (x: number, y: number, z: number) => void;
}
export default function Table(props: TableProps): JSX.Element {
  const { metadata, zOptions, table, onChangePage } = props;
  return (
    <div>
      <div style={{height: 100}}>
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
      <div style={{height: 800}}>
        <TableViewer
          data={table}
          onSelect={() => undefined}
          autoWidth
        />
      </div>
    </div>
  );
}
