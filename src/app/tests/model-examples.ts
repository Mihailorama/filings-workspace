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

import { User, App, TableRenderingWindow } from '../models';
import { Category, Profile, Filing, FilingVersion } from '@cfl/document-service';
import { Statistic } from '@cfl/filing-statistics-service';
import { QueryableTablePage } from '@cfl/table-viewer';
import { Breakdown, Option, TableHeader, TableMetadata, TableChunk } from '@cfl/table-rendering-service';
import { FilingVersionSummary } from '@cfl/validation-service';

import { State } from '../state';
import { ViewerState, TablePage } from '../viewer/reducers';
import { AppBarState } from '../corefiling/reducers';
import { ValidatorState } from '../validator/reducers';
import { WorkspaceState, WorkspaceFiling } from '../workspace/reducers';
import { StatisticsState } from '../statistics/reducers';

export const exampleUser: User = {
  sub: 'ecdc0363-976d-4a42-a4cc-ae5d63f3a806',
  name: 'Akira Knutson',
  preferred_username: 'at',
  email: 'at@example.com',
};

export const exampleApps: App[] = [
  {id: 'beacon', name: 'Beacon', href: '/beacon/', colour: '#3c7c34', iconHref: '/img/logo-beacon.svg', features: []},
  {id: 'account', name: 'Manage account', href: '/auth/account', colour: '#3A75C4', features: []},
  {id: 'sms', name: 'Manage organisation', href: '/sms/', colour: '#3A75C4', features: []},
];

export const exampleCategory: Category = {
  name: 'validation',
  profiles: [
    {
      id: 'cab5627a-0afa-434c-9891-cd7e37927ee5',
      category: 'validation',
      name: 'SII 2.0.1',
      description: 'Validation profile for Solvency II 2.0.1 instances. XIIF and TNEFRVM SII EIOPA enabled.',
    },
    {
      id: '24b17ed4-0d2b-4e0c-83a2-c1d72e67aa64',
      category: 'validation',
      name: 'FRC 2.1.0,  UK 2009-09 - 01 & HMRC DPL 2013-10 - 01',
    },
  ],
};

export const exampleFiling: Filing = {
  id: '8723b794-3261-4cd3-b946-b683c19fb99c',
  type: 'Filing',
  name: 'report.xbrl',
  versions: [
    {
      id: 'f09be954-1895-4954-b333-6c9c89b833f1',
      type: 'FilingVersionSummary',
      created: new Date('2017-09-12T10:09:49.915Z'),
      creator: {
        id: '4b7fe222-0d6e-4ae1-977d-c4eb047c2fbc',
        name: 'Gurdeep Tash',
        // https://www.behindthename.com/random/random.php?number=1&gender=u&surname=&randomsurname=yes&norare=yes&nodiminutives=yes&all=yes
      },
      status: 'RUNNING',
    },
  ],
};

export const exampleFilingVersion: FilingVersion = {
  id: 'f09be954-1895-4954-b333-6c9c89b833f1',
  type: 'FilingVersion',
  created: new Date('2017-09-12T10:09:49.915Z'),
  creator:  {
    id: '4b7fe222-0d6e-4ae1-977d-c4eb047c2fbc',
    name: 'Gurdeep Tash',
  },
  status: 'DONE',
  documents: [
    {
      category: 'validation',
      created: new Date('2017-09-12T10:09:50.875Z'),
      creation: {status: 'DONE'},
      id: '081c4d35-7c12-40e9-b3a5-df3eb8ddc214',
      profile: 'SII 2.0.1',
    },
    {
      category: 'unknown',
      created: new Date('2017-09-12T10:09:49.915Z'),
      id: 'd18a0433-8f5d-44d3-821b-3b505df37d63',
      profile: 'default',
    },
  ],
  filing: {
    type: 'FilingSummary',
    id: '8723b794-3261-4cd3-b946-b683c19fb99c',
    name: 'report.xbrl',
  },
};

