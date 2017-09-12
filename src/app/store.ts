import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { checker } from './reducers';
import { validationProfilesSaga, checkingSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();

const windowPlus: {
  __REDUX_DEVTOOLS_EXTENSION__?: any;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
} = window as any;

const composeEnhancers = windowPlus.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  checker,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(validationProfilesSaga);
sagaMiddleware.run(checkingSaga);

export default store;
