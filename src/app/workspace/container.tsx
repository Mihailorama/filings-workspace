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
import { fetchProfilesAction, fetchFilingsAction, uploadAction, showUpload } from './actions';
import { Item } from '../state';
import WorkspaceApps from './workspace-apps';
import FilingList from './filing-list';
import Upload from './upload';
import { Profile } from '../models';

import './container.less';
import { WorkspaceFiling, UploadStatus, WorkspaceAppSpec, WorkspaceState } from './reducers';

interface PropsFromState {
  filings: Item<WorkspaceFiling[]>;
  profiles: Item<Profile[]>;
  upload?: UploadStatus;
}

interface OwnProps {
  app?: WorkspaceAppSpec;
}

export interface WorkspaceContainerProps extends PropsFromState, OwnProps {
  fetchProfilesAction: typeof fetchProfilesAction;
  fetchFilingsAction: typeof fetchFilingsAction;
  uploadAction: typeof uploadAction;
  showUpload: typeof showUpload;
}

class WorkspaceContainer extends Component<WorkspaceContainerProps> {
  componentWillMount(): void {
    if (this.props.upload) {
      this.props.fetchProfilesAction();
    }
    else if (this.props.app) {
      this.props.fetchFilingsAction();
    }
    else {
      this.props.showUpload(false);
    }
  }

  componentWillReceiveProps(nextProps: WorkspaceContainerProps): void {
    if (!!nextProps.upload && !this.props.upload) {
      this.props.fetchProfilesAction();
    }
    if (nextProps.app !== this.props.app) {
      if (nextProps.app) {
        this.props.fetchFilingsAction();
      }
      else {
        this.props.showUpload(false);
      }
    }
  }

  render(): JSX.Element {
    const {app, filings, profiles, showUpload, upload, uploadAction} = this.props;
    if (app) {
      if (upload) {
        if (upload.uploading) {
          return <div className='app-WorkspaceContainer-loadingOverlay'>
            <div className='app-WorkspaceContainer-loading'>processing…</div>
          </div>;
        }
        return <Upload profiles={profiles} upload={upload} onSubmit={params => uploadAction(app, params)} />;
      }
      return <FilingList app={app} filings={filings && filings.value} showUpload={() => showUpload(true)} />;
    }
    return <WorkspaceApps />;
  }

}

export default connect(
  ({workspace: state}: {workspace: WorkspaceState}): PropsFromState => {
    const {recentFilings: filings = {loading: true}, profiles, upload} = state;
    return {filings, profiles, upload};
  },
  {fetchProfilesAction, fetchFilingsAction, uploadAction, showUpload},
)(WorkspaceContainer);
