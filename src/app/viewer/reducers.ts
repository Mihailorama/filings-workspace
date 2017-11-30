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

import { Action } from 'redux';

import {
  TABLES_FETCH, TABLES_RECEIVED, TABLES_FAILED, PAGE_FETCH, PAGE_RECEIVED, PAGE_FAILED,
  FetchTablesAction, ReceivedTablesAction, FailedTablesAction, FetchPageAction, ReceivedPageAction, FailedPageAction,
} from './actions';
import { QueryableTablePage } from '@cfl/table-viewer';
import { Option, TableMetadata } from '@cfl/table-rendering-service';
import { Item } from '../state';

export interface TablePage {
  table: TableMetadata;
  x: number;
  y: number;
  z: number;
}

export interface ViewerState {
  // The filing name for a filing
  names: {[filingVersionId: string]: string | undefined};

  // The various details we can display for a filing
  tables: {[filingVersionId: string]: Item<TableMetadata[]>};
  // UI state tracking the selected table
  selectedTablePage: {[filingVersionId: string]: TablePage | undefined};

  // UI state tracking the table rendering options.
  zOptions: {[tableId: string]: Option[][] | undefined};

  // Per-table rendering details.  Does this vary with z-options?
  tableRendering: {[tablePageKey: string]: Item<QueryableTablePage>};
}

export function tablePageKey(page: TablePage): string {
  const { table: {id}, x, y, z } = page;
  return `${id}(${x},${y},${z})`;
};

export function reducer(state: ViewerState | undefined, action: Action): ViewerState {
  if (!state) {
    return {
      names: {},
      selectedTablePage: {},
      tableRendering: {},
      tables: {},
      zOptions: {},
    };
  }
  switch (action.type) {
    case TABLES_FETCH: {
      const { filingVersionId } = action as FetchTablesAction;
      return { ...state,
        tables: { ... state.tables, [filingVersionId]: {loading: true} },
      };
    }
    case TABLES_RECEIVED: {
      const { filingVersionId, filingName, tables } = action as ReceivedTablesAction;
      return { ...state,
        names: { ... state.names, [filingVersionId]: filingName },
        tables: { ... state.tables, [filingVersionId]: {loading: false, value: tables} },
      };
    }
    case TABLES_FAILED: {
      const { filingVersionId, error } = action as FailedTablesAction;
      return { ...state,
        tables: { ... state.tables, [filingVersionId]: {loading: false, error} },
      };
    }
    case PAGE_FETCH: {
      const { filingVersionId, page } = action as FetchPageAction;
      return { ...state,
        selectedTablePage: { ... state.selectedTablePage, [filingVersionId]: page },
        zOptions: {... state.zOptions, [page.table.id]: []},
        tableRendering: { ... state.tableRendering, [tablePageKey(page)]: {loading: true} },
      };
    }
    case PAGE_RECEIVED: {
      const { page, tableRendering, zOptions } = action as ReceivedPageAction;
      return { ...state,
        zOptions: {... state.zOptions, [page.table.id]: zOptions},
        tableRendering: { ... state.tableRendering, [tablePageKey(page)]: {loading: false, value: tableRendering} },
      };
    }
    case PAGE_FAILED: {
      const { page, error } = action as FailedPageAction;
      return { ...state,
        zOptions: { ... state.zOptions, [page.table.id]: undefined },
        tableRendering: { ... state.tableRendering, [tablePageKey(page)]: {loading: false, error} },
      };
    }
    default:
      return state;
  }
}
