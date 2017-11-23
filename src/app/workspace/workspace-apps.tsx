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
import { Link } from 'react-router-dom';

export const HOME = `/${location.pathname.split('/')[1]}/`;

export const WORKSPACE_APPS: {[key: string]: WorkspaceAppSpec} = {
  validator: {
    name: 'Quick XBRL Validator',
    href: `${HOME}validator`,
    filingHref: `${HOME}validator/filing-version/{id}`,
  },
  viewer: {
    name: 'Quick Viewer',
    href: `${HOME}viewer`,
    filingHref: `${HOME}viewer/filing-version/{id}`,
  },
  statistics: {
    name: 'Filing Statistics',
    href: `${HOME}statistics`,
    filingHref: `${HOME}statistics/filing-version/{id}`,
  },
  benford: {
    name: 'Benford\'s Analyser', external: true,
    href: `${HOME}benfords-analyser`,
    filingHref: '/benfords-analyser/filing-version/{id}',
  },
  changeReport: {
    name: 'XBRL Document Change Report', external: true,
    href: '/xbrl-document-change-report/',
  },
  taxonomyInfo: {
    name: 'Quick Taxonomy Info', external: true,
    href: '/quick-taxonomy-info/',
  },
  taxonomyPackager: {
    name: 'Taxonomy Packager', external: true,
    href: '/taxonomy-packager/',
  },
  oimConverter: {
    name: 'OIM/JSON Converter', external: true,
    href: `${HOME}oimConverter`,
    filingHref: '/api/document-service/filing-version/{id}/some-oim-please',
  },
};

export interface LinkDef {
  href: string;
  external: boolean;
}

export function linkForFiling(app: WorkspaceAppSpec, filingVersionId?: string): LinkDef {
  if (filingVersionId && app.filingHref) {
    return {
      href: app.filingHref.replace('{id}', filingVersionId),
      external: !!app.external,
    };
  }
  return {
    href: app.href,
    // If there's a filing list but we haven't chosen a filing, it's never external
    external: !!app.external && !app.filingHref,
  };
}

function WorkspaceAppTile({app}: {app: WorkspaceAppSpec}): JSX.Element {
  const { href, external } = linkForFiling(app);
  return <div>
    { external ?
      <a href={href}>{app.name}</a> :
      <Link to={href}>{app.name}</Link>
    }
  </div>;
}

export default function WorkspaceApps(): JSX.Element {
  return <div>
    <WorkspaceAppTile app={WORKSPACE_APPS.validator} />
    <WorkspaceAppTile app={WORKSPACE_APPS.viewer} />
    <WorkspaceAppTile app={WORKSPACE_APPS.statistics} />
    <WorkspaceAppTile app={WORKSPACE_APPS.benford} />
    <WorkspaceAppTile app={WORKSPACE_APPS.changeReport} />
    <WorkspaceAppTile app={WORKSPACE_APPS.taxonomyInfo} />
    <WorkspaceAppTile app={WORKSPACE_APPS.taxonomyPackager}/>
    <WorkspaceAppTile app={WORKSPACE_APPS.oimConverter} />
  </div>;
}
