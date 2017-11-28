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

import * as uriTemplates from 'uri-templates';
import { StatisticsApiFactory } from '@cfl/filing-statistics-service';

import { apiFetch } from './api-fetch';
import { App, TableRenderingWindow } from './models';

export const USER = '/api/user';
export const APPS = '/api/apps';
export const AUTH_LOGOUT = '/auth/logout';

const APP_HOME = uriTemplates('{+base}');
const APP_HELP = uriTemplates('{+base}static/user-guide.html');

export const appHome = ({href}: App) => APP_HOME.fillFromObject({base: href});
export const appHelp = ({href}: App) => APP_HELP.fillFromObject({base: href});

const DOCUMENT_SERVICE_BASE = '/api/document-service/v1/';
const DOCUMENT_SERVICE_CATEGORIES = uriTemplates(DOCUMENT_SERVICE_BASE + 'categories/{category}');
export const DOCUMENT_SERVICE_FILINGS = DOCUMENT_SERVICE_BASE + 'filings/';
const DOCUMENT_SERVICE_FILING_VERSION = uriTemplates(DOCUMENT_SERVICE_BASE + 'filing-versions/{filingVersionId}');

export const documentServiceCategories = (category: 'validation') => DOCUMENT_SERVICE_CATEGORIES.fillFromObject({category});
export const documentServiceFilingVersion = (filingVersionId: string) => DOCUMENT_SERVICE_FILING_VERSION.fillFromObject({filingVersionId});

const VALIDATION_SERVICE_BASE = '/api/validation-service/v1/';
const VALIDATION_SERVICE_FILING_VERSION = uriTemplates(VALIDATION_SERVICE_BASE + 'filing-versions/{filingVersionId}');

export const validationServiceFilingVersion = (filingVersionId: string) =>
  VALIDATION_SERVICE_FILING_VERSION.fillFromObject({filingVersionId});

const TABLE_RENDERING_SERVICE_BASE = '/api/table-rendering-service/v1/';
const TABLE_RENDERING_SERVICE_TABLES = uriTemplates(TABLE_RENDERING_SERVICE_BASE + 'filing-versions/{filingVersionId}/tables/');
const TABLE_RENDERING_SERVICE_Z_OPTIONS = uriTemplates(TABLE_RENDERING_SERVICE_BASE + 'tables/{tableId}/z-options{?z}');
const TABLE_RENDERING_SERVICE_RENDER = uriTemplates(TABLE_RENDERING_SERVICE_BASE + 'tables/{tableId}/render{?x,y,z,width,height}');

export const tableRenderingServiceTables = (filingVersionId: string) => TABLE_RENDERING_SERVICE_TABLES.fillFromObject({filingVersionId});
export const tableRenderingServiceZOptions = (tableId: string, z: number) => TABLE_RENDERING_SERVICE_Z_OPTIONS.fillFromObject({tableId, z});
export const tableRenderingServiceRender = (tableId: string, window: TableRenderingWindow) =>
  TABLE_RENDERING_SERVICE_RENDER.fillFromObject({tableId, ...window});

export const filingStatisticsService = StatisticsApiFactory(apiFetch, '/api/filing-statistics-service/v1');
