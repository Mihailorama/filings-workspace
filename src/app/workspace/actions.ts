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

import { Action } from 'redux';
import { Profile, ValidationParams } from '../models';
import { WorkspaceFiling, WorkspaceAppSpec, FilingListMode } from './reducers';
import { FilingMatch } from '../fullbeam-search/models';

export const PROFILES_FETCH = 'WORKSPACE_PROFILES_FETCH';
export const PROFILES_RECEIVED = 'WORKSPACE_PROFILES_RECEIVED';
export const PROFILES_FAILED = 'WORKSPACE_PROFILES_FAILED';

export const FILINGS_FETCH = 'WORKSPACE_FILINGS_FETCH';
export const FILINGS_RECEIVED = 'WORKSPACE_FILINGS_RECEIVED';
export const FILINGS_FAILED = 'WORKSPACE_FILINGS_FAILED';

export const SEARCH = 'WORKSPACE_SEARCH';
export const SEARCH_RESULTS_RECEIVED = 'WORKSPACE_SEARCH_RESULTS_RECEIVED';
export const SEARCH_TEXT_CHANGED = 'WORKSPACE_SEARCH_TEXT_CHANGED';
export const SEARCH_FAILED = 'WORKSPACE_SEARCH_FAILED';

export const SEARCH_SELECTION = 'WORKSPACE_SEARCH_SELECTION';
export const SEARCH_SELECTION_FAILED = 'WORKSPACE_SEARCH_SELECTION_FAILED';

export const SHOW_UPLOAD = 'WORKSPACE_SHOW_UPLOAD';

export const UPLOAD = 'WORKSPACE_UPLOAD';
export const UPLOAD_FAILED = 'WORKSPACE_UPLOAD_FAILED';

export const MODE_CHANGED = 'WORKSPACE_MODE_CHANGED';

export interface ReceivedProfilesAction extends Action {
  profiles: Profile[];
}

export interface FailedProfilesAction extends Action {
  error: string;
}

export interface ReceivedFilingsAction extends Action {
  filings: WorkspaceFiling[];
}

export interface FailedFilingsAction extends Action {
  error: string;
}

export interface ShowUploadAction extends Action {
  show: boolean;
}

export interface UploadAction extends Action {
  app: WorkspaceAppSpec;
  params: ValidationParams;
}

export interface ReceivedUploadAction extends Action {
  filingVersionId: string;
}

export interface FailedAction extends Action {
  error: string;
}

export interface SearchTextChangedAction extends Action {
  searchText: string;
}

export interface SearchAction extends Action {
  search: string;
}

export interface SearchResultsReceivedAction extends Action {
  filings: FilingMatch[];
}

export interface SearchSelectionAction extends Action {
  app: WorkspaceAppSpec;
  selectedFiling: FilingMatch;
}

export interface ModeChangedAction extends Action {
  mode: FilingListMode;
}

export function fetchProfilesAction(): Action {
  return {type: PROFILES_FETCH};
}

export function receivedProfilesAction(profiles: Profile[]): ReceivedProfilesAction {
  return {type: PROFILES_RECEIVED, profiles};
}

export function failedProfilesAction(error: string): FailedProfilesAction {
  return {type: PROFILES_FAILED, error};
}

export function fetchFilingsAction(): Action {
  return {type: FILINGS_FETCH};
}

export function receivedFilingsAction(filings: WorkspaceFiling[]): ReceivedFilingsAction {
  return {type: FILINGS_RECEIVED, filings};
}

export function failedFilingsAction(error: string): FailedFilingsAction {
  return {type: FILINGS_FAILED, error};
}

export function showUpload(show: boolean): ShowUploadAction {
  return {type: SHOW_UPLOAD, show};
}

export function uploadAction(app: WorkspaceAppSpec, params: ValidationParams): UploadAction {
  return {type: UPLOAD, app, params};
}

export function uploadFailedAction(error: string): FailedAction {
  return {type: UPLOAD_FAILED, error};
}

export function searchTextChangedAction(searchText: string): SearchTextChangedAction {
  return {type: SEARCH_TEXT_CHANGED, searchText};
}

export function searchAction(search: string): SearchAction {
  return {type: SEARCH, search};
}

export function searchResultsReceived(filings: FilingMatch[]): SearchResultsReceivedAction {
  return {type: SEARCH_RESULTS_RECEIVED, filings};
}

export function searchFailedAction(error: string): FailedAction {
  return {type: SEARCH_FAILED, error};
}

export function searchSelectionAction(app: WorkspaceAppSpec, selectedFiling: FilingMatch): SearchSelectionAction {
  return {type: SEARCH_SELECTION, app, selectedFiling};
}

export function searchSelectionFailedAction(error: string): FailedAction {
  return {type: SEARCH_SELECTION_FAILED, error};
}

export function modeChangedAction(mode: FilingListMode): ModeChangedAction {
  return { type: MODE_CHANGED, mode };
}
