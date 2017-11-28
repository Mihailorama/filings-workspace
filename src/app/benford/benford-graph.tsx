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

import {
  AnalysisResponse, AnalysisResponseDigit,
  AnalysisResponseDigitProportion,
} from '@cfl/digit-frequency-analysis-service';

import { Component, Props } from 'react';
import { Chart, Dots, Handlers, Layer, Lines, Ticks, Title } from 'rumble-charts';

import BoxTitle from './box-title';

import './benford-graph.less';
import NumberFormat = Intl.NumberFormat;

export function percentile(percentile: number, proportion?: AnalysisResponseDigitProportion): number {
  const percentileValue = proportion && proportion.expectedPercentiles.find(p => p.percentile === percentile);
  return percentileValue && percentileValue.value * 100 || 0;
}

interface Series {
  name: string;
  data: number[][];
  line?: boolean;
  actual?: boolean;
}

function series(digits: AnalysisResponseDigit[]): Series[] {
  return [
    {
      name: '99% percent',
      data: digits.map(d => [d.digit, percentile(99, d.proportion)]),
      line: false,
    },
    {
      name: '95% percent',
      data: digits.map(d => [d.digit, percentile(95, d.proportion)]),
      line: false,
    },
    {
      name: 'Expected proportion',
      data: digits.map(d => [d.digit, percentile(50, d.proportion)]),
      line: true,
    },
    {
      name: '5% percent',
      data: digits.map(d => [d.digit, percentile(5, d.proportion)]),
      line: false,
    },
    {
      name: '1% percent',
      data: digits.map(d => [d.digit, percentile(1, d.proportion)]),
      line: false,
    },
    {
      name: 'Observed proportion',
      data: digits.map(d => [d.digit, d.proportion && d.proportion.actualValue * 100 || 0]),
      line: true,
      actual: true,
    },
  ];
}

interface GraphProps extends Props<Graph> {
  response?: AnalysisResponse;
}

interface GraphState {
  digit?: number;
  hovering: boolean;
}

function GraphDetails(props: {name: string, value: number, visible: boolean}): JSX.Element {
  const {name, value, visible} = props;
  const numberFormat = NumberFormat(undefined, {maximumFractionDigits: 3, minimumFractionDigits: 3});
  return <div className='app-GraphDetails'>
    <div className='app-GraphDetails-inner' style={{opacity: visible ? 1 : 0, transition: 'all 250ms'}}>
      <div className='app-GraphDetails-name'>{name}</div>
      <div className='app-GraphDetails-main'>
        <div className='app-GraphDetails-value'>{numberFormat.format(value)}</div>
      </div>
    </div>
  </div>;
}

export default class Graph extends Component<GraphProps, GraphState> {
  constructor(props: GraphProps) {
    super(props);
    this.state = {
      hovering: false,
    };
  }

  handleMouseMove({closestPoints: [closestPoint]}: {closestPoints: any[]}): void {
    if (!closestPoint) {
      return;
    }
    this.setState({digit: closestPoint.pointIndex + 1, hovering: true});
  }

  render(): JSX.Element {
    const {response} = this.props;
    const {digit: selectedDigit, hovering} = this.state;
    const digit = this.props.response && this.props.response.digits && this.props.response.digits.find(d => d.digit === selectedDigit);
    const zStatistic = (digit && digit.proportion && digit.proportion.zTest) || 0;

    const dotStyle = ({pointIndex}: { pointIndex: number }) => ({
      transition: 'all 250ms',
      fillOpacity: hovering && pointIndex + 1 === selectedDigit ? '1' : '0',
    });

    const margins = {left: 60, top: 20, right: 20, bottom: 40 };
    const graphTitleHeight = 36;
    const graphWidth = 435;
    const graphHeight = 318 - graphTitleHeight;
    return <div className='app-Graph'>
      {response && response.digits &&
        <div>
          <div className='app-Graph-name'>
            <BoxTitle title='Leading digit distribution' align='left' width={400} tooltip={
              <div>
                This graph shows the distribution of the leading digit of monetary values in the filing (the solid line)
                against the expected frequencies according to Benford's law (the dotted line).
                <p />
                The shaded areas of the graph show the 95<sup>th</sup> and 99<sup>th</sup> percentiles of the normal
                distribution of expected frequencies. These areas will be narrower for filings containing more data.
                <p />
                The Z-statistic (shown in the popup for each data point) is a measure of the deviation from the
                expected distribution for each digit, with a lower value indicating that the digit more closely obeys
                Benford's law.
              </div>
            }/>
          </div>
          <GraphDetails name={`Z-statistic for digit ${selectedDigit}`} value={zStatistic} visible={hovering} />
          <Chart width={graphWidth} height={graphHeight}
                 scaleX={{paddingStart: 0, paddingEnd: 0}}
                 minX={1} maxX={9} minY={0} maxY={50}
                 series={series(response.digits)}>
            <Layer width={graphWidth - margins.left - margins.right} height={graphHeight - margins.top - margins.bottom}
                   position={`${margins.left / graphWidth * 100}% ${margins.top / graphHeight * 100}%`}>
              <Handlers onMouseMove={this.handleMouseMove.bind(this)}
                onMouseLeave={() => this.setState({hovering: false})}
                optimized={false}>
                <Lines asAreas={true}
                       className='app-Graph-area'
                       interpolation='cardinal'
                       colors={['#fff0c0', '#c0f0c0', '#fff0c0', '#ffffff']}
                       seriesVisible={({series}: { series: Series }) => !series.line}/>
                <Lines interpolation='cardinal'
                       className='app-Graph-line-expected'
                       seriesVisible={({series}: { series: Series }) => series.line && !series.actual}/>
                <Title className='app-Graph-axis-title'
                       position={`center 115%`}
                       style={{textAnchor: 'middle'}}>
                  Leading digit
                </Title>
                <Title className='app-Graph-axis-title'
                       position={`-11% middle`}
                       style={{textAnchor: 'middle'}}>
                  <text transform='rotate(-90)'>Proportion of facts</text>
                </Title>
                <Lines interpolation='linear'
                       className='app-Graph-line-actual'
                       seriesVisible={({series}: { series: Series }) => series.actual}/>
                <Ticks axis='x' ticks={9}
                       className='app-Graph-axis'
                       lineLength={({index}: {index: number}) => index === 0 ? '-100%' : '0%'}
                       labelAttributes={{y: 17}}
                       labelStyle={{textAnchor: 'middle'}}/>
                <Ticks axis='y' lineLength='100%'
                       className='app-Graph-axis'
                       labelFormat={(label: string) => `${label}%`}
                       labelStyle={{textAnchor: 'end'}}
                       labelAttributes={{x: -5, y: 5}}/>
                <Dots className='app-Graph-dots' dotStyle={dotStyle}
                      circleRadius={6}
                      seriesVisible={({series}: { series: Series }) => series.actual}/>
              </Handlers>
            </Layer>
          </Chart>
        </div>
      }
    </div>;
  }
}
