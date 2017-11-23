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
import StatisticsContainer from '../statistics/container';
import ValidatorContainer from '../validator/container';
import ViewerContainer from '../viewer/container';
import WorkspaceContainer from '../workspace/container';

const appBaseUri = '/quick-xbrl-validator/';

export default function Main(): JSX.Element {
  return (
    <div>
      <AppBarContainer />
      <Switch>
        <Route path={`${appBaseUri}filing-version/:filingVersionId/validator`} component={ValidatorContainer} />
        <Route path={`${appBaseUri}filing-version/:filingVersionId/viewer`} component={ViewerContainer} />
        <Route path={`${appBaseUri}filing-version/:filingVersionId/statistics`} component={StatisticsContainer} />
        <Route path={`${appBaseUri}`} component={WorkspaceContainer} />
      </Switch>
    </div>
  );
}
