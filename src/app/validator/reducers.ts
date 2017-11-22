import { State } from '../state';
import { FAILED, RECEIVED, FailedAction, ReceivedAction } from './actions';
import { Action } from 'redux';

export function reducer(state: State | undefined, action: Action): State | undefined {
  if (!state) {
    return undefined;
  }
  switch (action.type) {
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
