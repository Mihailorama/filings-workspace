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

import './filing-reference.less';

interface FilingReferenceProps {
  className?: string;
  name: string;
}

export default function FilingReference({className, name}: FilingReferenceProps): JSX.Element {
  return <div className={classNames('app-FilingReference', className)}>
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 24' className='app-FilingReference-icon'>
      <path className='app-FilingReference-outline' d='M1,1H11l6,8V23H1z'/>
      <path className='app-FilingReference-inline' d='M11,1l-2,6 8,2'/>
    </svg>
    <div className='app-FilingReference-name'>{name}</div>
  </div>;
}
