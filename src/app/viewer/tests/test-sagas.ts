import { call, put, all } from 'redux-saga/effects';

import QueryableTablePageImpl, { TABLE_WINDOW_HEIGHT } from '../models/queryable-table-page-impl';
import {
  fetchTablesAction, receivedTablesAction, failedTablesAction,
  fetchPageAction, receivedPageAction, failedPageAction,
} from '../actions';
import { fetchTablesSaga, fetchPageSaga } from '../sagas';
import { apiFetchJson } from '../../api-fetch';
import { tableRenderingServiceTables, tableRenderingServiceZOptions, tableRenderingServiceRender } from '../../urls';
import { exampleTableMetadata, exampleZOption, exampleTableChunk } from '../../tests/model-examples';

describe('fetchTablesSaga', () => {
  const filingVersionId = '1234';

  it('dispatches RECEIVED if all goes well', () => {
    const saga = fetchTablesSaga(fetchTablesAction(filingVersionId));

    expect(saga.next().value).toEqual(call(apiFetchJson, tableRenderingServiceTables(filingVersionId)));
    expect(saga.next([exampleTableMetadata]).value).toEqual(put(
      receivedTablesAction(filingVersionId, [exampleTableMetadata])));
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
      call(apiFetchJson, tableRenderingServiceZOptions(page.table.id, 0)),
      call(apiFetchJson, tableRenderingServiceRender(page.table.id, expectedWindow)),
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
