
import * as uriTemplates from 'uri-templates';

import { App, FilingVersion } from './models';

export const USER = '/api/user';
export const APPS = '/api/apps';
export const AUTH_LOGOUT = '/auth/logout';

const APP_HOME = uriTemplates('/{id}/');
const APP_HELP = uriTemplates('/{id}/statuc/user-guide.html');

export const appHome = (app: App) => APP_HOME.fillFromObject(app);
export const appHelp = (app: App) => APP_HELP.fillFromObject(app);

const DOCUMENT_SERVICE_BASE = '/api/document-service/v1/';
const DOCUMENT_SERVICE_CATEGORIES = uriTemplates(DOCUMENT_SERVICE_BASE + 'categories/{category}');
export const DOCUMENT_SERVICE_FILINGS = DOCUMENT_SERVICE_BASE + 'filings/';
export const DOCUMENT_SERVICE_FILING_VERSION = uriTemplates(DOCUMENT_SERVICE_BASE + 'filing-versions/{id}');

export const documentServiceCategories = (category: 'validation') => DOCUMENT_SERVICE_CATEGORIES.fillFromObject({category});
export const documentServiceFilingVersion = (filingVersion: FilingVersion) => DOCUMENT_SERVICE_FILING_VERSION.fillFromObject(filingVersion);
