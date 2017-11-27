import {
    failedFilingsAction,
    fetchFilingsAction,
    receivedFilingsAction,
    uploadAction,
    uploadFailedAction,
} from '../actions';
import { reducer } from '../reducers';
import { WORKSPACE_APPS } from '../workspace-apps';
import { State } from '../../state';
import { ValidationParams } from '../../models';
import { exampleState, exampleRecentFilings } from '../../tests/model-examples';

describe('workspaceReducer', () => {
  const initial: State | undefined = reducer(exampleState, {type: '????'});

  it('is initially undefined', () => {
    expect(initial).toBeUndefined();
  });

  /** Tests for filings reducer */
  it('clears filings when fetching', () => {
    const after: State | undefined = reducer(exampleState, fetchFilingsAction());
    expect(after).toBeDefined();
    expect(after!.recentFilings).toEqual({loading: true});
  });

  it('stores filings when received', () => {
    const after: State | undefined = reducer(exampleState, receivedFilingsAction(exampleRecentFilings));
    expect(after).toBeDefined();
    expect(after!.recentFilings).toEqual({loading: false, value: exampleRecentFilings});
  });

  it('stores error when failed', () => {
    const after: State | undefined = reducer(exampleState, failedFilingsAction('Oh no'));
    expect(after).toBeDefined();
    expect(after!.recentFilings).toEqual({loading: false, error: 'Oh no'});
  });

  const file = new File(['Hello world'], 'name-of-file.txt', {type: 'text/plain'});
  const params: ValidationParams = {
    profile: 'uiid-of-profile',
    file,
  };
  const app = WORKSPACE_APPS.validator;

  /** Tests for upload reducer */
  it('clears upload state when uploading', () => {
    const after: State | undefined = reducer(exampleState, uploadAction(app, params));
    expect(after).toBeDefined();
    expect(after!.upload).toEqual({uploading: true});
  });

  it('stores error when failed', () => {
    const after: State | undefined = reducer(exampleState, uploadFailedAction('Oh no'));
    expect(after).toBeDefined();
    expect(after!.upload).toEqual({uploading: false, error: 'Oh no'});
  });
});
