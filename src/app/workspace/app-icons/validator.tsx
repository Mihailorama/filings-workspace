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
import { Component, Props, CSSProperties } from 'react';

interface IconProps extends Props<Icon> {
  className?: string;
  style?: CSSProperties;
}

export default class Icon extends Component<IconProps> {
  render(): JSX.Element {
    const {className, style} = this.props;
    /* tslint:disable */
    return <svg width='34px' height='34px' viewBox='0 0 80 82' className={className} style={style} xmlns='http://www.w3.org/2000/svg'>
      <g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
        <path d='M9.05843346,1.04134071 L20.6105372,2.66632673 C22.03698,2.86636717 23.101606,3.73503592 22.9922801,4.60918523 L22.7215684,6.74112305 C22.6096395,7.61253208 21.3654066,8.16058807 19.9415668,7.95780735 L8.38686005,6.33556161 C6.96302031,6.13278089 5.89839425,5.26411214 6.00772016,4.39270311 L6.27843192,2.25802502 C6.39036082,1.38661599 7.63459372,0.841300275 9.05843346,1.04134071' fill='#2D5578'></path>
        <path d='M10.1169214,22.0382908 L13.5982828,22.5112122 C15.0392088,22.7062588 16.1093856,23.5906485 15.9910614,24.4910693 L15.7044539,26.6873481 C15.5861296,27.5850971 14.3213752,28.1568777 12.8830786,27.9618311 L9.40171722,27.4889097 C7.96079119,27.2938631 6.89061438,26.4068016 7.0089386,25.5090526 L7.29817558,23.3127738 C7.41649979,22.4123529 8.67862478,21.8432442 10.1169214,22.0382908' fill='#2D5578'></path>
        <path d='M3.02873065,10.0360203 L21.6813268,12.5584714 C23.0752478,12.7491368 24.1079703,13.6225902 23.9909624,14.5140796 L23.7035298,16.6912719 C23.5865218,17.5827612 22.3630254,18.1521808 20.9691044,17.964092 L2.31650824,15.4416408 C0.922587234,15.2509755 -0.110135261,14.377522 0.00941635753,13.4860326 L0.294305322,11.3088404 C0.411313289,10.4147744 1.6373533,9.84793147 3.02873065,10.0360203' fill='#2D5578'></path>
        <g transform='translate(14.000000, 0.000000)'>

          <path d='M59.4678545,23.9054118 L49.4769455,22.5650553 C48.9704,22.4959911 48.6165818,22.0278895 48.6827636,21.516303 L50.0191273,11.4815348 C50.1260364,10.6553226 51.1696727,10.379066 51.6685818,11.0364545 L60.3256727,22.4192531 C60.8271273,23.0766417 60.2849455,24.0154029 59.4678545,23.9054118 M65.3809455,24.915795 L50.5994909,5.4908574 C50.3118545,5.11484135 49.8918545,4.86927986 49.4260364,4.80533155 L15.8667636,0.300812834 C15.4442182,0.247096257 15.0547636,0.541258467 14.9911273,0.965875223 L14.8205818,2.13229234 C14.8002182,2.27297861 14.8358545,2.41878075 14.9224,2.53132977 C15.0089455,2.64387879 15.1336727,2.72061676 15.2762182,2.74108021 L46.3180364,6.92841533 C47.2878545,7.05886988 47.9674909,7.95414617 47.8376727,8.92871836 L45.9896727,22.838754 C45.8598545,23.8133262 46.5394909,24.7060446 47.5093091,24.8364991 L61.3540364,26.6961159 C62.3238545,26.8265704 63.0034909,27.7192888 62.8736727,28.693861 L56.3904,77.483861 C56.2605818,78.4584332 55.3696727,79.1414011 54.3998545,79.0109465 L4.60821818,72.3296275 C3.64094545,72.1991729 2.95876364,71.3038966 3.08858182,70.3293244 L7.82821818,34.6947701 C7.85876364,34.4722299 7.80021818,34.2471319 7.66276364,34.0706346 C7.52785455,33.8890214 7.32930909,33.7739144 7.10785455,33.7457772 L6.15585455,33.6178806 C5.77149091,33.5667219 5.41512727,33.8404207 5.36421818,34.2266684 L0.275854545,72.4933351 C0.146036364,73.4653494 0.825672727,74.3606257 1.79549091,74.4885223 L56.5533091,81.8374617 C57.5205818,81.9679162 58.4114909,81.2875062 58.5413091,80.312934 L65.7271273,26.2305722 C65.7882182,25.7650285 65.6634909,25.2892531 65.3809455,24.915795' fill='#2D5578'>
            <mask fill='white'>
              <polygon points='0.259960974 0.296720143 65.7423175 0.296720143 65.7423175 81.8534825 0.259960974 81.8534825'></polygon>
            </mask>
          </path>
        </g>
        <path d='M54.0494447,47.5021546 L54.5517844,43.6821977 L56.145064,43.8945597 C56.145064,43.8945597 57.8093815,44.0250471 57.5632858,45.9004848 C57.2842082,48.0189873 55.3230535,47.6710207 54.0494447,47.5021546 L54.0494447,47.5021546 Z M44.3248576,51.6624024 L42.1582004,51.3732831 L42.6148729,47.9166442 L44.7789931,48.2057635 C45.72532,48.3311339 46.3900321,49.2087261 46.2657157,50.1630757 C46.1388623,51.1174253 45.2711845,51.7903313 44.3248576,51.6624024 L44.3248576,51.6624024 Z M43.3785308,42.0958793 L44.5126008,42.2442769 C45.2914811,42.3312685 46.237808,42.6869109 46.0855838,43.8433881 C45.9333596,45.0024239 45.0758302,45.2838675 44.1295033,45.1559386 L42.9979703,45.0049825 L43.3785308,42.0958793 Z M34.5672887,47.1490708 L39.5424818,41.9577161 L38.0354626,53.4124697 L34.5672887,47.1490708 Z M65.3089587,54.0060598 L66.8514969,42.2724212 L62.8835203,41.740237 L61.0492191,55.702397 L58.5070756,50.2116887 C60.1028923,49.7102074 61.3435192,48.566523 61.6555787,46.2049556 C62.2441788,41.722327 58.1315893,41.0954754 57.6165642,41.0366281 C57.5810453,41.0315109 57.5632858,41.0315109 57.5632858,41.0315109 L54.9475672,40.6809857 L53.0523764,40.4276865 L51.0683881,40.1615944 L49.9064103,48.9938055 C49.5080904,47.7938325 48.541467,47.1132507 47.6230479,46.7192297 L47.6357332,46.6373552 C48.2573152,46.4608134 48.7520438,46.26892 49.163049,45.6983571 C49.5765913,45.1252357 49.8302982,44.4958255 49.9267069,43.8050094 C50.076394,42.3722058 49.5892767,41.0724482 48.650561,40.394425 C47.8310876,39.7982763 46.8517788,39.5910315 45.5883182,39.4247239 C45.4081863,39.4016967 45.2229802,39.3786695 45.0301629,39.3556423 L42.3535547,39 L39.8545414,41.6225424 L35.6227096,41.0570967 L32.8065626,43.9661998 L30.8428708,40.4174522 L26.6034279,39.8520065 L30.2847156,46.5785079 L25,52.0385133 L29.3282404,52.6193105 L32.0403676,49.7895233 L33.9279472,53.2333692 L37.9872583,53.7757878 L38.2587247,53.8141664 L45.2584992,54.750606 C46.4027175,54.9066792 48.3461126,54.6303528 49.3989964,52.8598169 L49.0818628,55.259763 L52.9610419,55.7791543 L53.6663472,50.4138163 C53.9276653,50.4419607 54.1864464,50.4956908 54.4503016,50.518718 L57.0203529,56.3215729 L60.8995321,56.8409642 L61.6200598,56.9381901 L69.5585499,58 L70,54.6329114 L65.3089587,54.0060598 Z' fill='#2D5578'></path>
      </g>
    </svg>;
    /* tslint:enable */
  }
}
