import * as React from 'react';

import { validationProfilesReceivedAction,
   checkingRequestedAction, checkingReceivedAction } from '../actions';
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
    const profiles = [{name: 'profilename', label: 'Profile Label'}];
    const after = checker(initial, validationProfilesReceivedAction(profiles));

    expect(after.profiles).toEqual(profiles);
  });

  it('switches to results as soon as checking requested', () => {
    const after = checker(initial, checkingRequestedAction(params));

    expect(after.phase).toBe('checking');
  });

  it('remembers validation status', () => {
    const after = checker(initial, checkingReceivedAction('valid'));

    expect(after.status).toBe('valid');
  });
});
