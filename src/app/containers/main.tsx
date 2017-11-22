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
import StatisticsContainer from '../statistics/container';
import ValidatorContainer from '../validator/container';
import ViewerContainer from '../viewer/container';

const appBaseUri = '/quick-xbrl-validator/';

function WorkspaceContainer(): JSX.Element {
  // Let's hardcode a filing ID for the moment and link directly.
  const filingVersionId = '606208e3-10f8-4ada-a753-56e5a27a2f88';
  return (
    <div>
      <h2>Workspace</h2>
      <ul>
        <li><Link to='/benfords-report-analyser/'>Benford's Report Analyser</Link></li>
        <li><Link to='/taxonomy-packager/'>Taxonomy Packager</Link></li>
        <li><Link to='/xbrl-document-change-report/'>XBRL Document Change Report</Link></li>
        <li><Link to={`${appBaseUri}filing-version/${filingVersionId}/validator`}>Quick XBRL Validator</Link></li>
        <li><Link to={`${appBaseUri}filing-version/${filingVersionId}/viewer`}>Quick Viewer</Link></li>
        <li><Link to={`${appBaseUri}filing-version/${filingVersionId}/statistics`}>Filing Statistics</Link></li>
        <li><Link to={`/api/document-service/filing-version/${filingVersionId}/some-oim-please`}>OIM/JSON Converter</Link></li>
      </ul>
    </div>
  );
}

export default function Main(): JSX.Element {
  return (
    <div>
      <AppBarContainer />
        <Switch>
          <Route path={`${appBaseUri}upload`} component={UploadContainer} />
          <Route path={`${appBaseUri}filing-version/:filingVersionId/validator`} component={ValidatorContainer} />
          <Route path={`${appBaseUri}filing-version/:filingVersionId/viewer`} component={ViewerContainer} />
          <Route path={`${appBaseUri}filing-version/:filingVersionId/statistics`} component={StatisticsContainer} />
          <Route path={`${appBaseUri}`} component={WorkspaceContainer} />
        </Switch>
    </div>
  );
}
