import * as React from 'react';
import { Tree, shallowRender } from 'skin-deep';

import App from '../app';
import { HelloProps } from '../components/hello';

describe('App', () => {
  let sut: Tree<{}, {}>;

  beforeEach(() => {
    sut = shallowRender(<App />);
  });

  it('Says "Hello world!"', () => {
    const title = sut.subTree('h1');
    expect(title.text()).toEqual('Hello world!');
  });

  it('Says hello to Bob', () => {
    const hello = sut.subTree('Hello') as Tree<HelloProps, {}>;
    expect(hello.props.name).toEqual('Bob');
  });
});
