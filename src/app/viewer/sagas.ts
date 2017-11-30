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

import { Effect } from 'redux-saga';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { FilingVersion } from '@cfl/document-service';
import { TableMetadata } from '@cfl/table-rendering-service';

import {
  FetchTablesAction, FetchPageAction, TABLES_FETCH, PAGE_FETCH,
  receivedTablesAction, fetchPageAction, failedTablesAction, failedPageAction, receivedPageAction,
} from './actions';
import QueryableTablePageImpl, { TABLE_WINDOW_HEIGHT } from './models//queryable-table-page-impl';
import { filingVersionsApi, tablesApi, filingsApi } from '../urls';

export function* fetchTablesSaga(action: FetchTablesAction): IterableIterator<Effect> {
  const { filingVersionId } = action;
  try {
    const [tablesWithEmpties, filingVersion]: [TableMetadata[], FilingVersion] = yield all([
      call([filingVersionsApi, filingVersionsApi.getTables], {filingVersionId}),
      call([filingsApi, filingsApi.getFilingVersion], {filingVersionId}),
    ]);
    const tables = tablesWithEmpties.filter(x => !x.empty);
    yield put(receivedTablesAction(filingVersionId, filingVersion.filing.name, tables));
    yield put(fetchPageAction(filingVersionId, {table: tables[0], x: 0, y: 0, z: 0}));
  } catch (res) {
    yield put(failedTablesAction(filingVersionId, res.message || res.statusText || `Status: ${res.status}`));
  }
}

export function* fetchPageSaga(action: FetchPageAction): IterableIterator<Effect> {
  const { filingVersionId, page } = action;
  const { table, x, y, z } = page;
  try {
    const width = table.x.sliceCount > 0 && table.x.depth > 0 ? table.x.sliceCount : 1;
    const window = {x, y, z, width, height: TABLE_WINDOW_HEIGHT};

    const [ zOptions, tableRendering ] = yield all([
      call([tablesApi, tablesApi.getTableZOptions], {tableId: table.id, z: 0}),
      call([tablesApi, tablesApi.renderTable], {tableId: table.id, ...window}),

    ]);
    yield put(receivedPageAction(filingVersionId, page, zOptions, new QueryableTablePageImpl(table, tableRendering)));
  } catch (res) {
    yield put(failedPageAction(filingVersionId, page, res.message || res.statusText || `Status: ${res.status}`));
  }
}

export function* saga(): IterableIterator<Effect> {
  yield all([
    takeEvery(TABLES_FETCH, fetchTablesSaga),
    takeEvery(PAGE_FETCH, fetchPageSaga),
  ]);
}
