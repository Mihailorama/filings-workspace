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

import * as classNames from 'classnames';
import * as React from 'react';

import './close-symbol.less';

export interface CloseSymbolProps {
  className?: string;
  r?: number;
  height?: number;
  strokeWidth?: number;
  circleStrokeWidth?: number;
  ell?: number;
  stroke?: string;
  fill?: string;
}

function CloseSymbol({className, ell = 10, r = 12, strokeWidth = 2, circleStrokeWidth = 0, stroke, fill}: CloseSymbolProps): JSX.Element {
  return <svg xmlns='http://www.w3.org/2000/svg'
      viewBox={`0 0 ${2 * r} ${2 * r}`}
      width={2 * r} accentHeight={2 * r}
      className={classNames('ckr-CloseSymbol', className)}>
    <g stroke={stroke}>
      <circle cx={r} cy={r} r={r - 0.5 * circleStrokeWidth} fill={fill} strokeWidth={circleStrokeWidth}/>
      <path d={`M${r - 0.5 * ell},${r - 0.5 * ell}l${ell},${ell}m0,${-ell}l${-ell},${ell}`} strokeWidth={strokeWidth}/>
    </g>
  </svg>;
}

export default CloseSymbol;
