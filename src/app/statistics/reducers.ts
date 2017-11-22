import { State } from '../state';
import { FAILED, RECEIVED, FailedAction, ReceivedAction } from './actions';
import { Action } from 'redux';

export function reducer(state: State | undefined, action: Action): State | undefined {
  if (!state) {
    return undefined;
  }
  switch (action.type) {
    case RECEIVED: {
      const { filingVersionId, statistics } = action as ReceivedAction;
      return { ...state, statistics: { ... state.statistics, [filingVersionId]: {loading: false, value: statistics} }};
    }
    case FAILED: {
      const { filingVersionId, error } = action as FailedAction;
      return { ...state, statistics: { ... state.statistics, [filingVersionId]: {loading: false, error} }};
    }
    default:
      return undefined;
  }
}
