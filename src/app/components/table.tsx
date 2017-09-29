import * as classNames from 'classnames';
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
  onChangeTable: (table: TableMetadata) => void;
}
export default function Table(props: TableProps): JSX.Element {
  const { tables, metadata, zOptions, table, onChangePage, onChangeTable } = props;
  const withTableSelect = tables.length > 1;
  const withZOptions = zOptions.length > 1;
  return (
    <div className={'ckr-Table'}>
      {withTableSelect &&
        <select onChange={e => onChangeTable(tables[+e.currentTarget.value])} className='ckr-Table-tableSelect'>
          {tables.map((t, i) => <option key={t.id} value={i}>{t.name}</option>)}
        </select>
      }
      {withZOptions && <div className='ckr-Table-nav'>
        <ZAxisNavigation
          breakdowns={metadata.z.breakdowns}
          options={zOptions}
          selected={table.zHeaders}
          onSelect={z => onChangePage(table.x, table.y, z)}
        />
      </div>}
      {table.hasMultiplePages && <div className='ckr-Table-pager'>
        <Pager
          pages={table.pageCoordinates}
          x={table.x}
          y={table.y}
          onSelect={(x, y) => onChangePage(x, y, table.z)}
        />
      </div>}
      <div className={classNames('ckr-Table-table', {
        'ckr-Table-withTableSelect': withTableSelect,
        'ckr-Table-withZOptions': withZOptions,
        'ckr-Table-withPager': table.hasMultiplePages,
      })}>
        <TableViewer
          data={table}
          onSelect={() => undefined}
          autoWidth
        />
      </div>
    </div>
  );
}
