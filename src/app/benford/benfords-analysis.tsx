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
import * as classNames from 'classnames';
import { AnalysisResponse } from '@cfl/digit-frequency-analysis-service';

import { BenfordPhase } from './models';
import Graph from './benford-graph';
import BoxTitle from './box-title';
import InfoLarge from './info-box-icon';
import SearchBox from './search-box';

import './benfords-analysis.less';

export interface BenfordsAnalysisProps {
  searchText?: string;
  onSearch?: () => any;
  filingName?: string;
  analysis?: AnalysisResponse;
  phase: BenfordPhase;
  message?: string;
  onSearchTextChange: (search: string) => any;
}

function FilingHeader({message, filingName}: {message?: string; filingName?: string}): JSX.Element {
  const content = message ? message : filingName ? <FilingMatchDetails filingName={filingName}/> : 'No results';
  return (
    <div className='app-FilingHeader'>
      <div className='app-FilingHeader-inner'>
        {content}
      </div>
    </div>
  );
}

function FilingMatchDetails({filingName}: {filingName: string}): JSX.Element {
    return (
    <span>
      <span className='app-FilingHeader-name' title={filingName}>{filingName}</span>
    </span>
  );
}

function Stats({response}: {response?: AnalysisResponse}): JSX.Element {
  return <div className='app-Stats'>
    {response &&
      <div className='app-Stats-container'>
        <Stat name='&chi;&sup2; value' value={response.chiSquared} tooltip={
          <div>
            The &chi;&sup2; value is a measure used to determine whether there is a significant difference between
            the expected frequencies and the observed frequencies.
            <p />
            A lower value suggests that the data is closer to the distribution proposed by Benford's Law.
            <p />
            A value above 15.51 indicates that this distribution is 5% likely to follow Benford's Law.
            <br />
            A value above 20.09 indicates that this distribution is 1% likely to follow Benford's Law.
          </div>
        } />
        <Stat name='Mean absolute deviation' percentage={true} value={response.meanAbsoluteDeviation} tooltip={
          <div>
            The MAD is the average difference between the probability predicted by Benford's Law &amp;
            the probability calculated from the data.
            <p />
            A lower value for this measure indicates that the data more closely obeys Benford's Law.
          </div>
        } />
      </div>
      }
    {response && <div className='app-Stats-count'>{response.analysedFactCount} facts analysed</div>}
  </div>;
}

function Stat(props: {name: string, value?: number, percentage?: boolean, tooltip?: string | JSX.Element}): JSX.Element {
  const { name, percentage, value, tooltip } = props;
  const format = new Intl.NumberFormat(window.navigator.language || 'en-US', {maximumFractionDigits: 2});
  return <div className='app-Stat'>
    <div className='app-Stat-name'>
      <BoxTitle title={name} tooltip={tooltip} />
    </div>
    <div className='app-Stat-main'>
      {value === undefined ?
        <div className='app-Stat-missingvalue'>N/A</div> :
        <div className='app-Stat-value'>{percentage ? format.format(value * 100) + '%' : format.format(value)}</div>
      }
    </div>
  </div>;
}

export default function BenfordsAnalysis(props: BenfordsAnalysisProps): JSX.Element {
  const {analysis, filingName, message, onSearch, onSearchTextChange, phase, searchText} = props;
  const error = phase === 'failed';
  const loading = phase === 'searching' || phase === 'analysing';
  const searchDisabled = phase !== 'ready';
  return (
    <div className='app-BenfordsAnalysis'>
      <div className='app-BenfordsAnalysis-interactive'>
        <div className='app-BenfordsAnalysis-intro'>
          <SearchBox onSearch={onSearch} onSearchTextChange={onSearchTextChange} searchText={searchText}
            placeholder='Company name or number'
            disabled={searchDisabled} />
          {phase !== 'searching' &&
            <FilingHeader message={error ? message : undefined} filingName={filingName} />
          }
        </div>
        <div className={classNames('app-BenfordsResults', {'app-BenfordsResults-loading': loading})}>
          <div>
            {loading || !analysis ||
              <div className='app-BenfordsResults-details'>
                <Graph response={analysis} />
                <Stats response={analysis} />
              </div>
            }
          </div>
        </div>
      </div>
      <div className='app-BenfordsAnalysis-explanation'>
        <InfoLarge className='app-BenfordsAnalysis-explanation-logo' />
        <div className='app-BenfordsAnalysis-explanation-text'>
          <div className='app-BenfordsAnalysis-explanation-what'>
            Benford's law is an observation about the frequency distribution of leading digits
            in many real-life sets of numerical data that has applications in accounting fraud
            detection.
          </div>
          <div className='app-BenfordsAnalysis-explanation-how'>
            Enter the name or CIK for a US SEC (EDGAR) filer to analyse how the numbers in
            their latest filing conform to Benford's law.
          </div>
        </div>
      </div>
    </div>
  );
}
