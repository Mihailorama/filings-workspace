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

import { Statistic } from '@cfl/filing-statistics-service';

import './statistics.less';

function StatisticsTable({statistics}: {statistics: Statistic[]}): JSX.Element {
  return <table className='ckr-StatisticsTable'>
    <tbody>
      {statistics.map(statistic => (
        <tr key={statistic.name}>
          <td className='ckr-StatisticsTable-name'>{statistic.label}</td>
          <td className='ckr-StatisticsTable-value'>{statistic.value}</td>
        </tr>
      ))}
    </tbody>
  </table>;
}

export interface StatisticsPopupProps {
  statistics?: Statistic[];
  onCloseClick?: () => void;
}

export default function StatisticsPopup({statistics, onCloseClick}: StatisticsPopupProps): JSX.Element {
  const loadingHeight = 240;
  const rowHeight = 24;
  const tableHeight = statistics ? Math.max(1, statistics.length) * rowHeight : loadingHeight;
  const popupHeight = tableHeight + 35;
  return <div>
    <div className='ckr-StatisticsPopup-cover' onClick={onCloseClick} />
    <div className='ckr-StatisticsPopup' style={{marginTop: -popupHeight / 2}}>
      <div className='ckr-StatisticsPopup-title'>
        <div className='ckr-StatisticsPopup-title-text'>Filing statistics</div>
        <button onClick={onCloseClick} title='Close statistics'>
          <svg width={7} height={8}>
            <line x1={0} y1={0} x2={7} y2={8} />
            <line x1={0} y1={8} x2={7} y2={0} />
          </svg>
        </button>
      </div>
      {!statistics && <div className='ckr-StatisticsPopup-loading' />}
      {statistics && (statistics.length > 0 ?
        <StatisticsTable statistics={statistics} /> :
        <div className='ckr-StatisticsPopup-noResults'>No statistics.</div>)}
    </div>
  </div>;
}
