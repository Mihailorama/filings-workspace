/**
 * State of the app as a whole.
 */

import { ValidationProfile } from './models';

export type CheckingPhase = 'form' | 'checking';

export type ValidationStatus = 'loading' | 'valid' | 'invalid' | 'failed';

export interface CheckerState {
  phase: CheckingPhase;
  profiles?: ValidationProfile[];
  status?: ValidationStatus;
}