export const exampleValidationServiceFilingVersionSummary: FilingVersionSummary = {
  id: exampleFilingVersion.id,
  severity: 'OK',
};

export const exampleZOption: Option = {
  headers: [],
  z: 1,
};

export const exampleBreakdown: Breakdown = {
  depth: 1,
  name: 'exampleBreakdown',
};

export const exampleTableHeader: TableHeader = {
  breakdowns: [exampleBreakdown],
  depth: 1,
  sliceCount: 1,
};

export const exampleTableMetadata: TableMetadata = {
  id: 'foo',
  name: 'Foo',
  x: exampleTableHeader,
  y: exampleTableHeader,
  z: exampleTableHeader,
  empty: false,
};

export const exampleTableChunk: TableChunk = {
  data: [[]],
  x: 1,
  y: 1,
  z: 1,
  xAxis: [],
  yAxis: [],
  zAxis: [],
};

// So far just used in equality checks.
export const exampleQueryableTablePage: QueryableTablePage = {
} as any;

export const exampleTableRenderingWindow: TableRenderingWindow = {
  height: 1,
  width: 1,
  x: 1,
  y: 1,
  z: 1,
};

export const exampleRecentFilings: WorkspaceFiling[] = [
  {
    id: 'f09be954-1895-4954-b333-6c9c89b833f1',
    name: 'Filing 1',
    date: new Date('2017-01-01'),
  },
  {
    id: 'f09be954-1895-4954-b333-6c9c89b833f2',
    name: 'Filing 2',
    date: new Date('2017-01-02'),
  },
];

export const exampleProfiles: Profile[] = [
  {
    id: '1',
    name: 'Profile 1',
    category: 'validation',
  },
];

export const exampleStatistics: Statistic[] = [
  {
    name: 'Fact count',
    label: 'Fact count',
    value: 123,
    format: 'integer',
  },
];

export const exampleTablePage: TablePage = {
  table: exampleTableMetadata,
  x: 0,
  y: 0,
  z: 0,
};

export const exampleViewerState: ViewerState = {
  names: {'f09be954-1895-4954-b333-6c9c89b833f1': 'Example filing.zip'},
  tables: {'f09be954-1895-4954-b333-6c9c89b833f1': {loading: false, value: [exampleTableMetadata]}},
  selectedTablePage: {'f09be954-1895-4954-b333-6c9c89b833f1': exampleTablePage},
  zOptions: {'f09be954-1895-4954-b333-6c9c89b833f1': [[exampleZOption]]},
  tableRendering: {'foo(0,0,0)': {loading: false, value: exampleQueryableTablePage}},
};

export const exampleAppBarState: AppBarState = {
  user: {loading: false, value: exampleUser},
};

export const exampleWorkspaceState: WorkspaceState = {
  profiles: {loading: false, value: exampleProfiles},
  recentFilings: {loading: false, value: exampleRecentFilings},
  search: { searchPerformed: false, text: '', filings: { loading: false } },
  mode: 'user',
};

export const exampleValidatorState: ValidatorState = {
  names: {'f09be954-1895-4954-b333-6c9c89b833f1': 'Example Filing.zip'},
  status: {'f09be954-1895-4954-b333-6c9c89b833f1': {loading: false, value: 'OK'}},
};

export const exampleStatisticsState: StatisticsState = {
  names: {'f09be954-1895-4954-b333-6c9c89b833f1': 'Example Filing.zip'},
  statistics: {'f09be954-1895-4954-b333-6c9c89b833f1': {loading: false, value: exampleStatistics}},
};

export const exampleState: State = {
  appBar: exampleAppBarState,
  benfords: undefined!,
  oimConverter: undefined!,
  router: undefined!,
  statistics: exampleStatisticsState,
  validator: exampleValidatorState,
  viewer: exampleViewerState,
  workspace: exampleWorkspaceState,
};
