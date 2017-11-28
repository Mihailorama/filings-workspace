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
import { Grid, Row, Col } from 'react-bootstrap';
import { WorkspaceAppSpec } from '../state';
import { Link } from 'react-router-dom';
import BenfordIcon from './app-icons/benford';
import ChangeReportIcon from './app-icons/change-report';
import StatisticsIcon from './app-icons/statistics';
import OIMJsonIcon from './app-icons/oim-json';
import TaxonomyInfoIcon from './app-icons/taxonomy-info';
import TaxonomyPackagerIcon from './app-icons/taxonomy-packager';
import ValidatorIcon from './app-icons/validator';
import ViewerIcon from './app-icons/viewer';

import './workspace-apps.less';

export const HOME = `/${location.pathname.split('/')[1]}/`;

export const WORKSPACE_APPS: {[key: string]: WorkspaceAppSpec} = {
  validator: {
    name: 'Quick XBRL Validator',
    description: 'Tool that quickly validates your XBRL filing against a chosen taxonomy',
    action: 'UPLOAD',
    href: `${HOME}validator`,
    filingHref: `${HOME}validator/filing-version/{id}`,
    icon: props => <ValidatorIcon {... props } />,
  },
  viewer: {
    name: 'Quick Viewer',
    description: 'View your XBRL filing in table format',
    action: 'VIEW',
    href: `${HOME}viewer`,
    filingHref: `${HOME}viewer/filing-version/{id}`,
    icon: props => <ViewerIcon {... props } />,
  },
  statistics: {
    name: 'Filing Statistics',
    description: 'View key statistics about your filing',
    action: 'VIEW',
    href: `${HOME}statistics`,
    filingHref: `${HOME}statistics/filing-version/{id}`,
    icon: props => <StatisticsIcon {... props } />,
  },
  benford: {
    name: 'Benford\'s Analyser',
    description: 'Analyse US SEC filings using Benford’s law',
    action: 'ANALYSE',
    external: true,
    href: `${HOME}benfords-analyser`,
    filingHref: '/benfords-analyser/filing-version/{id}',
    icon: props => <BenfordIcon {... props } />,
  },
  changeReport: {
    name: 'XBRL Document Change Report',
    description: 'Compare two versions of the same filing and review changes',
    action: 'COMPARE',
    external: true,
    href: '/xbrl-document-change-report/',
    icon: props => <ChangeReportIcon {... props } />,
  },
  taxonomyInfo: {
    name: 'Quick Taxonomy Info',
    description: 'Quickly search for concepts or codification references in a taxonomy',
    action: 'CHECK',
    external: true,
    href: '/quick-taxonomy-info/',
    icon: props => <TaxonomyInfoIcon {... props } />,
  },
  taxonomyPackager: {
    name: 'Taxonomy Packager',
    description: 'Create a taxonomy package by adding metadata to your existing taxonomy ZIP file',
    action: 'UPLOAD',
    external: true,
    href: '/taxonomy-packager/',
    icon: props => <TaxonomyPackagerIcon {... props } />,
  },
  oimConverter: {
    name: 'OIM/JSON Converter',
    description: 'Convert XBRL to OIM JSON format',
    action: 'DOWNLOAD',
    external: true,
    href: `${HOME}oimConverter`,
    filingHref: '/api/document-service/filing-version/{id}/some-oim-please',
    icon: props => <OIMJsonIcon {... props } />,
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
  const { href } = linkForFiling(app);
  return <Col className='app-WorkspaceAppTile'>
    <div className='app-WorkspaceAppTile-icon'>{app.icon ? app.icon({}) : undefined}</div>
    <div className='app-WorkspaceAppTile-name'>{app.name}</div>
    <div className='app-WorkspaceAppTile-description'>{app.description}</div>
    { external ?
      <a className='app-WorkspaceAppTile-button' href={href}>{app.action}</a> :
      <Link className='app-WorkspaceAppTile-button' to={href}>{app.action}</Link>
    }
  </Col>;
}

export default function WorkspaceApps(): JSX.Element {
  return <div className='app-WorkspaceApps'>
    <Grid className='app-WorkspaceAppsGrid'>
      <Row className='app-WorkspaceAppsRow'>
        <WorkspaceAppTile app={WORKSPACE_APPS.validator} />
        <WorkspaceAppTile app={WORKSPACE_APPS.taxonomyInfo} />
        <WorkspaceAppTile app={WORKSPACE_APPS.benford} />
      </Row>
      <Row className='app-WorkspaceAppsRow'>
        <WorkspaceAppTile app={WORKSPACE_APPS.taxonomyPackager}/>
        <WorkspaceAppTile app={WORKSPACE_APPS.oimConverter} />
        <WorkspaceAppTile app={WORKSPACE_APPS.viewer} />
      </Row>
      <Row className='app-WorkspaceAppsRow'>
        <WorkspaceAppTile app={WORKSPACE_APPS.statistics} />
        <WorkspaceAppTile app={WORKSPACE_APPS.changeReport} />
      </Row>
    </Grid>
  </div>;
}
