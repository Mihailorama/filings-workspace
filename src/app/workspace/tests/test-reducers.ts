import {
  failedProfilesAction,
  fetchProfilesAction,
  receivedProfilesAction,
  failedFilingsAction,
  fetchFilingsAction,
  receivedFilingsAction,
  uploadAction,
  uploadFailedAction,
  searchTextChangedAction,
  searchAction,
  searchResultsReceivedAction,
  searchFailedAction,
  searchSelectionFailedAction,
} from '../actions';
import { reducer, WorkspaceState } from '../reducers';
import { WORKSPACE_APPS } from '../workspace-apps';
import { ValidationParams } from '../../models';
import { exampleWorkspaceState, exampleRecentFilings } from '../../tests/model-examples';
import { FilingMatch } from '../../fullbeam-search/models';
import { exampleFilingMatch } from '../../benford/tests/model-examples';

const initial: WorkspaceState = reducer(undefined, {type: '????'});

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
    const after: WorkspaceState = reducer(exampleWorkspaceState, fetchProfilesAction());
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
    const after: WorkspaceState = reducer(exampleWorkspaceState, failedProfilesAction('Oh no'));
    expect(after).toBeDefined();
    expect(after!.profiles).toEqual({loading: false, error: 'Oh no'});
  });
});

describe('filingsReducer', () => {

  it('clears filings when fetching', () => {
    const after: WorkspaceState = reducer(exampleWorkspaceState, fetchFilingsAction());
    expect(after).toBeDefined();
    expect(after!.recentFilings).toEqual({loading: true});
  });

  it('stores filings when received', () => {
    const after: WorkspaceState = reducer(exampleWorkspaceState, receivedFilingsAction(exampleRecentFilings));
    expect(after).toBeDefined();
    expect(after!.recentFilings).toEqual({loading: false, value: exampleRecentFilings});
  });

  it('stores error when failed', () => {
    const after: WorkspaceState = reducer(exampleWorkspaceState, failedFilingsAction('Oh no'));
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
    const after: WorkspaceState = reducer(exampleWorkspaceState, uploadAction(app, params));
    expect(after).toBeDefined();
    expect(after!.upload).toEqual({uploading: true});
  });

  it('stores error when failed', () => {
    const after: WorkspaceState = reducer(exampleWorkspaceState, uploadFailedAction('Oh no'));
    expect(after).toBeDefined();
    expect(after!.upload).toEqual({uploading: false, error: 'Oh no'});
  });
});

describe('reducer (searching)', () => {
  it('remembers search text as it is typed', () => {
    const after = reducer(exampleWorkspaceState, searchTextChangedAction('banjolele'));

    expect(after.search.text).toEqual('banjolele');
  });

  it('enters loading state when user searches', () => {
    const after = reducer(exampleWorkspaceState, searchAction('squonk'));

    expect(after.search.filings.loading).toBeTruthy();
    expect(after.search.filings.value).toBeUndefined();
    expect(after.search.text).toEqual('squonk');
  });

  it('enters loaded state when results arrive', () => {
    const filingMatches: FilingMatch[] = [exampleFilingMatch];
    const after = reducer(exampleWorkspaceState, searchResultsReceivedAction(filingMatches));

    expect(after.search.filings.loading).toBeFalsy();
    expect(after.search.filings.value).toBe(filingMatches);
  });

  it('enters error state when search fails', () => {
    const after = reducer(exampleWorkspaceState, searchFailedAction('LOLWAT'));

    expect(after.search.filings.loading).toBeFalsy();
    expect(after.search.filings.error).toEqual('LOLWAT');
  });

  it('enters error state when selection failed', () => {
    const after = reducer(exampleWorkspaceState, searchSelectionFailedAction('LOLWAT'));

    expect(after.search.filings.loading).toBeFalsy();
    expect(after.search.filings.error).toEqual('LOLWAT');
  });
});
