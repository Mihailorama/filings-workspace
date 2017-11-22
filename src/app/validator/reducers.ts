import { Action } from 'redux';
import { FETCH, FAILED, RECEIVED, FetchAction, FailedAction, ReceivedAction } from './actions';
import { State } from '../state';

export function reducer(state: State | undefined, action: Action): State | undefined {
  if (!state) {
    return undefined;
  }
  switch (action.type) {
    case FETCH: {
      const { filingVersionId } = action as FetchAction;
      return { ...state, status: { ... state.status, [filingVersionId]: {loading: true} }};
    }
    case RECEIVED: {
      const { filingVersionId, status } = action as ReceivedAction;
      return { ...state, status: { ... state.status, [filingVersionId]: {loading: false, value: status} }};
    }
    case FAILED: {
      const { filingVersionId, error } = action as FailedAction;
      return { ...state, status: { ... state.status, [filingVersionId]: {loading: false, error} }};
    }
    default:
      return undefined;
  }
}
