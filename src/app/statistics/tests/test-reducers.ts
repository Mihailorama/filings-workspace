import { Statistic } from '@cfl/filing-statistics-service';

import { fetchAction, receivedAction, failedAction } from '../actions';
import { reducer } from '../reducers';
import { State } from '../../state';
import { exampleState } from '../../tests/model-examples';

describe('statisticsReducer', () => {
  const initial: State | undefined = reducer(exampleState, {type: '????'});

  it('is initially undefined', () => {
    expect(initial).toBeUndefined();
  });

  it('clears statistics when fetching', () => {
    const after: State | undefined = reducer(exampleState, fetchAction('1234'));
    expect(after).toBeDefined();
    expect(after!.statistics['1234']).toEqual({loading: true});
  });

  it('stores statistics when received', () => {
    const statistics: Statistic[] = [
      {name: 'fact-count', value: 123, label: 'Fact count', format: 'integer'},
      {name: 'percentage-fraud', value: 99.5, label: 'Percentage fraud', format: 'percentage'},
    ];
    const after: State | undefined = reducer(exampleState, receivedAction('1234', statistics));
    expect(after).toBeDefined();
    expect(after!.statistics['1234']).toEqual({loading: false, value: statistics});
  });

  it('stores error when failed', () => {
    const after: State | undefined = reducer(exampleState, failedAction('1234', 'Oh no'));
    expect(after).toBeDefined();
    expect(after!.statistics['1234']).toEqual({loading: false, error: 'Oh no'});
  });
});
