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
import { State, tablePageKey } from '../state';

export function reducer(state: State | undefined, action: Action): State | undefined {
  if (!state) {
    return undefined;
  }
  switch (action.type) {
    case TABLES_FETCH: {
      const { filingVersionId } = action as FetchTablesAction;
      return { ...state,
        tables: { ... state.tables, [filingVersionId]: {loading: true} },
      };
    }
    case TABLES_RECEIVED: {
      const { filingVersionId, tables } = action as ReceivedTablesAction;
      return { ...state,
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
      return undefined;
  }
}
