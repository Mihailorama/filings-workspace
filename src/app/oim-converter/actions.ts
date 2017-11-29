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
import { FilingVersion } from '@cfl/document-service';

export const GET_FILING_VERSION_FAILED = 'GET_FILING_VERSION_FAILED';

export const GET_FILING_VERSION = 'GET_FILING_VERSION';
export const RECEIVED_FILING_VERSION = 'RECEIVED_FILING_VERSION';

export const GET_DOCUMENT_CONTENT = 'GET_DOCUMENT_CONTENT';
export const RECEIVED_DOCUMENT_CONTENT = 'RECEIVED_DOCUMENT_CONTENT';

export interface GetFilingVersionAction extends Action {
  filingVersionId: string;
}

export function getFilingVersionAction(filingVersionId: string): GetFilingVersionAction {
  return {type: GET_FILING_VERSION, filingVersionId};
}

export interface FilingVersionReceivedAction extends Action {
  filingVersion: FilingVersion;
}

export function filingVersionReceivedAction(filingVersion: FilingVersion): FilingVersionReceivedAction {
  return {type: RECEIVED_FILING_VERSION, filingVersion};
}

export interface FailedAction extends Action {
  message?: string;
}

export function failedAction(message: string): FailedAction {
  return {type: GET_FILING_VERSION_FAILED, message};
}
