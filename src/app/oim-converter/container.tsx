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
import { connect, MapDispatchToProps } from 'react-redux';
import { getFilingVersionAction, getDocumentContentAction } from './actions';
import OimState from './state';

import { filingVersionId, FilingRouterProps } from '../containers/filing-version-route';

import OimConverter from './oim-converter';

export type OimConverterContainerProps = PropsFromDispatch & OimState & FilingRouterProps;

interface PropsFromDispatch {
  getFilingVersionAction: typeof getFilingVersionAction;
  getDocumentContentAction: typeof getDocumentContentAction;
}

class OimConverterContainer extends Component<OimConverterContainerProps> {

  componentDidMount(): void {
    this.props.getFilingVersionAction(filingVersionId(this.props));
  }

  componentWillReceiveProps(nextProps: OimConverterContainerProps): void {
    const nextFilingVersionId = filingVersionId(nextProps);
    if (nextFilingVersionId !== filingVersionId(this.props)) {
      this.props.getFilingVersionAction(nextFilingVersionId);
    }
  }

  render(): JSX.Element {
    const {filingVersion, getDocumentContentAction, documentContents} = this.props;
    return <OimConverter filingVersion={filingVersion}
                         documentContentFetcher={getDocumentContentAction}
                         documentContent={documentContents}/>;
  }

}

const propsFromDispatch: MapDispatchToProps<PropsFromDispatch, {}> = {
  getFilingVersionAction, getDocumentContentAction,
};

export default connect(state => state.oimConverter, propsFromDispatch)(OimConverterContainer);
