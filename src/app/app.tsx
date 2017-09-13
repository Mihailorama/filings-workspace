import * as React from 'react';
import { Component } from 'react';
import { Provider } from 'react-redux';

import store from './store';
import CheckerAppContainer from './containers/checker-app-container';

export default class App extends Component<{}> {
  render(): JSX.Element {
    return (
      <Provider store={store}>
        <CheckerAppContainer/>
      </Provider>
    );
  }
}
