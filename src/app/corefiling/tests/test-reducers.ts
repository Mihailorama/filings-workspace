import { fetchAction, receivedAction, failedAction } from '../actions';
import { reducer, AppBarState } from '../reducers';
import { exampleAppBarState } from '../../tests/model-examples';

describe('appBarReducer', () => {
  const initial: AppBarState = reducer(undefined, {type: '????'});

  it('creates initial state', () => {
    expect(initial).toEqual({user: {loading: false}});
  });

  it('clears user and apps when fetching', () => {
    const after: AppBarState = reducer(exampleAppBarState, fetchAction());
    expect(after).toBeDefined();
    expect(after!.user).toEqual({loading: true});
  });

  it('stores user and apps when received', () => {
    const user = {sub: 'uuid-of-user', name: 'Uttara Todorov', email: 'ut@example.com', preferred_username: 'ut'};
    const after = reducer(exampleAppBarState, receivedAction(user));

    expect(after).toBeDefined();
    expect(after!.user).toEqual({loading: false, value: user});
  });

  it('stores error when failed', () => {
    const after: AppBarState = reducer(exampleAppBarState, failedAction('Oh no'));
    expect(after).toBeDefined();
    expect(after!.user).toEqual({loading: false, error: 'Oh no'});
  });
});
