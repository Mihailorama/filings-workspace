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

export interface FailedAction extends Action {
  message?: string;
}

export function startupInfoFailedAction(message: string): FailedAction {
  return {type: STARTUP_INFO_FAILED, message};
}

// Actions for performing the checking operation itself.

export const CHECKING_START = 'CHECKING_START';  // Sent by UI to request checking.
export const UPLOAD_STARTED = 'UPLOAD_STARTED';  // from saga when upload begins
export const CHECKING_STARTED = 'UPLOAD_COMPLETE';  // From saga when file is uploaded and checking begins
export const UPLOAD_FAILED = 'UPLOAD_FAILED';  // From saga if uplaod fails.
export const CHECKING_RECEIVED = 'CHECKING_RECEIVED';  // From saga when results ready at long last.
export const CHECKING_FAILED = 'CHECKING_FAILED';

export interface CheckingAction extends Action {
  params: ValidationParams;
}

export function checkingStartAction(params: ValidationParams): CheckingAction {
  return {type: CHECKING_START, params};
}

export function uploadStartedAction(params: ValidationParams): CheckingAction {
  return {type: UPLOAD_STARTED, params};
}

export function checkingStartedAction(): Action {
  return {type: CHECKING_STARTED};
}

export function uploadFailedAction(message?: string): FailedAction {
  return {type: UPLOAD_FAILED, message};
}

export interface CheckingReceivedAction extends Action {
  status: ValidationStatus;
}

export function checkingReceivedAction(status: ValidationStatus): CheckingReceivedAction {
  return {type: CHECKING_RECEIVED, status};
}

export function checkingFailedAction(message: string): FailedAction {
  return {type: CHECKING_FAILED, message};
}
