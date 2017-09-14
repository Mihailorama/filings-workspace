/**
 * State of the app as a whole.
 */

import { User, App, Profile, ValidationStatus } from './models';

export type CheckingPhase = 'form' | 'uploading' | 'uploading-failed' | 'checking' | 'results' | 'checking-failed';

export interface CheckerState {
  user?: User;
  apps?: App[];
  profiles?: Profile[];
  phase: CheckingPhase;
  status?: ValidationStatus;
  message?: string;  // May be defined if in failed phase.
}
