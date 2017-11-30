import { Statistic } from '@cfl/filing-statistics-service';

import { fetchAction, receivedAction, failedAction } from '../actions';
import { reducer, StatisticsState } from '../reducers';
import { exampleStatisticsState } from '../../tests/model-examples';

describe('statisticsReducer', () => {
  const initial: StatisticsState = reducer(undefined, {type: '????'});

  it('sets initial state', () => {
    expect(initial).toEqual({
      names: {},
      statistics: {},
    });
  });

  it('clears statistics when fetching', () => {
    const after: StatisticsState = reducer(exampleStatisticsState, fetchAction('1234'));
    expect(after.statistics['1234']).toEqual({loading: true});
  });

  it('stores name and statistics when received', () => {
    const filingName = 'Example filing.zip';
    const statistics: Statistic[] = [
      {name: 'fact-count', value: 123, label: 'Fact count', format: 'integer'},
      {name: 'percentage-fraud', value: 99.5, label: 'Percentage fraud', format: 'percentage'},
    ];
    const after: StatisticsState = reducer(exampleStatisticsState, receivedAction('1234', filingName, statistics));
    expect(after.names['1234']).toEqual(filingName);
    expect(after.statistics['1234']).toEqual({loading: false, value: statistics});
  });

  it('stores error when failed', () => {
    const after: StatisticsState = reducer(exampleStatisticsState, failedAction('1234', 'Oh no'));
    expect(after.statistics['1234']).toEqual({loading: false, error: 'Oh no'});
  });
});
