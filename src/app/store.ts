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

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';

import { reducers } from './reducers';
import { saga as appBarSaga } from './corefiling/sagas';
import { saga as benfordsSaga } from './benford/sagas';
import { saga as statisticsSaga } from './statistics/sagas';
import { saga as validatorSaga } from './validator/sagas';
import { saga as viewerSaga } from './viewer/sagas';
import { saga as workspaceSaga } from './workspace/sagas';

export const history = createHistory();
const routerMiddleware = createRouterMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const windowPlus: {
  __REDUX_DEVTOOLS_EXTENSION__?: any;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
} = window as any;

const composeEnhancers = windowPlus.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers(reducers),
  composeEnhancers(
    applyMiddleware(sagaMiddleware, routerMiddleware)));

[appBarSaga, benfordsSaga, statisticsSaga, validatorSaga, viewerSaga, workspaceSaga]
  .forEach(s => sagaMiddleware.run(s));

export default store;
