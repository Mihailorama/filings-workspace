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

import { storiesOf } from '@storybook/react';

import Popup from './popup';

const styles: React.CSSProperties = {
  position: 'absolute',
  left: '200px',
  top: '100px',
};

storiesOf('Popup', module)
  .add('Defaults', () => <div style={styles}><Popup visible={true}>Test text</Popup></div>)
  .add('Invisible', () => <div style={styles}><Popup visible={false}>You shouldn't see this!</Popup></div>)
  .add('Wide', () => <div style={styles}><Popup visible={true} width={1000}>Test text</Popup></div>)
  .add('Center aligned', () => <div style={styles}><Popup visible={true} align='center'>Test text</Popup></div>)
  .add('Right aligned', () => <div style={styles}><Popup visible={true} align='right'>Test text</Popup></div>);
