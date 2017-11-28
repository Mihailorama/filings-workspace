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

export default function InfoBoxIcon({className}: {className: string}): JSX.Element {
  return (
    // Copied from info-large.svg
    /* tslint:disable */
    <svg className={className} width="70px" height="70px" viewBox="0 0 70 70" version="1.1" >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-58.000000, -613.000000)">
                <g transform="translate(59.000000, 614.000000)">
                    <circle stroke="#69BEAB" strokeWidth="1.5" cx="34" cy="34" r="34"></circle>
                    <rect fill="#69BEAB" x="32" y="24" width="5" height="35" rx="2.5"></rect>
                    <circle fill="#69BEAB" cx="34.5" cy="14.5" r="2.5"></circle>
                </g>
            </g>
        </g>
    </svg>
    /* tslint:enable */
  );
}
