import { startupInfoReceivedAction,
   checkingRequestedAction, checkingReceivedAction, checkingFailedAction } from '../actions';
import { ValidationParams } from '../models';
import { checker } from '../reducers';

describe('checker (reducer)', () => {
  const params: ValidationParams = {
    profile: 'CRD V 1.69.42',
    file: new File(['hello'], 'x.brl'),
  };

  const initial = checker(undefined, {type: '????'});

  it('is initially in the form', () => {
    expect(initial.phase).toBe('form');
    expect(initial.status).toBeUndefined();
  });

  it('remembers profiles', () => {
    const user = {sub: 'uuid-of-user', name: 'Uttara Todorov', email: 'ut@example.com', preferred_username: 'ut'};
    const apps = [{id: 'app'}];
    const profiles = [{id: 'profilename', name: 'Profile Label'}];
    const after = checker(initial, startupInfoReceivedAction(user, apps, profiles));

    expect(after.user).toEqual(user);
    expect(after.apps).toEqual(apps);
    expect(after.profiles).toEqual(profiles);
  });

  it('switches to results as soon as checking requested', () => {
    const after = checker(initial, checkingRequestedAction(params));

    expect(after.phase).toBe('checking');
  });

  it('remembers validation status', () => {
    const after = checker(initial, checkingReceivedAction('OK'));

    expect(after.status).toBe('OK');
  });

  it('treats failing tpo getg status as fatal error', () => {
    const after = checker(initial, checkingFailedAction('LOLWAT'));

    expect(after.status).toBe('FATAL_ERROR');
  });
});
