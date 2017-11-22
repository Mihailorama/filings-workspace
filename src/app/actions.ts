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

/**
 * Actions are used to pass info from the UI back to the state and sagas.
 */
import { Action } from 'redux';

import { App, Profile, User, ValidationParams } from './models';

// Actions for acquiring the list of profiles needed by the form.

export const STARTUP_INFO_RECEIVED = 'STARTUP_INFO_RECEIVED';
export const STARTUP_INFO_FAILED = 'STARTUP_INFO_FAILED';

export interface StartupInfoReceivedAction extends Action {
  user: User;
  apps: App[];
  profiles: Profile[];
}

export function startupInfoReceivedAction(user: User, apps: App[], profiles: Profile[]): StartupInfoReceivedAction {
  return {type: STARTUP_INFO_RECEIVED, user, apps, profiles};
}

export interface FailedAction extends Action {
  message?: string;
}

export function startupInfoFailedAction(message: string): FailedAction {
  return {type: STARTUP_INFO_FAILED, message};
}

// Actions for performing the upload operation itself.

export const UPLOAD_STARTED = 'UPLOAD_STARTED';  // from saga when upload begins
export const UPLOAD_FAILED = 'UPLOAD_FAILED';  // From saga if uplaod fails.
export const FAILED = 'FAILED';

export interface UploadAction extends Action {
  params: ValidationParams;
}

export function uploadStartedAction(params: ValidationParams): UploadAction {
  return {type: UPLOAD_STARTED, params};
}

export function uploadFailedAction(message?: string): FailedAction {
  return {type: UPLOAD_FAILED, message};
}

export function failedAction(message: string): FailedAction {
  return {type: FAILED, message};
}
