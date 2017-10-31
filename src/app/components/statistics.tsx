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

export interface StatisticsProps {
  statistics?: Statistic[];
  onExpand?: () => void;
}
export interface StatisticsState {
  expanded: boolean;
}
export default class Statistics extends React.Component<StatisticsProps, StatisticsState> {
  constructor(props: StatisticsProps) {
    super(props);
    this.state = {expanded: false};
  }
  toggleExpand(): void {
    this.setState({expanded: !this.state.expanded}, () =>
      this.state.expanded && this.props.onExpand && this.props.onExpand());
  }
  render(): JSX.Element {
    const { statistics } = this.props;
    const { expanded } = this.state;
    return (
      <div className='ckr-Statistics'>
        <div className='ckr-Statistics-heading'>
          <button onClick={() => this.toggleExpand()}>Filing details</button>
        </div>
        {expanded && !statistics && <div className='ckr-Statistics-loading' />}
        {expanded && statistics && (statistics.length > 0 ?
          <table>
            <tbody>
              {statistics.map(statistic => (
                <tr key={statistic.name}>
                  <th className='ckr-Statistic-name'>{`${statistic.label}: `}</th>
                  <td className='ckr-Statistic-value'>{statistic.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          : <div>No statistics.</div>
        )}
      </div>
    );
  }
}
