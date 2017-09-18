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

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'normalize.css/normalize.css';

import './styles/style.less';
import App from './app';

const rootElement = document.getElementById('app');
function render(app: JSX.Element): void {
  ReactDOM.render(
    <AppContainer>
      {app}
    </AppContainer>,
    rootElement,
  );
};

render(<App />);

// Hot Module Replacement API
if (module.hot) {
  interface RequireImport {
    default: any;
  }

  module.hot.accept(['./app'], () => {
    // tslint:disable:variable-name
    const NextApp = require<RequireImport>('./app').default;
    // tslint:enable:variable-name
    render(<NextApp />);
  });
}

// Fake response.
// import { validationProfilesReceivedAction } from './actions';
// import store from './store';

// store.dispatch(validationProfilesReceivedAction([
//   {id: 'banana', name: 'Banana'},
//   {id: 'straw', name: 'Strawberry'},
// ]));
