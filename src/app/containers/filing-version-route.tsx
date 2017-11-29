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

import { RouteComponentProps } from 'react-router-dom';
import { WORKSPACE_APPS } from '../workspace/workspace-apps';
import { WorkspaceAppSpec } from '../workspace/reducers';

export type AppRouterProps = RouteComponentProps<{app?: string}>;
export type FilingRouterProps = RouteComponentProps<{filingVersionId: string}>;

export function app(props: AppRouterProps): WorkspaceAppSpec | undefined {
  const appId = props.match.params.app;
  return appId ? WORKSPACE_APPS[appId] : undefined;
}

export function filingVersionId(props: FilingRouterProps): string {
  return props.match.params.filingVersionId;
}
