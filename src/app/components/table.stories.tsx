import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Table from './table';
import { action } from '@storybook/addon-actions';
import { basicTableWithMetadata } from '@cfl/table-viewer/lib/test-utils';

storiesOf('Table', module)
  .add('Single page', () => {
    const { table, metadata, zOptions } = basicTableWithMetadata();

    return (
      <Table
        metadata={metadata}
        zOptions={zOptions}
        table={table}
        onChangePage={action('onChangePage')}
      />
    );
  });
