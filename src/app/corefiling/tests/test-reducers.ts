import { fetchAction, receivedAction, failedAction } from '../actions';
import { reducer } from '../reducers';
import { State } from '../../state';
import { exampleState } from '../../tests/model-examples';

describe('appBarReducer', () => {
  const initial: State | undefined = reducer(exampleState, {type: '????'});

  it('is initially undefined', () => {
    expect(initial).toBeUndefined();
  });

  it('clears user and apps when fetching', () => {
    const after: State | undefined = reducer(exampleState, fetchAction());
    expect(after).toBeDefined();
    expect(after!.user).toEqual({loading: true});
    expect(after!.apps).toEqual({loading: true});
  });

  it('stores user and apps when received', () => {
    const user = {sub: 'uuid-of-user', name: 'Uttara Todorov', email: 'ut@example.com', preferred_username: 'ut'};
    const apps = [{id: 'app', name: 'App', href: '/app/'}];
    const after = reducer(exampleState, receivedAction(user, apps));

    expect(after).toBeDefined();
    expect(after!.user).toEqual({loading: false, value: user});
    expect(after!.apps).toEqual({loading: false, value: apps});
  });

  it('stores error when failed', () => {
    const after: State | undefined = reducer(exampleState, failedAction('Oh no'));
    expect(after).toBeDefined();
    expect(after!.user).toEqual({loading: false, error: 'Oh no'});
    expect(after!.apps).toEqual({loading: false, error: 'Oh no'});
  });
});
