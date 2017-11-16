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

import * as React from 'react';
import AppBarContainer from '../corefiling/app-bar-container';
import { Switch, Route } from 'react-router';
import UploadContainer from './upload-container';

function ValidationResultsContainer(): JSX.Element {
  return <div>Validation Results</div>;
}

function TablesContainer(): JSX.Element {
  return <div>Tables</div>;
}

function StatisticsContainer(): JSX.Element {
  return <div>Statistics</div>;
}

function WorkspaceContainer(): JSX.Element {
  return <div>Workspace</div>;
}

export default function Main(): JSX.Element {
  const base = '/quick-xbrl-validator';
  return (
    <div>
      <AppBarContainer />
        <Switch>
          <Route path={`${base}/upload`} component={UploadContainer} />
          <Route path={`${base}/filing/:id/validation`} component={ValidationResultsContainer} />
          <Route path={`${base}/filing/:id/tables`} component={TablesContainer} />
          <Route path={`${base}/filing/:id/statistics`} component={StatisticsContainer} />
          <Route path={`${base}/`} component={WorkspaceContainer} />
        </Switch>
    </div>
  );
}
