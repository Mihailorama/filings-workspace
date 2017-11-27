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

import { App, User } from '../models';

export const FETCH = 'APP_BAR_FETCH';
export const RECEIVED = 'APP_BAR_RECEIVED';
export const FAILED = 'APP_BAR_FAILED';

export interface ReceivedAction extends Action {
  user: User;
  apps: App[];
}

export interface FailedAction extends Action {
  message?: string;
}

export function fetchAction(): Action {
  return {type: FETCH};
}

export function receivedAction(user: User, apps: App[]): ReceivedAction {
  return {type: RECEIVED, user, apps};
}

export function failedAction(message: string): FailedAction {
  return {type: FAILED, message};
}
