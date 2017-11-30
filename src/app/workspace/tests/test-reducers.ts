import {
  failedProfilesAction,
  fetchProfilesAction,
  receivedProfilesAction,
  failedFilingsAction,
  fetchFilingsAction,
  receivedFilingsAction,
  uploadAction,
  uploadFailedAction,
} from '../actions';
import { reducer, WorkspaceState } from '../reducers';
import { WORKSPACE_APPS } from '../workspace-apps';
import { ValidationParams } from '../../models';
import { exampleWorkspaceState, exampleRecentFilings } from '../../tests/model-examples';

const initial: WorkspaceState | undefined = reducer(undefined, {type: '????'});

describe('profilesReducer', () => {
  it('sets initial state', () => {
    const expected: WorkspaceState = {
      profiles: {loading: false, value: []},
      recentFilings: {loading: false, value: []},
      search: { text: '', filings: { loading: false } },
      mode: 'user',
    };
    expect(initial).toEqual(expected);
  });

  it('clears profiles when fetching', () => {
    const after: WorkspaceState | undefined = reducer(exampleWorkspaceState, fetchProfilesAction());
    expect(after).toBeDefined();
    expect(after!.profiles).toEqual({loading: true});
  });

  it('stores user and apps when received', () => {
    const profiles = [{id: 'profilename', name: 'Profile Label', category: 'validation'}];
    const after = reducer(exampleWorkspaceState, receivedProfilesAction(profiles));

    expect(after).toBeDefined();
    expect(after!.profiles).toEqual({loading: false, value: profiles});
  });

  it('stores error when failed', () => {
    const after: WorkspaceState | undefined = reducer(exampleWorkspaceState, failedProfilesAction('Oh no'));
    expect(after).toBeDefined();
    expect(after!.profiles).toEqual({loading: false, error: 'Oh no'});
  });
});

describe('filingsReducer', () => {

  it('clears filings when fetching', () => {
    const after: WorkspaceState | undefined = reducer(exampleWorkspaceState, fetchFilingsAction());
    expect(after).toBeDefined();
    expect(after!.recentFilings).toEqual({loading: true});
  });

  it('stores filings when received', () => {
    const after: WorkspaceState | undefined = reducer(exampleWorkspaceState, receivedFilingsAction(exampleRecentFilings));
    expect(after).toBeDefined();
    expect(after!.recentFilings).toEqual({loading: false, value: exampleRecentFilings});
  });

  it('stores error when failed', () => {
    const after: WorkspaceState | undefined = reducer(exampleWorkspaceState, failedFilingsAction('Oh no'));
    expect(after).toBeDefined();
    expect(after!.recentFilings).toEqual({loading: false, error: 'Oh no'});
  });
});

describe('uploadReducer', () => {
  const file = new File(['Hello world'], 'name-of-file.txt', {type: 'text/plain'});
  const params: ValidationParams = {
    profile: 'uiid-of-profile',
    file,
  };
  const app = WORKSPACE_APPS.validator;

  /** Tests for upload reducer */
  it('clears upload state when uploading', () => {
    const after: WorkspaceState | undefined = reducer(exampleWorkspaceState, uploadAction(app, params));
    expect(after).toBeDefined();
    expect(after!.upload).toEqual({uploading: true});
  });

  it('stores error when failed', () => {
    const after: WorkspaceState | undefined = reducer(exampleWorkspaceState, uploadFailedAction('Oh no'));
    expect(after).toBeDefined();
    expect(after!.upload).toEqual({uploading: false, error: 'Oh no'});
  });
});
