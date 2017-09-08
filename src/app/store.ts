import { createStore } from 'redux';

import { checker } from './reducers';

const windowPlus: {__REDUX_DEVTOOLS_EXTENSION__: any} = window as any;

const store = createStore(
  checker,
  windowPlus.__REDUX_DEVTOOLS_EXTENSION__ && windowPlus.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
