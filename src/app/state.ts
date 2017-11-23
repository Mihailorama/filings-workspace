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

/**
 * State of the app as a whole.
 */

import { User, App, Profile, ValidationStatus } from './models';
import { Statistic } from '@cfl/filing-statistics-service';
import { QueryableTablePage } from '@cfl/table-viewer';
import { Option, TableMetadata } from '@cfl/table-rendering-service';

export interface Item<T> {
  loading: boolean;
  error?: string;
  value?: T;
}

export interface UploadStatus {
  uploading: boolean;
  error?: string;
}

export interface TablePage {
  table: TableMetadata;
  x: number;
  y: number;
  z: number;
}

export interface WorkspaceAppSpec {
  name: string;
  urlTemplate: string;
  useFilingList?: boolean;
  external?: boolean;
}

export interface WorkspaceFiling {
  id: string;
  name: string;
}

export function tablePageKey(page: TablePage): string {
  const { table: {id}, x, y, z } = page;
  return `${id}(${x},${y},${z})`;
};

export interface State {
  apps: Item<App[]>;
  profiles: Item<Profile[]>;
  user: Item<User>;

  // App that was clicked on
  app?: WorkspaceAppSpec;

  // UI state tracking an in-progress upload.
  upload?: UploadStatus;
  // The recent filings.
  recentFilings: Item<WorkspaceFiling[]>;

  // The various details we can display for a filing
  status: {[filingVersionId: string]: Item<ValidationStatus>};
  statistics: {[filingVersionId: string]: Item<Statistic[]> | undefined};
  tables: {[filingVersionId: string]: Item<TableMetadata[]>};
  // UI state tracking the selected table
  selectedTablePage: {[filingVersionId: string]: TablePage | undefined};

  // UI state tracking the table rendering options.
  zOptions: {[tableId: string]: Option[][] | undefined};

  // Per-table rendering details.  Does this vary with z-options?
  tableRendering: {[tablePageKey: string]: Item<QueryableTablePage>};

}
