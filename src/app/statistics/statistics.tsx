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

export function StatisticsTable({statistics}: {statistics: Statistic[]}): JSX.Element {
  const format = new Intl.NumberFormat(window.navigator.language || 'en-US', {maximumFractionDigits: 2});
  return <table className='app-StatisticsTable'>
    <tbody>
      {statistics.map(statistic => (
        <tr key={statistic.name}>
          <td className='app-StatisticsTable-name'>{statistic.label}</td>
          <td className='app-StatisticsTable-value'>{
            format.format(statistic.value) + (statistic.format === 'percentage' ? '%' : '')
          }</td>
        </tr>
      ))}
    </tbody>
  </table>;
}

function StatisticsPopupTitle({onCloseClick}: {onCloseClick?: () => void}): JSX.Element {
  return <div className='app-StatisticsPopup-title'>
    <div className='app-StatisticsPopup-title-text'>Filing statistics</div>
    <button onClick={onCloseClick} title='Close statistics'>
      <svg width={7} height={8}>
        <line x1={0} y1={0} x2={7} y2={8} />
        <line x1={0} y1={8} x2={7} y2={0} />
      </svg>
    </button>
  </div>;
}

export interface StatisticsPopupProps {
  statistics?: Statistic[];
  onCloseClick?: () => void;
}

export default function StatisticsPopup({statistics, onCloseClick}: StatisticsPopupProps): JSX.Element {
  return <div>
    <div className='app-StatisticsPopup-container'>
      <div className='app-StatisticsPopup-background' onClick={onCloseClick} />
      <div className='app-StatisticsPopup'>
        <StatisticsPopupTitle onCloseClick={onCloseClick}/>
        {!statistics && <div className='app-StatisticsPopup-loading' />}
        {statistics && (statistics.length > 0 ?
          <StatisticsTable statistics={statistics} /> :
          <div className='app-StatisticsPopup-noResults'>No statistics.</div>)}
      </div>
    </div>
  </div>;
}
