import * as React from 'react';
import { Tree, shallowRender } from 'skin-deep';

import App from '../app';

describe('App', () => {
  let sut: Tree<{}, {}>;

  beforeEach(() => {
    sut = shallowRender(<App />);
  });

  it('Says Hello!', () => {
    const title = sut.subTree('h1');
    expect(title.text()).toEqual('Hello world!');
  });
});
