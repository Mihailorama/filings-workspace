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
import { connect } from 'react-redux';

import AppBar from './app-bar';
import { User } from '../models';
import { Item } from '../state';
import { WORKSPACE_APPS } from '../workspace/workspace-apps';
import { app } from '../containers/filing-version-route';
import { RouteComponentProps } from 'react-router';
import { AppBarState } from './reducers';

interface OwnProps extends Props<AppBarContainer> {
  className?: string;
}

interface PropsFromState {
  user: Item<User>;
}

type AppBarContainerProps = OwnProps & RouteComponentProps<{app?: string, filingVersionId?: string}> & PropsFromState;

class AppBarContainer extends Component<AppBarContainerProps> {
  render(): JSX.Element {
    const { className, user } = this.props;
    return <AppBar
      className={className} apps={WORKSPACE_APPS} user={user.value}
      app={app(this.props)} filingVersionId={this.props.match.params.filingVersionId}
    />;
  }
}

export default connect(
  ({ appBar: {user} }: {appBar: AppBarState}): PropsFromState => ({user}),
)(AppBarContainer);
