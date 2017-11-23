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
import { fetchFilingsAction, uploadAction } from './actions';
import { Item, State, WorkspaceAppSpec, WorkspaceFiling, UploadStatus } from '../state';
import WorkspaceApps from './workspace-apps';
import FilingList from './filing-list';
import { Profile } from '../models';

interface OwnProps {
  app?: WorkspaceAppSpec;
  filings: Item<WorkspaceFiling[]>;
  profiles: Item<Profile[]>;
  upload: UploadStatus;
}

export interface WorkspaceContainerProps extends OwnProps {
  fetchFilingsAction: typeof fetchFilingsAction;
  uploadAction: typeof uploadAction;
}

class WorkspaceContainer extends Component<WorkspaceContainerProps> {

  render(): JSX.Element {
    const {app, filings, profiles, upload, fetchFilingsAction, uploadAction} = this.props;
    if (app) {
      return <FilingList
        app={app}
        filings={filings && filings.value}
        profiles={profiles}
        upload={upload}
        onUpload={params => uploadAction(app, params)}
      />;
    }
    return <WorkspaceApps onAppClick={fetchFilingsAction} />;
  }

}

export default connect(
  (state: State): OwnProps => {
    const app = state.app;
    const filings = state.recentFilings || {loading: true};
    const profiles = state.profiles;
    const upload = state.upload;
    return {app, filings, profiles, upload};
  },
  {fetchFilingsAction, uploadAction},
)(WorkspaceContainer);
