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
  module.hot.accept(['./app'], () => {
    // tslint:disable:variable-name
    const NextApp = require<RequireImport>('./app').default;
    // tslint:enable:variable-name
    render(<NextApp />);
  });
}
