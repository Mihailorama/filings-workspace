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

import Info from './info';
import Popup from './popup';

import './box-title.less';

interface BoxTitleProps extends React.Props<BoxTitle> {
  title: string;
  tooltip?: string | JSX.Element;
  align?: 'left' | 'center' | 'right';
  width?: number;
}

interface BoxTitleState {
  popupVisible: boolean;
}

export default class BoxTitle extends React.Component<BoxTitleProps, BoxTitleState> {
  constructor(props: BoxTitleProps) {
    super(props);
    this.state = {popupVisible: false};
  }

  render(): JSX.Element {
    const {title, tooltip, align, width} = this.props;
    const {popupVisible} = this.state;
    return <div className='app-BoxTitle'>
      {tooltip &&
      <span>
          <Popup visible={popupVisible} align={align || 'center'} width={width}>{tooltip}</Popup>
          <Info className='app-BoxTitle-icon'
                onMouseOver={() => this.setState({popupVisible: true})}
                onMouseLeave={() => this.setState({popupVisible: false})}
          />
        </span>
      }
      {title}
    </div>;
  }
}
