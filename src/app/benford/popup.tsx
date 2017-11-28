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

import './popup.less';

interface PopupProps extends React.Props<Popup> {
  visible: boolean;
  width?: number;
  align?: 'left' | 'center' | 'right';
}

export default class Popup extends React.Component<PopupProps> {
  render(): JSX.Element {
    const { visible, children } = this.props;
    const width = this.props.width || 300;
    const align = this.props.align || 'left';

    const originLeft = align === 'left' ? 20 : align === 'right' ? width - 20 : (width / 2);
    return <div className='app-Popup' style={{opacity: visible ? 1 : 0, marginLeft: -originLeft}}>
      <svg style={{left: originLeft - 15}}>
        <polygon points='0,15 15,0 30,15' />
        <polyline points='5,10 15,0 25,10' />
      </svg>
      <div className='app-Popup-text' style={{width: width - 36}}>
        {children}
      </div>
    </div>;
  }
}
