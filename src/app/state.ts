/**
 * State of the app as a whole.
 */

import { User, App, Profile, ValidationStatus } from './models';

export type CheckingPhase = 'form' | 'checking';

export interface CheckerState {
  user?: User;
  apps?: App[];
  phase: CheckingPhase;
  profiles?: Profile[];
  status?: ValidationStatus;
}
