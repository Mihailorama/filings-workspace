import { Effect } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { FilingStatisticsAction, receivedAction, failedAction, FETCH } from './actions';
import { filingStatisticsService } from '../urls';

export function* fetchSaga(action: FilingStatisticsAction): IterableIterator<Effect> {
  const { filingVersionId } = action;
  try {
    const statistics = yield call(filingStatisticsService.getStatistics, {filingVersionId});
    yield put(receivedAction(filingVersionId, statistics));
  } catch (res) {
    yield put(failedAction(filingVersionId, res.message || res.statusText || `Status: ${res.status}`));
  }
}

export function* saga(): IterableIterator<Effect> {
  yield takeEvery(FETCH, fetchSaga);
}
