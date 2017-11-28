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

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { AnalysisResponse, AnalysisResponseDigit } from '@cfl/digit-frequency-analysis-service';
import BenfordsAnalysis, { BenfordsAnalysisProps } from './benfords-analysis';

const etc: BenfordsAnalysisProps = {
  phase: 'ready',
  searchText: 'Example',
  onSearchTextChange: action,
};

const filingName = 'Example company (12345678) 10/K 01 Jan, 2015';
const longFilingName = 'Company with a Very Long Name, Pointlessly So, Inc. (0000000000) 10/K 01 Jan, 2015';
function responseDigit(
  digit: number, actualValue: number, zTest: number, p1: number, p5: number, p50: number, p95: number, p99: number,
): AnalysisResponseDigit {
  return {
    digit,
    proportion: {
      actualValue,
      zTest,
      expectedPercentiles: [
        {percentile: 1, value: p1},
        {percentile: 5, value: p5},
        {percentile: 50, value: p50},
        {percentile: 95, value: p95},
        {percentile: 99, value: p99},
      ],
    },
  };
}
const analysisResults: AnalysisResponse = {
  analysedFactCount: 123,
  meanAbsoluteDeviation: 0.001234,
  chiSquared: 1.23456,
  digits: [
    responseDigit(1, 0.321, 0.01, 0.178, 0.206, 0.301, 0.396, 0.424),
    responseDigit(2, 0.162, 0.01, 0.073, 0.096, 0.176, 0.256, 0.279),
    responseDigit(3, 0.135, 0.02, 0.035, 0.055, 0.125, 0.195, 0.215),
    responseDigit(4, 0.118, 0.01, 0.016, 0.034, 0.097, 0.160, 0.178),
    responseDigit(5, 0.111, 0.02, 0.005, 0.021, 0.079, 0.137, 0.154),
    responseDigit(6, 0.052, 0.02, 0.000, 0.013, 0.067, 0.121, 0.136),
    responseDigit(7, 0.048, 0.01, 0.000, 0.007, 0.058, 0.109, 0.123),
    responseDigit(8, 0.031, 0.02, 0.000, 0.003, 0.051, 0.099, 0.113),
    responseDigit(9, 0.028, 0.03, 0.000, 0.000, 0.046, 0.092, 0.104),
  ],
};

const randomResults: AnalysisResponse = {
  analysedFactCount: 123,
  meanAbsoluteDeviation: 0.123456,
  chiSquared: 1000.3456,
  digits: [
    responseDigit(1, 0.100, 0.01, 0.178, 0.206, 0.301, 0.396, 0.424),
    responseDigit(2, 0.102, 0.01, 0.073, 0.096, 0.176, 0.256, 0.279),
    responseDigit(3, 0.099, 0.02, 0.035, 0.055, 0.125, 0.195, 0.215),
    responseDigit(4, 0.112, 0.01, 0.016, 0.034, 0.097, 0.160, 0.178),
    responseDigit(5, 0.111, 0.02, 0.005, 0.021, 0.079, 0.137, 0.154),
    responseDigit(6, 0.072, 0.02, 0.000, 0.013, 0.067, 0.121, 0.136),
    responseDigit(7, 0.100, 0.01, 0.000, 0.007, 0.058, 0.109, 0.123),
    responseDigit(8, 0.091, 0.02, 0.000, 0.003, 0.051, 0.099, 0.113),
    responseDigit(9, 0.092, 0.03, 0.000, 0.000, 0.046, 0.092, 0.104),
  ],
};

const fiddledResults: AnalysisResponse = {
  analysedFactCount: 123,
  meanAbsoluteDeviation: 0.0123456,
  chiSquared: 30.3456,
  digits: [
    responseDigit(1, 0.101, 0.01, 0.178, 0.206, 0.301, 0.396, 0.424),
    responseDigit(2, 0.142, 0.01, 0.073, 0.096, 0.176, 0.256, 0.279),
    responseDigit(3, 0.135, 0.02, 0.035, 0.055, 0.125, 0.195, 0.215),
    responseDigit(4, 0.118, 0.01, 0.016, 0.034, 0.097, 0.160, 0.178),
    responseDigit(5, 0.111, 0.02, 0.005, 0.021, 0.079, 0.137, 0.154),
    responseDigit(6, 0.052, 0.02, 0.000, 0.013, 0.067, 0.121, 0.136),
    responseDigit(7, 0.048, 0.01, 0.000, 0.007, 0.058, 0.109, 0.123),
    responseDigit(8, 0.031, 0.02, 0.000, 0.003, 0.051, 0.099, 0.113),
    responseDigit(9, 0.268, 0.03, 0.000, 0.000, 0.046, 0.092, 0.104),
  ],
};

storiesOf('Benfords Analysis', module)
  .add('No results', () => <BenfordsAnalysis {... etc} />)
  .add('Searching', () => <BenfordsAnalysis {... etc} phase='searching' />)
  .add('Analysing', () => <BenfordsAnalysis {... etc} phase='analysing' filingName={filingName} />)
  .add('Results', () => <BenfordsAnalysis {... etc} filingName={filingName} analysis={analysisResults} />)
  .add('Random results', () => <BenfordsAnalysis {... etc} filingName={filingName} analysis={randomResults} />)
  .add('Fiddled results', () => <BenfordsAnalysis {... etc} filingName={filingName} analysis={fiddledResults} />)
  .add('Long company name', () => <BenfordsAnalysis {... etc} filingName={longFilingName} analysis={analysisResults} />)
  .add('No facts', () => <BenfordsAnalysis {... etc} filingName={filingName} analysis={{analysedFactCount: 0}} />)
  .add('Search failed', () => <BenfordsAnalysis {... etc} phase='failed' message='Oh no!' />);
