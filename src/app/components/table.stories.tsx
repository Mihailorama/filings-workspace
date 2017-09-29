import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { lShapedTableWithMetadata } from '@cfl/table-viewer/lib/test-utils/l-shaped-headers';

import Table from './table';

storiesOf('Table', module)
  .add('Single page', () => {
    const { table, metadata, zOptions} = lShapedTableWithMetadata();

    return (
      <Table
        tables={[metadata, {name: 'Better table'} as any]}
        metadata={metadata}
        zOptions={zOptions}
        table={table}
        onChangePage={action('onChangePage')}
        onChangeTable={action('onChangeTable')}
      />
    );
  });
