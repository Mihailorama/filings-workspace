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
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Viewer from './viewer';
import QueryableTablePageImpl from './models/queryable-table-page-impl';

const { tables, zOptions, tableChunk } = (require('../../stories/table-a.json'));
const table = new QueryableTablePageImpl(tables[0], tableChunk);

storiesOf('Viewer', module)
  .add('Loading tables', () => {
    return (
      <Viewer
        tables={{loading: true}}
        onChangePage={action('onChangePage') as any}
        onChangeTable={action('onChangeTable') as any}
      />
    );
  })
  .add('Full', () => {
    return (
      <Viewer
        name='Example filing.zip'
        tables={{loading: false, value: tables}}
        selectedTable={tables[0]}
        zOptions={zOptions}
        table={{loading: false, value: table}}
        onChangePage={action('onChangePage') as any}
        onChangeTable={action('onChangeTable') as any}
      />
    );
  })
  .add('Loading table', () => {
    return (
      <Viewer
        tables={{loading: false, value: tables}}
        selectedTable={tables[0]}
        zOptions={zOptions}
        table={{loading: true}}
        onChangePage={action('onChangePage') as any}
        onChangeTable={action('onChangeTable') as any}
      />
    );
  })
  .add('No tables', () => {
    return (
      <Viewer
        name='Example filing.zip'
        tables={{loading: false, value: []}}
        onChangePage={action('onChangePage') as any}
        onChangeTable={action('onChangeTable') as any}
      />
    );
  })
  .add('Error (no tables)', () => {
    return (
      <Viewer
        tables={{loading: false, error: 'Something went wrong'}}
        onChangePage={action('onChangePage') as any}
        onChangeTable={action('onChangeTable') as any}
      />
    );
  })
  .add('Error (with tables)', () => {
    return (
      <Viewer
        tables={{loading: false, value: tables}}
        selectedTable={tables[0]}
        zOptions={zOptions}
        table={{loading: false, error: 'Something went wrong'}}
        onChangePage={action('onChangePage') as any}
        onChangeTable={action('onChangeTable') as any}
      />
    );
  });
