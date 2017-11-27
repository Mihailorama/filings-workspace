import {
  fetchTablesAction, receivedTablesAction, failedTablesAction,
  fetchPageAction, receivedPageAction, failedPageAction,
} from '../actions';
import { reducer } from '../reducers';
import { State, tablePageKey } from '../../state';
import { exampleState, exampleTableMetadata, exampleZOption, exampleQueryableTablePage } from '../../tests/model-examples';

describe('viewerTablesReducer', () => {
  const initial: State | undefined = reducer(exampleState, {type: '????'});

  it('is initially undefined', () => {
    expect(initial).toBeUndefined();
  });

  it('clears tables when fetching', () => {
    const after: State | undefined = reducer(exampleState, fetchTablesAction('1234'));
    expect(after).toBeDefined();
    expect(after!.tables['1234']).toEqual({loading: true});
  });

  it('stores tables when received', () => {
    const tables = [exampleTableMetadata];
    const after: State | undefined = reducer(exampleState, receivedTablesAction('1234', tables));
    expect(after).toBeDefined();
    expect(after!.tables['1234']).toEqual({loading: false, value: tables});
  });

  it('stores error when failed', () => {
    const after: State | undefined = reducer(exampleState, failedTablesAction('1234', 'Oh no'));
    expect(after).toBeDefined();
    expect(after!.tables['1234']).toEqual({loading: false, error: 'Oh no'});
  });
});

describe('viewerPageReducer', () => {
  const initial: State | undefined = reducer(exampleState, {type: '????'});
  const page = {table: exampleTableMetadata, x: 1, y: 2, z: 3};
  const pageKey = tablePageKey(page);

  it('is initially undefined', () => {
    expect(initial).toBeUndefined();
  });

  it('clears page when fetching', () => {
    const after: State | undefined = reducer(exampleState, fetchPageAction('1234', page));
    expect(after).toBeDefined();
    expect(after!.selectedTablePage['1234']).toEqual(page);
    expect(after!.zOptions[page.table.id]).toEqual([]);
    expect(after!.tableRendering[pageKey]).toEqual({loading: true});
  });

  it('stores page when received', () => {
    const zOptions = [[exampleZOption]];
    const rendering = exampleQueryableTablePage;
    const after: State | undefined = reducer(exampleState, receivedPageAction('1234', page, zOptions, rendering));
    expect(after).toBeDefined();
    expect(after!.zOptions[page.table.id]).toEqual(zOptions);
    expect(after!.tableRendering[pageKey]).toEqual({loading: false, value: rendering});
  });

  it('stores error when failed', () => {
    const after: State | undefined = reducer(exampleState, failedPageAction('1234', page, 'Oh no'));
    expect(after).toBeDefined();
    expect(after!.zOptions[page.table.id]).toBeUndefined();
    expect(after!.tableRendering[pageKey]).toEqual({loading: false, error: 'Oh no'});
  });
});
