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

import { reducer as appBar } from './corefiling/reducers';
import { reducer as statistics } from './statistics/reducers';
import { reducer as validator } from './validator/reducers';
import { reducer as viewer } from './viewer/reducers';
import { reducer as workspace } from './workspace/reducers';
import { reducer as benfords } from './benford/reducers';
import { routerReducer as router } from 'react-router-redux';

export const reducers = {
  appBar,
  benfords,
  router,
  statistics,
  validator,
  viewer,
  workspace,
};
