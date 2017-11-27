import { fetchAction, receivedAction, failedAction } from '../actions';
import { reducer } from '../reducers';
import { State } from '../../state';
import { exampleState } from '../../tests/model-examples';

describe('validatorReducer', () => {
  const initial: State | undefined = reducer(exampleState, {type: '????'});

  it('is initially undefined', () => {
    expect(initial).toBeUndefined();
  });

  it('clears status when fetching', () => {
    const after: State | undefined = reducer(exampleState, fetchAction('1234'));
    expect(after).toBeDefined();
    expect(after!.status['1234']).toEqual({loading: true});
  });

  it('stores status when received', () => {
    const status = 'WARNING';
    const after: State | undefined = reducer(exampleState, receivedAction('1234', status));
    expect(after).toBeDefined();
    expect(after!.status['1234']).toEqual({loading: false, value: status});
  });

  it('stores error when failed', () => {
    const after: State | undefined = reducer(exampleState, failedAction('1234', 'Oh no'));
    expect(after).toBeDefined();
    expect(after!.status['1234']).toEqual({loading: false, error: 'Oh no'});
  });
});
