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

import './contact-details.less';

export default function ContactDetails({className}: {className?: string}): JSX.Element {
  return <a className={classNames('ckr-ContactDetails', className)}
      href='https://www.corefiling.com/standing/contactus/' target='_blank'>
    <b className='ckr-Link'>Contact us</b> to find out more!
  </a>;
}
