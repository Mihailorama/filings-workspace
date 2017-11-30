import { call, put, all } from 'redux-saga/effects';

import QueryableTablePageImpl, { TABLE_WINDOW_HEIGHT } from '../models/queryable-table-page-impl';
import {
  fetchTablesAction, receivedTablesAction, failedTablesAction,
  fetchPageAction, receivedPageAction, failedPageAction,
} from '../actions';
import { fetchTablesSaga, fetchPageSaga } from '../sagas';
import { filingVersionsApi, tablesApi } from '../../urls';
import { exampleTableMetadata, exampleZOption, exampleTableChunk } from '../../tests/model-examples';

describe('fetchTablesSaga', () => {
  const filingVersionId = '1234';

  it('dispatches RECEIVED if all goes well', () => {
    const filingName = 'Example filing.zip';
    const saga = fetchTablesSaga(fetchTablesAction(filingVersionId));

    expect(saga.next().value).toEqual(
      call([filingVersionsApi, filingVersionsApi.getTables], {filingVersionId}));
    const tableMetadatas = [exampleTableMetadata, {...exampleTableMetadata, id: 'bar', empty: true}, {...exampleTableMetadata, id: 'baz'}];
    expect(saga.next(tableMetadatas).value).toEqual(
      put(receivedTablesAction(
        filingVersionId, filingName, [tableMetadatas[0], tableMetadatas[2]])));  // Omitting the empty table (INV-171).
    expect(saga.next().value).toEqual(
      put(fetchPageAction(filingVersionId, {table: tableMetadatas[0], x: 0, y: 0, z: 0})));
  });

  it('dispatches FAILED if call to service fails', () => {
    const saga = fetchTablesSaga(fetchTablesAction(filingVersionId));

    saga.next();  // First step as above.
    expect(saga.throw && saga.throw(new Error('LOLWAT')).value).toEqual(put(
      failedTablesAction(filingVersionId, jasmine.stringMatching(/LOLWAT/) as any)));
  });
});

describe('fetchPageSaga', () => {
  const filingVersionId = '1234';
  const page = {table: exampleTableMetadata, x: 1, y: 2, z: 3};

  it('dispatches RECEIVED if all goes well', () => {
    const saga = fetchPageSaga(fetchPageAction(filingVersionId, page));
    const expectedWidth = page.table.x.sliceCount > 0 && page.table.x.depth > 0 ? page.table.x.sliceCount : 1;
    const expectedWindow = {x: page.x, y: page.y, z: page.z, width: expectedWidth, height: TABLE_WINDOW_HEIGHT};

    expect(saga.next().value).toEqual(all([
      call([tablesApi, tablesApi.getTableZOptions], {tableId: page.table.id, z: 0}),
      call([tablesApi, tablesApi.renderTable], {tableId: page.table.id, ...expectedWindow}),
    ]));
    expect(saga.next([[[exampleZOption]], exampleTableChunk]).value).toEqual(put(
      receivedPageAction(filingVersionId, page, [[exampleZOption]], new QueryableTablePageImpl(page.table, exampleTableChunk))));
  });

  it('dispatches FAILED if call to service fails', () => {
    const saga = fetchPageSaga(fetchPageAction(filingVersionId, page));

    saga.next();  // First step as above.
    expect(saga.throw && saga.throw(new Error('LOLWAT')).value).toEqual(put(
      failedPageAction(filingVersionId, page, jasmine.stringMatching(/LOLWAT/) as any)));
  });
});
