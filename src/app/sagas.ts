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

import { Effect } from 'redux-saga';
import { all, call, put, takeEvery } from 'redux-saga/effects';

import {
  failedAction,
  startupInfoFailedAction,
  startupInfoReceivedAction,
  TABLE_RENDER_PAGE,
  tableRenderingReceivedAction,
  tableRenderingRequested,
  TableRenderPageAction,
  FILING_STATISTICS_FETCH,
  FilingStatisticsAction,
  filingStatisticsRequestedAction,
  filingStatisticsReceivedAction,
} from './actions';
import { apiFetchJson } from './api-fetch';
import { App, Category, User } from './models';
import QueryableTablePageImpl, { TABLE_WINDOW_HEIGHT } from './models/queryable-table-page-impl';
import {
  APPS,
  documentServiceCategories,
  tableRenderingServiceRender,
  tableRenderingServiceZOptions,
  USER,
  filingStatisticsService,
} from './urls';

/**
 * Fetch the information needed at startup. If this fails we cannot show the app.
 */
export function* startupInfoSaga(): IterableIterator<Effect> {
  try {
    const [user, category, apps]: [User, Category, App[]] = yield all([
      call(apiFetchJson, USER),
      call(apiFetchJson, documentServiceCategories('validation')),
      call(apiFetchJson, APPS),
    ]);
    const { profiles } = category;
    if (!profiles || profiles.length === 0) {
      yield put(startupInfoFailedAction('Startup failed (No profiles)'));
      return;
    }
    yield put(startupInfoReceivedAction(user, apps, profiles));
  } catch (res) {
    yield put(startupInfoFailedAction(`Startup failed (${res.message || res.statusText || res.status}).`));
  }
}

export function* tableRenderingSaga(action: TableRenderPageAction): IterableIterator<Effect> {
  const { table, x, y, z } = action;
  try {
    const width = table.x.sliceCount > 0 && table.x.depth > 0 ? table.x.sliceCount : 1;
    const window = {x, y, z, width, height: TABLE_WINDOW_HEIGHT};
    yield put(tableRenderingRequested(table, window));

    const [ zOptions, tableRendering ] = yield all([
      call(apiFetchJson, tableRenderingServiceZOptions(table.id, 0)),
      call(apiFetchJson, tableRenderingServiceRender(table.id, window)),
    ]);
    yield put(tableRenderingReceivedAction(table, zOptions, new QueryableTablePageImpl(table, tableRendering)));
  } catch (res) {
    yield put(failedAction(res.message || res.statusText || `Status: ${res.status}`));
  }
}

export function* filingStatisticsSaga(action: FilingStatisticsAction): IterableIterator<Effect> {
  const { filingVersionId } = action;
  try {
    yield put(filingStatisticsRequestedAction(filingVersionId));
    const statistics = yield call(filingStatisticsService.getStatistics, {filingVersionId});
    yield put(filingStatisticsReceivedAction(filingVersionId, statistics));
  } catch (res) {
    yield put(failedAction(res.message || res.statusText || `Status: ${res.status}`));
  }
}

/**
 * Watch for actions.
 */
export function* checkingSaga(): IterableIterator<Effect> {
  yield all([
    takeEvery(TABLE_RENDER_PAGE, tableRenderingSaga),
    takeEvery(FILING_STATISTICS_FETCH, filingStatisticsSaga),
  ]);
}
