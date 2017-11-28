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
import { ValidationStatus } from '../models';

export const FETCH = 'VALIDATOR_FETCH';
export const RECEIVED = 'VALIDATOR_RECEIVED';
export const FAILED = 'VALIDATOR_FAILED';

export interface FetchAction extends Action {
  filingVersionId: string;
}

export interface ReceivedAction extends Action {
  filingVersionId: string;
  status: ValidationStatus;
}

export interface FailedAction extends Action {
  filingVersionId: string;
  error: string;
}

export function fetchAction(filingVersionId: string): FetchAction {
  return {type: FETCH, filingVersionId};
}

export function receivedAction(filingVersionId: string, status: ValidationStatus): ReceivedAction {
  return {type: RECEIVED, filingVersionId, status};
}

export function failedAction(filingVersionId: string, error: string): FailedAction {
  return {type: FAILED, filingVersionId, error};
}
