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
import { WorkspaceAppSpec } from '../state';

const appBaseUri = '/quick-xbrl-validator/';

const apps: {[key: string]: WorkspaceAppSpec} = {
  validator: {
    name: 'Quick XBRL Validator', useFilingList: true,
    urlTemplate: `${appBaseUri}filing-version/{id}/validator`,
  },
  viewer: {
    name: 'Quick Viewer', useFilingList: true,
    urlTemplate: `${appBaseUri}filing-version/{id}/viewer`,
  },
  statistics: {
    name: 'Filing Statistics', useFilingList: true,
    urlTemplate: `${appBaseUri}filing-version/{id}/statistics`,
  },
  benford: {
    name: 'Benford\'s Analyser', external: true, useFilingList: true,
    urlTemplate: '/benfords-analyser/filing-version/{id}/analyse',
  },
  changeReport: {
    name: 'XBRL Document Change Report', external: true,
    urlTemplate: '/xbrl-document-change-report/',
  },
  taxonomyInfo: {
    name: 'Quick Taxonomy Info', external: true,
    urlTemplate: '/quick-taxonomy-info/',
  },
  taxonomyPackager: {
    name: 'Taxonomy Packager', external: true,
    urlTemplate: '/taxonomy-packager/',
  },
  oimConverter: {
    name: 'OIM/JSON Converter', external: true,
    urlTemplate: '/api/document-service/filing-version/{id}/some-oim-please',
  },
};

function WorkspaceAppTile(props: {app: WorkspaceAppSpec, onClick: (app: WorkspaceAppSpec) => void}): JSX.Element {
  return <div>
    <a onClick={() => props.onClick(props.app)}>{props.app.name}</a>
  </div>;
}

export default function WorkspaceApps(props: {onAppClick: (app: WorkspaceAppSpec) => void}): JSX.Element {
  return <div>
    <h2>Workspace</h2>
    <WorkspaceAppTile app={apps.validator} onClick={props.onAppClick} />
    <WorkspaceAppTile app={apps.viewer} onClick={props.onAppClick} />
    <WorkspaceAppTile app={apps.statistics} onClick={props.onAppClick} />
    <WorkspaceAppTile app={apps.benford} onClick={props.onAppClick} />
    <WorkspaceAppTile app={apps.changeReport} onClick={props.onAppClick} />
    <WorkspaceAppTile app={apps.taxonomyInfo} onClick={props.onAppClick} />
    <WorkspaceAppTile app={apps.taxonomyPackager} onClick={props.onAppClick} />
    <WorkspaceAppTile app={apps.oimConverter} onClick={props.onAppClick} />
  </div>;
}
