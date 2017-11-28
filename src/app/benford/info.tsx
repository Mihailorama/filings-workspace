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

interface InfoProps {
  className: string;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
}

export default function Info({className, onMouseOver, onMouseLeave}: InfoProps): JSX.Element {
  return (
    /* tslint:disable */
    <svg className={className} width="19px" height="19px" viewBox="0 0 19 19" version="1.1" onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-822.000000, -220.000000)">
                <g transform="translate(823.000000, 221.000000)">
                    <circle stroke="#FFFFFF" cx="8.5" cy="8.5" r="8.5"></circle>
                    <rect fill="#FFFFFF" x="8.06779661" y="4.89830508" width="1.15254237" height="9.22033898" rx="0.576271186"></rect>
                    <circle fill="#FFFFFF" cx="8.6440678" cy="3.45762712" r="1"></circle>
                </g>
            </g>
        </g>
    </svg>
    /* tslint:enable */
  );
}
