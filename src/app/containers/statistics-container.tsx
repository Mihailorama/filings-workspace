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
import { Component } from 'react';
import { connect } from 'react-redux';
import { filingStatisticsFetchAction } from '../actions';
import { RouteComponentProps } from 'react-router-dom';
import { State, Item } from '../state';
import { Statistic } from '@cfl/filing-statistics-service';

import Statistics from '../components/statistics';

export type RouterProps = RouteComponentProps<{filingVersionId: string}>;

function filingVersionId(props: RouterProps): string {
  return props.match.params.filingVersionId;
}

export interface StatisticsContainerProps extends RouterProps {
  statistics: Item<Statistic[]>;
  fetchFilingStatistics: typeof filingStatisticsFetchAction;
}

class StatisticsContainer extends Component<StatisticsContainerProps> {

  componentDidMount(): void {
    this.props.fetchFilingStatistics(filingVersionId(this.props));
  }

  componentWillReceiveProps(nextProps: StatisticsContainerProps): void {
    const nextFilingVersionId = filingVersionId(nextProps);
    if (nextFilingVersionId !== filingVersionId(this.props)) {
      this.props.fetchFilingStatistics(nextFilingVersionId);
    }
  }

  render(): JSX.Element {
    const {statistics} = this.props;
    return <Statistics statistics={statistics && statistics.value} />;
  }

}

export default connect(
  (state: State, ownProps: RouterProps) => {
    const statistics = state.statistics[filingVersionId(ownProps)] || {loading: true};
    return {statistics};
  },
  {fetchFilingStatistics: filingStatisticsFetchAction},
)(StatisticsContainer);
