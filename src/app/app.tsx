import * as React from 'react';
import { Component } from 'react';

import Hello from './components/hello';

export default class App extends Component<{}, {}> {
  render(): JSX.Element {
    return (
      <div>
        <h1>Hello world!</h1>
        <Hello name='Bob' />
      </div>
    );
  }
}
