import * as React from 'react';
import { Component } from 'react';

export interface HelloProps {
  name: string;
}

export default class Hello extends Component<HelloProps, {}> {

  render(): JSX.Element {
    const { name } = this.props;
    return(
      <h1>{`Hello ${name}!`}</h1>
    );
  }
}
