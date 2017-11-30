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
import { AnalysisResponse } from '@cfl/digit-frequency-analysis-service';

export const FAILED = 'BENFORD_FAILED';

export const SEARCH = 'BENFORD_SEARCH';
export const NAME_VERSION_LINK = 'NAME_VERSION_LINK';
export const SEARCH_RESULTS_RECEIVED = 'BENFORD_SEARCH_RESULTS_RECEIVED';
export const SEARCH_TEXT_CHANGED = 'BENFORD_SEARCH_TEXT_CHANGED';

export const ANALYSE = 'ANALYSE';
export const ANALYSE_RESULTS_RECEIVED = 'ANALYSE_RESULTS_RECEIVED';

export interface FailedAction extends Action {
  message?: string;
}

export interface SearchTextChangedAction extends Action {
  searchText: string;
}

export function searchTextChangedAction(searchText: string): SearchTextChangedAction {
  return {type: SEARCH_TEXT_CHANGED, searchText};
}

export interface SearchAction extends Action {
  search: string;
}

export function searchAction(search: string): SearchAction {
  return {type: SEARCH, search};
}

export interface SearchResultsReceivedAction extends Action {
  filingName?: string;
}

export function searchResultsReceived(filingName?: string): SearchResultsReceivedAction {
  return {type: SEARCH_RESULTS_RECEIVED, filingName};
}

export interface NameVersionLinkAction extends Action {
  filingName: string;
  filingVersionId: string;
}

export function nameVersionLinkAction(filingVersionId: string, filingName: string): NameVersionLinkAction {
  return {type: NAME_VERSION_LINK, filingName, filingVersionId};
}

export interface AnalyseAction extends Action {
  filingVersionId: string;
}

export function analyseAction(filingVersionId: string): AnalyseAction {
  return {type: ANALYSE, filingVersionId};
}

export interface AnalyseResultsReceivedAction extends Action {
  results?: AnalysisResponse;
}

export function analyseResultsReceived(results?: AnalysisResponse): AnalyseResultsReceivedAction {
  return {type: ANALYSE_RESULTS_RECEIVED, results};
}

export function failedAction(message: string): FailedAction {
  return {type: FAILED, message};
}
