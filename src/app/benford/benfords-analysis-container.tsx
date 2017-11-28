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
import { Component, Props } from 'react';
import { connect, MapDispatchToProps } from 'react-redux';
import { AnalysisResponse } from '@cfl/digit-frequency-analysis-service';

import { State } from '../state';
import { BenfordPhase } from './state';
import BenfordsAnalysis from './benfords-analysis';
import { analyseAction, searchAction, searchTextChangedAction } from './actions';

type OwnProps = Props<BenfordsAnalysisContainer>;

interface PropsFromState {
  phase: BenfordPhase;
  error?: string;
  searchText: string;
  filingName?: string;
  analysis?: AnalysisResponse;
  message?: string;
}

interface PropsFromDispatch {
  onSearch: typeof searchAction;
  onSearchTextChange: typeof searchTextChangedAction;
  fetchFilingVersion: typeof analyseAction;
}

interface PropsFromRouter {
  match: {params: {filingVersionId: string}};
}

type BenfordsAnalysisContainerProps = OwnProps & PropsFromState & PropsFromDispatch & PropsFromRouter;

class BenfordsAnalysisContainer extends Component<BenfordsAnalysisContainerProps> {

  componentDidMount(): void {
    const {filingVersionId} = this.props.match.params;
    if (filingVersionId) {
      this.props.fetchFilingVersion(filingVersionId);
    }
  }

  componentWillReceiveProps(nextProps: BenfordsAnalysisContainerProps): void {
    const {filingVersionId} = nextProps.match.params;
    if (filingVersionId && filingVersionId !== this.props.match.params.filingVersionId) {
      this.props.fetchFilingVersion(filingVersionId);
    }
  }

  render(): JSX.Element {
    const {message, phase,
      onSearch, onSearchTextChange,
      searchText, filingName, analysis} = this.props;
    return (
      <BenfordsAnalysis
        message={message}
        onSearch={() => onSearch(searchText)}
        onSearchTextChange={onSearchTextChange}
        phase={phase}
        searchText={searchText}
        filingName={filingName}
        analysis={analysis}
        />
    );
  }
}

function propsFromState(state: State): PropsFromState {
  const { message, phase, searchText, filingName, analysisResults: analysis } = state.benford;
  return { message, phase, searchText, filingName, analysis };
}

const propsFromDispatch: MapDispatchToProps<PropsFromDispatch, {}> = {
  onSearch: searchAction,
  onSearchTextChange: searchTextChangedAction,
  fetchFilingVersion: analyseAction,
};

export default connect(propsFromState, propsFromDispatch)(BenfordsAnalysisContainer);
