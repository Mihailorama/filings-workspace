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
import { Switch, Route, RouteComponentProps } from 'react-router';
import StatisticsContainer from '../statistics/container';
import ValidatorContainer from '../validator/container';
import ViewerContainer from '../viewer/container';
import WorkspaceContainer from '../workspace/container';
import BenfordsAnalyserContainer from '../benford/benfords-analysis-container';
import { WORKSPACE_APPS } from '../workspace/workspace-apps';

import './main.less';
import { WorkspaceAppSpec } from '../workspace/reducers';

export const appBaseUri = '/filings-workspace/';

function workspaceContainerForApp(app: WorkspaceAppSpec): (props: RouteComponentProps<any>) => JSX.Element {
  return props => <WorkspaceContainer {... props} app={app} />;
}

export default function Main(): JSX.Element {
  return (
    <div className='app-Main'>
      <Switch>
        <Route path={`${appBaseUri}:app/filing-versions/:filingVersionId`} component={AppBarContainer} />
        <Route path={`${appBaseUri}:app?`} component={AppBarContainer} />
      </Switch>
      <Switch>
        <Route path={`${appBaseUri}benfords-analyser-report/filing-versions/:filingVersionId`} component={BenfordsAnalyserContainer} />
        <Route path={`${appBaseUri}benfords-analyser-report`} render={workspaceContainerForApp(WORKSPACE_APPS.benford)} />

        <Route path={`${appBaseUri}validator/filing-versions/:filingVersionId`} component={ValidatorContainer} />
        <Route path={`${appBaseUri}validator`} render={workspaceContainerForApp(WORKSPACE_APPS.validator)} />

        <Route path={`${appBaseUri}statistics/filing-versions/:filingVersionId`} component={StatisticsContainer} />
        <Route path={`${appBaseUri}statistics`} render={workspaceContainerForApp(WORKSPACE_APPS.statistics)} />

        <Route path={`${appBaseUri}viewer/filing-versions/:filingVersionId`} component={ViewerContainer} />
        <Route path={`${appBaseUri}viewer`} render={workspaceContainerForApp(WORKSPACE_APPS.viewer)} />

        <Route path={`${appBaseUri}oimConverter`} render={workspaceContainerForApp(WORKSPACE_APPS.oimConverter)} />

        <Route path={`${appBaseUri}`} component={WorkspaceContainer} />
      </Switch>
    </div>
  );
}
