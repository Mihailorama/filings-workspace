/*
 *  Copyright 2017 CoreFiling S.A.R.L.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { startupInfoReceivedAction,
   uploadStartedAction, uploadFailedAction,
   checkingStartedAction, checkingReceivedAction, checkingFailedAction } from '../actions';
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
    const apps = [{id: 'app', name: 'App', href: '/app/'}];
    const profiles = [{id: 'profilename', name: 'Profile Label'}];
    const after = checker(initial, startupInfoReceivedAction(user, apps, profiles));

    expect(after.user).toEqual(user);
    expect(after.apps).toEqual(apps);
    expect(after.profiles).toEqual(profiles);
  });

  it('switches to results as soon as checking requested', () => {
    const after = checker(initial, uploadStartedAction(params));

    expect(after.phase).toBe('uploading');
    expect(after.status).toBeFalsy();
  });

  it('switches to results as soon as checking requested', () => {
    const after = checker(initial, uploadFailedAction('LOLWAT'));

    expect(after.phase).toBe('uploading-failed');
    expect(after.status).toBeFalsy();
  });

  it('switches to results as soon as checking requested', () => {
    const after = checker(initial, checkingStartedAction());

    expect(after.phase).toBe('checking');
    expect(after.status).toBeFalsy();
  });

  it('remembers validation status', () => {
    const after = checker(initial, checkingReceivedAction('OK'));

    expect(after.phase).toBe('results');
    expect(after.status).toBe('OK');
  });

  it('treats failing to get status after checking started as fatal error', () => {
    const after = checker(initial, checkingFailedAction('LOLWAT'));

    expect(after.phase).toBe('checking-failed');
    expect(after.status).toBe('FATAL_ERROR');
  });
});
