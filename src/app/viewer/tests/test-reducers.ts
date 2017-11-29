import {
  fetchTablesAction, receivedTablesAction, failedTablesAction,
  fetchPageAction, receivedPageAction, failedPageAction,
} from '../actions';
import { reducer, ViewerState, tablePageKey } from '../reducers';
import { exampleViewerState, exampleTableMetadata, exampleZOption, exampleQueryableTablePage } from '../../tests/model-examples';

describe('viewerTablesReducer', () => {
  const initial: ViewerState | undefined = reducer(exampleViewerState, {type: '????'});

  it('is initially undefined', () => {
    expect(initial).toBeUndefined();
  });

  it('clears tables when fetching', () => {
    const after: ViewerState | undefined = reducer(exampleViewerState, fetchTablesAction('1234'));
    expect(after).toBeDefined();
    expect(after!.tables['1234']).toEqual({loading: true});
  });

  it('stores tables when received', () => {
    const tables = [exampleTableMetadata];
    const after: ViewerState | undefined = reducer(exampleViewerState, receivedTablesAction('1234', tables));
    expect(after).toBeDefined();
    expect(after!.tables['1234']).toEqual({loading: false, value: tables});
  });

  it('stores error when failed', () => {
    const after: ViewerState | undefined = reducer(exampleViewerState, failedTablesAction('1234', 'Oh no'));
    expect(after).toBeDefined();
    expect(after!.tables['1234']).toEqual({loading: false, error: 'Oh no'});
  });
});

describe('viewerPageReducer', () => {
  const initial: ViewerState | undefined = reducer(exampleViewerState, {type: '????'});
  const page = {table: exampleTableMetadata, x: 1, y: 2, z: 3};
  const pageKey = tablePageKey(page);

  it('is initially undefined', () => {
    expect(initial).toBeUndefined();
  });

  it('clears page when fetching', () => {
    const after: ViewerState | undefined = reducer(exampleViewerState, fetchPageAction('1234', page));
    expect(after).toBeDefined();
    expect(after!.selectedTablePage['1234']).toEqual(page);
    expect(after!.zOptions[page.table.id]).toEqual([]);
    expect(after!.tableRendering[pageKey]).toEqual({loading: true});
  });

  it('stores page when received', () => {
    const zOptions = [[exampleZOption]];
    const rendering = exampleQueryableTablePage;
    const after: ViewerState | undefined = reducer(exampleViewerState, receivedPageAction('1234', page, zOptions, rendering));
    expect(after).toBeDefined();
    expect(after!.zOptions[page.table.id]).toEqual(zOptions);
    expect(after!.tableRendering[pageKey]).toEqual({loading: false, value: rendering});
  });

  it('stores error when failed', () => {
    const after: ViewerState | undefined = reducer(exampleViewerState, failedPageAction('1234', page, 'Oh no'));
    expect(after).toBeDefined();
    expect(after!.zOptions[page.table.id]).toBeUndefined();
    expect(after!.tableRendering[pageKey]).toEqual({loading: false, error: 'Oh no'});
  });
});
