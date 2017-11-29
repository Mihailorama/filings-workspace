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

/**
 * State of the app as a whole.
 */

import { RouterState } from 'react-router-redux';
import { BenfordsState } from './benford/reducers';
import { ViewerState } from './viewer/reducers';
import { StatisticsState } from './statistics/reducers';
import { WorkspaceState } from './workspace/reducers';
import { ValidatorState } from './validator/reducers';
import { AppBarState } from './corefiling/reducers';
import OimState from './oim-converter/state';

export interface Item<T> {
  loading: boolean;
  error?: string;
  value?: T;
}

export interface State {
  appBar: AppBarState;
  benfords: BenfordsState;
  oimConverter: OimState;
  router: RouterState;
  statistics: StatisticsState;
  validator: ValidatorState;
  viewer: ViewerState;
  workspace: WorkspaceState;
}
