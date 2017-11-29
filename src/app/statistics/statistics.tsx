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

import ContactDetails from '../components/contact-details';
import { Item } from '../state';

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

export interface StatisticsProps {
  statistics: Item<Statistic[]>;
}

export default function Statistics({statistics}: StatisticsProps): JSX.Element {
  return <div className='app-Statistics-container'>
    <div className='app-Statistics'>
      <div className='app-Statistics-inner'>
        <div className='app-Statistics-title'>Filing statistics</div>
        {statistics.value && (statistics.value.length > 0 ?
          <StatisticsTable statistics={statistics.value} /> :
          <div className='app-Statistics-noResults'>No statistics.</div>)}
        {statistics.error && <div className='app-Statistics-error'>{statistics.error}</div>}
        {statistics.loading && <div className='app-Statistics-loading'>loading…</div>}
      </div>
    </div>
    <ContactDetails apiLink />
  </div>;
}
