import { fetchAction, receivedAction, failedAction } from '../actions';
import { reducer, ValidatorState } from '../reducers';
import { exampleValidatorState } from '../../tests/model-examples';

describe('validatorReducer', () => {
  const initial: ValidatorState = reducer(undefined, {type: '????'});

  it('sets initial state', () => {
    expect(initial).toEqual({
      names: {},
      status: {},
    });
  });

  it('clears status when fetching', () => {
    const after: ValidatorState = reducer(exampleValidatorState, fetchAction('1234'));
    expect(after).toBeDefined();
    expect(after!.status['1234']).toEqual({loading: true});
  });

  it('stores name and status when received', () => {
    const name = 'Filing.zip';
    const status = 'WARNING';
    const after: ValidatorState = reducer(exampleValidatorState, receivedAction('1234', name, status));
    expect(after).toBeDefined();
    expect(after!.names['1234']).toEqual(name);
    expect(after!.status['1234']).toEqual({loading: false, value: status});
  });

  it('stores error when failed', () => {
    const after: ValidatorState = reducer(exampleValidatorState, failedAction('1234', 'Oh no'));
    expect(after).toBeDefined();
    expect(after!.status['1234']).toEqual({loading: false, error: 'Oh no'});
  });
});
