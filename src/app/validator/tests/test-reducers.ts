import { fetchAction, receivedAction, failedAction } from '../actions';
import { reducer, ValidatorState } from '../reducers';
import { exampleValidatorState } from '../../tests/model-examples';

describe('validatorReducer', () => {
  const initial: ValidatorState | undefined = reducer(exampleValidatorState, {type: '????'});

  it('is initially undefined', () => {
    expect(initial).toBeUndefined();
  });

  it('clears status when fetching', () => {
    const after: ValidatorState | undefined = reducer(exampleValidatorState, fetchAction('1234'));
    expect(after).toBeDefined();
    expect(after!.status['1234']).toEqual({loading: true});
  });

  it('stores status when received', () => {
    const status = 'WARNING';
    const after: ValidatorState | undefined = reducer(exampleValidatorState, receivedAction('1234', status));
    expect(after).toBeDefined();
    expect(after!.status['1234']).toEqual({loading: false, value: status});
  });

  it('stores error when failed', () => {
    const after: ValidatorState | undefined = reducer(exampleValidatorState, failedAction('1234', 'Oh no'));
    expect(after).toBeDefined();
    expect(after!.status['1234']).toEqual({loading: false, error: 'Oh no'});
  });
});
