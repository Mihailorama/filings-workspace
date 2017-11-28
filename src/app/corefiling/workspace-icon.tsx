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

export interface AppSymbolProps extends Props<AppSymbol> {
  className?: string;
  style?: CSSProperties;
}

export default class AppSymbol extends Component<AppSymbolProps> {
  render(): JSX.Element {
    const { className, style } = this.props;
    /* tslint:disable */
    return <svg width="23px" height="39px" viewBox="0 0 23 39" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <g stroke="none" strokeWidth="1" fill="#2D5578" fillRule="evenodd">
        <path d="M17.7475174,9.26222041 L17.2213915,9.5714536 C16.7625407,9.8395141 16.5106902,10.3563628 16.5796904,10.8872277 C16.6055654,11.0895871 16.6193654,11.2954506 16.6193654,11.500438 C16.6193654,11.7045494 16.6064279,11.9104129 16.5796904,12.1136483 C16.5115527,12.6436372 16.7634032,13.1604859 17.222254,13.4294224 L17.7475174,13.7369036 C17.798405,13.7675641 17.8156551,13.8332652 17.78633,13.8840741 L16.926416,15.3969515 C16.8970909,15.4486363 16.8324033,15.4661566 16.7815157,15.4363721 L16.2562523,15.128015 C15.7974015,14.8590784 15.2298754,14.8958711 14.8115622,15.2217485 C14.4907116,15.4722887 14.138811,15.6790282 13.7662103,15.8358348 C13.2797595,16.0399463 12.9658089,16.5200023 12.9658089,17.0578754 L12.9658089,17.6737137 C12.9658089,17.7332827 12.9183713,17.7814635 12.8597212,17.7814635 L11.1407556,17.7814635 C11.0821055,17.7814635 11.0346679,17.7332827 11.0346679,17.6737137 L11.0346679,17.0578754 C11.0346679,16.5200023 10.7207174,16.0399463 10.235129,15.8358348 C9.86252834,15.6790282 9.51149022,15.4731647 9.18977714,15.2217485 C8.95776423,15.0412895 8.67917623,14.9484319 8.39972573,14.9484319 C8.17547533,14.9484319 7.94949992,15.0080009 7.74508706,15.1271389 L7.21896112,15.4363721 C7.16807353,15.4661566 7.10338591,15.4486363 7.07406086,15.3969515 L6.21500932,13.8840741 C6.19689679,13.8525375 6.19862179,13.821877 6.2046593,13.8034807 C6.20983431,13.7833324 6.22190934,13.7561759 6.25382189,13.7369036 L6.77908533,13.4294224 C7.23793615,13.1596099 7.4897866,12.6427612 7.42078648,12.1127723 C7.39491143,11.9095369 7.38111141,11.7036734 7.38111141,11.500438 C7.38111141,11.2945745 7.39491143,11.0887111 7.42078648,10.8863517 C7.4889241,10.3554868 7.23707365,9.8395141 6.77908533,9.57057759 L6.25382189,9.26222041 C6.2029343,9.23331192 6.18568427,9.16761082 6.21500932,9.11592595 L7.07406086,7.60304853 C7.09217339,7.57063599 7.11977344,7.55837178 7.13874847,7.55311569 C7.15858601,7.5478596 7.18791106,7.54523156 7.21896112,7.56450388 L7.74508706,7.87198505 C8.20480038,8.14179758 8.77146389,8.10412895 9.18977714,7.77825147 C9.51062771,7.52771127 9.86166584,7.32009578 10.235129,7.16328914 C10.7207174,6.95917771 11.0346679,6.47912165 11.0346679,5.94124861 L11.0346679,5.32628628 C11.0346679,5.26671728 11.0821055,5.21853647 11.1407556,5.21853647 L12.8597212,5.21853647 C12.9183713,5.21853647 12.9658089,5.26671728 12.9658089,5.32628628 L12.9658089,5.94124861 C12.9658089,6.47912165 13.2797595,6.95917771 13.7662103,7.16328914 C14.1379485,7.32009578 14.4898491,7.52771127 14.8115622,7.77825147 C15.2298754,8.10500496 15.796539,8.14179758 16.2562523,7.87198505 L16.7815157,7.56450388 C16.8134283,7.54523156 16.8427533,7.5478596 16.8617284,7.55311569 C16.8815659,7.55837178 16.9083034,7.57063599 16.926416,7.60304853 L17.78633,9.11592595 C17.8044425,9.14746248 17.801855,9.17724698 17.79668,9.19739532 C17.791505,9.21666764 17.7785675,9.2438241 17.7475174,9.26222041 L17.7475174,9.26222041 Z M18.346956,10.3178181 C18.9705446,9.95252 19.1853075,9.13870233 18.8256444,8.5062197 L17.9657303,6.99334229 C17.791505,6.68761315 17.509467,6.46773346 17.1722289,6.37575191 C16.8358533,6.28464638 16.4839527,6.33107516 16.1820771,6.50803013 L15.6559512,6.81638732 C15.6197261,6.83741167 15.5731511,6.83565964 15.542101,6.81113123 C15.1384503,6.49576593 14.6951245,6.23558956 14.2259236,6.03761023 C14.1896986,6.023594 14.166411,5.98417333 14.166411,5.94124861 L14.166411,5.32628628 C14.166411,4.59481399 13.57991,4 12.8597212,4 L11.1407556,4 C10.4205668,4 9.83492829,4.59481399 9.83492829,5.32628628 L9.83492829,5.94124861 C9.83492829,5.98417333 9.81077825,6.023594 9.77541569,6.03761023 C9.30621485,6.23558956 8.86288906,6.49576593 8.45751333,6.81113123 C8.42646328,6.83565964 8.3816132,6.83741167 8.34538813,6.81638732 L7.81926219,6.50803013 C7.51738665,6.33107516 7.16548602,6.28464638 6.82824792,6.37575191 C6.49187232,6.46773346 6.20983431,6.68761315 6.035609,6.99334229 L5.17569497,8.5062197 C5.00146965,8.81282486 4.95489457,9.17111487 5.04459473,9.51276061 C5.13515739,9.85528237 5.35164528,10.1408632 5.65352082,10.3178181 L6.17878426,10.6261753 C6.21500932,10.6471997 6.23657186,10.6883724 6.23139685,10.728669 C6.19862179,10.9827133 6.18137176,11.2428897 6.18137176,11.500438 C6.18137176,11.7571103 6.19862179,12.0172867 6.23139685,12.271331 C6.23657186,12.3107516 6.21587182,12.3519243 6.17964676,12.3738247 L5.65352082,12.6821819 C5.0299322,13.04748 4.81516932,13.8604217 5.17569497,14.4937803 L6.035609,16.0057817 C6.39527215,16.6400164 7.19567358,16.857268 7.81926219,16.4919699 L8.34538813,16.1827367 C8.3816132,16.1617123 8.42732578,16.1643404 8.45837583,16.1879928 C8.86288906,16.5042341 9.30621485,16.7644104 9.77541569,16.9615138 C9.81077825,16.977282 9.83492829,17.0158267 9.83492829,17.0578754 L9.83492829,17.6737137 C9.83492829,18.405186 10.4205668,19 11.1407556,19 L12.8597212,19 C13.57991,19 14.166411,18.405186 14.166411,17.6737137 L14.166411,17.0578754 C14.166411,17.0158267 14.1896986,16.977282 14.2259236,16.9615138 C14.6951245,16.7635344 15.1384503,16.5042341 15.5429635,16.1879928 C15.5740136,16.1643404 15.6197261,16.1617123 15.6559512,16.1827367 L16.1820771,16.4919699 C16.8048033,16.857268 17.6052047,16.6391403 17.9657303,16.0057817 L18.8256444,14.4937803 C19.1853075,13.8604217 18.9705446,13.04748 18.346956,12.6813058 L17.8216926,12.3738247 C17.7854675,12.3519243 17.7647675,12.3107516 17.7699425,12.272207 C17.8027175,12.0172867 17.8191051,11.7579863 17.8191051,11.500438 C17.8191051,11.2428897 17.801855,10.9835893 17.76908,10.728669 C17.7647675,10.6883724 17.7854675,10.6471997 17.8216926,10.6261753 L18.346956,10.3178181 Z"></path>
        <path d="M12.0004312,13.8001725 C11.007762,13.8001725 10.2005175,12.9919494 10.2005175,12 C10.2005175,11.007188 11.007762,10.1998275 12.0004312,10.1998275 C12.992238,10.1998275 13.800345,11.007188 13.800345,12 C13.800345,12.9919494 12.992238,13.8001725 12.0004312,13.8001725 M12.0004312,9 C10.3462699,9 9,10.3456009 9,12 C9,13.6543991 10.3462699,15 12.0004312,15 C13.6545925,15 15,13.6543991 15,12 C15,10.3456009 13.6545925,9 12.0004312,9"></path>
        <path d="M15.927257,21.5185662 C15.7229931,21.6183982 15.5935419,21.8302156 15.5935419,22.0637356 L15.5935419,22.5932792 L13.7862686,22.7495379 C13.4836554,22.774713 13.2499707,23.0368804 13.2499707,23.350266 C13.2499707,23.7044525 13.5424968,23.9822459 13.8829367,23.9527303 L15.5935419,23.8060207 L15.5935419,25.0092131 L7.40701412,25.7141137 L7.40701412,24.5100532 L11.0350102,24.1984038 C11.338464,24.1723607 11.571308,23.9101932 11.571308,23.5968076 C11.571308,23.2426211 11.2787819,22.9648278 10.9375015,22.9943433 L7.40701412,23.2981798 L7.40701412,22.0637356 C7.40701412,21.8302156 7.27672233,21.6183982 7.07329901,21.5185662 C3.44782472,19.7398208 1.13115253,15.9140857 1.16981977,11.7706245 C1.19671873,8.92931952 2.3029381,6.2616354 4.2833734,4.25978717 C6.23606915,2.2891907 8.7939913,1.20840101 11.5006983,1.20840101 C11.5444091,1.20840101 11.5872793,1.20840101 11.6318307,1.20840101 C17.2553927,1.28132176 21.8307362,6.06631196 21.8307362,11.8774013 C21.8307362,15.9739849 19.5132234,19.7589191 15.927257,21.5185662 L15.927257,21.5185662 Z M17.0679406,24.6697844 L18.7499657,27.1022123 C18.8298219,27.216802 18.7499657,27.3765332 18.6137897,27.3765332 L16.9309241,27.3765332 C16.8376184,27.3765332 16.7628056,27.2984038 16.7628056,27.2029123 L16.7628056,24.7704845 C16.7628056,24.6020722 16.9729537,24.5326239 17.0679406,24.6697844 L17.0679406,24.6697844 Z M15.5935419,27.425147 L7.40701412,28.1291795 L7.40701412,26.9259871 L15.5935419,26.2210865 L15.5935419,27.425147 Z M15.5935419,29.7091291 C15.5935419,29.7542705 15.5573964,29.791599 15.512845,29.791599 L7.48771098,29.791599 C7.44315959,29.791599 7.40701412,29.7542705 7.40701412,29.7091291 L7.40701412,29.341921 L15.5935419,28.6370204 L15.5935419,29.7091291 Z M6.23775033,27.2029123 C6.23775033,27.2984038 6.16209703,27.3765332 6.06879129,27.3765332 L4.38676624,27.3765332 C4.24974971,27.3765332 4.17073404,27.216802 4.24974971,27.1022123 L5.93261535,24.6697844 C6.02760227,24.5326239 6.23775033,24.6020722 6.23775033,24.7704845 L6.23775033,27.2029123 Z M21.1708713,18.3057127 C22.3678746,16.3898068 23,14.166592 23,11.8774013 C23,8.73052366 21.8206491,5.76594791 19.6796607,3.52797536 C17.5403535,1.29260711 14.6873834,0.0399327919 11.6461207,0.000868104172 C11.5973664,0.000868104172 11.548612,0 11.4998577,0 C8.48633455,0 5.63840807,1.20319238 3.46631775,3.39689163 C1.26144433,5.62357883 0.0299767099,8.59423131 0.000555981785,11.7593391 C-0.0212994162,14.0719686 0.601579427,16.3203584 1.80026395,18.2588351 C2.87033786,19.9898348 4.348099,21.3970316 6.09316847,22.3588911 L2.94935353,26.9051526 C2.72407481,27.2298236 2.69465408,27.6525903 2.87117845,28.008513 C3.04854341,28.3635676 3.39907037,28.5849342 3.7857428,28.5849342 L6.23775033,28.5849342 L6.23775033,29.7091291 C6.23775033,30.4209745 6.79842535,31 7.48771098,31 L15.512845,31 C16.2021306,31 16.7628056,30.4209745 16.7628056,29.7091291 L16.7628056,28.5849342 L19.2139726,28.5849342 C19.6014856,28.5849342 19.9520126,28.3635676 20.1285369,28.008513 C20.3059019,27.6525903 20.2756406,27.2298236 20.0512025,26.9051526 L16.9065469,22.3588911 C18.6356451,21.4065808 20.1033192,20.0150098 21.1708713,18.3057127 L21.1708713,18.3057127 Z"></path>
        <path d="M11.5003595,36 C11.2242991,36 11,36.2691976 11,36.5996549 L11,37.4003451 C11,37.732528 11.2242991,38 11.5003595,38 C11.7764198,38 12,37.732528 12,37.4003451 L12,36.5996549 C12,36.2691976 11.7764198,36 11.5003595,36"></path>
        <path d="M8.49964055,32 C8.22358016,32 8,32.2770167 8,32.6170726 L8,38.3820396 C8,38.7229833 8.22358016,39 8.49964055,39 C8.77570093,39 9,38.7229833 9,38.3820396 L9,32.6170726 C9,32.2770167 8.77570093,32 8.49964055,32"></path>
        <path d="M14.5,32 C14.2241379,32 14,32.2770167 14,32.6170726 L14,38.3820396 C14,38.7229833 14.2241379,39 14.5,39 C14.7758621,39 15,38.7229833 15,38.3820396 L15,32.6170726 C15,32.2770167 14.7758621,32 14.5,32"></path>
        <path d="M11.5003595,32 C11.2242991,32 11,32.2883549 11,32.642329 L11,34.357671 C11,34.7125693 11.2242991,35 11.5003595,35 C11.7764198,35 12,34.7125693 12,34.357671 L12,32.642329 C12,32.2883549 11.7764198,32 11.5003595,32"></path>
      </g>
    </svg>;
    /* tslint:enable */
  }
}
