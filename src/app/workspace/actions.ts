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
import { WorkspaceFiling, WorkspaceAppSpec } from '../state';
import { Profile, ValidationParams } from '../models';

export const PROFILES_FETCH = 'WORKSPACE_PROFILES_FETCH';
export const PROFILES_RECEIVED = 'WORKSPACE_PROFILES_RECEIVED';
export const PROFILES_FAILED = 'WORKSPACE_PROFILES_FAILED';

export const FILINGS_FETCH = 'WORKSPACE_FILINGS_FETCH';
export const FILINGS_RECEIVED = 'WORKSPACE_FILINGS_RECEIVED';
export const FILINGS_FAILED = 'WORKSPACE_FILINGS_FAILED';

export const SHOW_UPLOAD = 'WORKSPACE_SHOW_UPLOAD';

export const UPLOAD = 'WORKSPACE_UPLOAD';
export const UPLOAD_FAILED = 'WORKSPACE_UPLOAD_FAILED';

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

export interface FailedUploadAction extends Action {
  error: string;
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

export function uploadFailedAction(error: string): FailedUploadAction {
  return {type: UPLOAD_FAILED, error};
}
