/**
 * The App Symbol.
 */

import * as classNames from 'classnames';
import * as React from 'react';
import { Component, Props, CSSProperties } from 'react';

export interface AppSymbolProps extends Props<AppSymbol> {
  className?: string;
  style?: CSSProperties;
}

export default class AppSymbol extends Component<AppSymbolProps> {
  render(): JSX.Element {
    const { className, style } = this.props;

    const height = 24;
    const width = 43;
    const r = height / 2;
    return <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox={`0 0 ${width} ${height}`}
        className={classNames('ckr-AppLogo', className)} style={style}>
      <circle cx={r} cy={r} r={r}/>
      <circle cx={width - r} cy={r} r={r}/>
    </svg>;
  }
}
