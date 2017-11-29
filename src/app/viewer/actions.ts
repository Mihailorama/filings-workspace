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
import { QueryableTablePage } from '@cfl/table-viewer';
import { Option, TableMetadata } from '@cfl/table-rendering-service';
import { TablePage } from './reducers';

export const TABLES_FETCH = 'TABLES_VIEWER_FETCH';
export const TABLES_RECEIVED = 'TABLES_VIEWER_RECEIVED';
export const TABLES_FAILED = 'TABLES_VIEWER_FAILED';

export const PAGE_FETCH = 'PAGE_VIEWER_FETCH';
export const PAGE_RECEIVED = 'PAGE_VIEWER_RECEIVED';
export const PAGE_FAILED = 'PAGE_VIEWER_FAILED';

export interface FetchTablesAction extends Action {
  filingVersionId: string;
}

export interface ReceivedTablesAction extends Action {
  filingVersionId: string;
  tables: TableMetadata[];
}

export interface FailedTablesAction extends Action {
  filingVersionId: string;
  error: string;
}

export interface FetchPageAction extends Action {
  filingVersionId: string;
  page: TablePage;
}

export interface ReceivedPageAction extends Action {
  filingVersionId: string;
  page: TablePage;
  zOptions: Option[][];
  tableRendering: QueryableTablePage;
}

export interface FailedPageAction extends Action {
  filingVersionId: string;
  page: TablePage;
  error: string;
}

export function fetchTablesAction(filingVersionId: string): FetchTablesAction {
  return {type: TABLES_FETCH, filingVersionId};
}

export function receivedTablesAction(filingVersionId: string, tables: TableMetadata[]): ReceivedTablesAction {
  return {type: TABLES_RECEIVED, filingVersionId, tables};
}

export function failedTablesAction(filingVersionId: string, error: string): FailedTablesAction {
  return {type: TABLES_FAILED, filingVersionId, error};
}

export function fetchPageAction(filingVersionId: string, page: TablePage): FetchPageAction {
  return {type: PAGE_FETCH, filingVersionId, page};
}

export function receivedPageAction(
  filingVersionId: string, page: TablePage, zOptions: Option[][], tableRendering: QueryableTablePage,
): ReceivedPageAction {
  return {type: PAGE_RECEIVED, filingVersionId, page, zOptions, tableRendering};
}

export function failedPageAction(filingVersionId: string, page: TablePage, error: string): FailedPageAction {
  return {type: PAGE_FAILED, filingVersionId, page, error};
}
