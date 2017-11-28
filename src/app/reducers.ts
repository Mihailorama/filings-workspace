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
 * Reducers (in the Redux sense).
 */
import { Action } from 'redux';

import { State } from './state';
import { reducer as appBarReducer } from './corefiling/reducers';
import { reducer as statisticsReducer } from './statistics/reducers';
import { reducer as validatorReducer } from './validator/reducers';
import { reducer as viewerReducer } from './viewer/reducers';
import { reducer as workspaceReducer } from './workspace/reducers';
import { routerReducer } from 'react-router-redux';

export function globalReducer(state: State | undefined, action: Action): State {
  if (!state) {
    return {
      apps: {loading: false, value: []},
      user: {loading: false},
      profiles: {loading: false, value: []},
      recentFilings: {loading: false, value: []},
      status: {},
      selectedTablePage: {},
      statistics: {},
      tableRendering: {},
      tables: {},
      zOptions: {},
      router: routerReducer(undefined as any, undefined as any),
    };
  }

  let newState;
  newState = appBarReducer(state, action);
  if (newState) {
    return newState;
  }
  newState = statisticsReducer(state, action);
  if (newState) {
    return newState;
  }
  newState = validatorReducer(state, action);
  if (newState) {
    return newState;
  }
  newState = viewerReducer(state, action);
  if (newState) {
    return newState;
  }
  newState = workspaceReducer(state, action);
  if (newState) {
    return newState;
  }

  // We should restructure the state so we can switch to using combineReducers.
  const newRouterState = routerReducer(state.router, action);
  if (newRouterState) {
    return {... state, router: newRouterState};
  }

  return state;
}
export default globalReducer;
