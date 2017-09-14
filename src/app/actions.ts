/**
 * Actions understood by the checker.
 */
import { Action } from 'redux';

import { User, App, Profile, ValidationParams, ValidationStatus } from './models';

// Actions for aquiring the list of profiles needed by the form.

export const STARTUP_INFO_RECEIVED = 'STARTUP_INFO_RECEIVED';
export const STARTUP_INFO_FAILED = 'STARTUP_INFO_FAILED';

export interface StartupInfoReceivedAction extends Action {
  user: User;
  apps: App[];
  profiles: Profile[];
}

export function startupInfoReceivedAction(user: User, apps: App[], profiles: Profile[]): StartupInfoReceivedAction {
  return {type: STARTUP_INFO_RECEIVED, user, apps, profiles};
}

export interface StartupInfoFailedAction extends Action {
  message: string;
}

export function startupInfoFailedAction(message: string): StartupInfoFailedAction {
  return {type: STARTUP_INFO_FAILED, message};
}

// Actions for performing the checking operation itself.

export const CHECKING_START = 'CHECKING_START';
export const CHECKING_REQUESTED = 'CHECKING_REQUESTED';
export const CHECKING_RECEIVED = 'CHECKING_RECEIVED';
export const CHECKING_FAILED = 'CHECKING_FAILED';

export interface CheckingAction extends Action {
  params: ValidationParams;
}

export function checkingStartAction(params: ValidationParams): CheckingAction {
  return {type: CHECKING_START, params};
}

export function checkingRequestedAction(params: ValidationParams): CheckingAction {
  return {type: CHECKING_REQUESTED, params};
}

export interface CheckingReceivedAction extends Action {
  status: ValidationStatus;
}

export function checkingReceivedAction(status: ValidationStatus): CheckingReceivedAction {
  return {type: CHECKING_RECEIVED, status};
}

export interface CheckingFailedAction extends Action {
  message: string;
}

export function checkingFailedAction(message: string): CheckingFailedAction {
  return {type: CHECKING_FAILED, message};
}
