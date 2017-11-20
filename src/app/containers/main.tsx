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
import { Switch, Route,  } from 'react-router';
import { Link } from 'react-router-dom';
import UploadContainer from './upload-container';
import { default as StatisticsContainer, RouterProps } from './statistics-container';

function ValidationResultsContainer(props: RouterProps): JSX.Element {
  // Just talks to the validation API for an uploaded filing.
  const {match: {params: {filingVersionId}}} = props;
  return <div>Validation Results for {filingVersionId}</div>;
}

function TablesContainer(props: RouterProps): JSX.Element {
  // Just talks to the validation API for an uploaded filing.
  const {match: {params: {filingVersionId}}} = props;
  return <div>Tables for {filingVersionId}</div>;
}

function WorkspaceContainer(): JSX.Element {
  // Should load list of recent filings etc.
  // Let's hardcode a filing ID for the moment and link directly.
  // All QnD.
  const filingVersionId = '606208e3-10f8-4ada-a753-56e5a27a2f88';
  return (
    <div>
      <h2>Workspace</h2>
      <ul>
      <li><Link to={'/quick-xbrl-validator/filing/' + filingVersionId + '/validation'}>Validation Results</Link></li>
      <li><Link to={'/quick-xbrl-validator/filing/' + filingVersionId + '/tables'}>Tables</Link></li>
      <li><Link to={'/quick-xbrl-validator/filing/' + filingVersionId + '/statistics'}>Statistics</Link></li>
      </ul>
    </div>
  );
}

export default function Main(): JSX.Element {
  const base = '/quick-xbrl-validator';
  return (
    <div>
      <AppBarContainer />
        <Switch>
          <Route path={`${base}/upload`} component={UploadContainer} />
          <Route path={`${base}/filing/:filingVersionId/validation`} component={ValidationResultsContainer} />
          <Route path={`${base}/filing/:filingVersionId/tables`} component={TablesContainer} />
          <Route path={`${base}/filing/:filingVersionId/statistics`} component={StatisticsContainer} />
          <Route path={`${base}/`} component={WorkspaceContainer} />
        </Switch>
    </div>
  );
}
