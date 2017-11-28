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

import { ValidationStatus } from '../models';
import { fetchAction } from './actions';
import { State, Item } from '../state';
import { filingVersionId, FilingRouterProps } from '../containers/filing-version-route';
import ValidationResult from './validation-result';

export interface ValidatorContainerProps extends FilingRouterProps {
  status: Item<ValidationStatus>;
  fetchAction: typeof fetchAction;
}

class ValidatorContainer extends Component<ValidatorContainerProps> {

  componentDidMount(): void {
    this.props.fetchAction(filingVersionId(this.props));
  }

  componentWillReceiveProps(nextProps: ValidatorContainerProps): void {
    const nextFilingVersionId = filingVersionId(nextProps);
    if (nextFilingVersionId !== filingVersionId(this.props)) {
      this.props.fetchAction(nextFilingVersionId);
    }
  }

  render(): JSX.Element {
    const {status} = this.props;
    return <ValidationResult status={status && status.value || undefined} />;
  }

}

export default connect(
  (state: State, ownProps: FilingRouterProps) => {
    const status = state.status[filingVersionId(ownProps)] || {loading: true};
    return {status};
  },
  {fetchAction},
)(ValidatorContainer);