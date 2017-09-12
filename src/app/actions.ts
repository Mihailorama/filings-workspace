/**
 * Actions understood by the checker.
 */
import { Action } from 'redux';

import { Profile, ValidationParams, ValidationStatus } from './models';

// Actions for aquiring the list of profiles needed by the form.

export const VALIDATION_PROFILES_RECEIVED = 'VALIDATION_PROFILES_RECEIVED';
export const VALIDATION_PROFILES_FAILED = 'VALIDATION_PROFILES_FAILED';

export interface ValidationProfilesReceivedAction extends Action {
  profiles: Profile[];
}

export function validationProfilesReceivedAction(profiles: Profile[]): ValidationProfilesReceivedAction {
  return {type: VALIDATION_PROFILES_RECEIVED, profiles};
}

export interface ValidationProfilesFailedAction extends Action {
  message: string;
}

export function validationProfilesFailedAction(message: string): ValidationProfilesFailedAction {
  return {type: VALIDATION_PROFILES_FAILED, message};
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
