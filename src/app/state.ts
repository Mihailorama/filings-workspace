/**
 * State of the app as a whole.
 */

import { Profile, ValidationStatus } from './models';

export type CheckingPhase = 'form' | 'checking';

export interface CheckerState {
  phase: CheckingPhase;
  profiles?: Profile[];
  status?: ValidationStatus;
}
