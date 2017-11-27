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
import { Item, State, WorkspaceFiling, UploadStatus, WorkspaceAppSpec } from '../state';
import WorkspaceApps from './workspace-apps';
import FilingList from './filing-list';
import Upload from './upload';
import { Profile } from '../models';

import './container.less';

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

  constructor(props: WorkspaceContainerProps) {
    super(props);
    if (props.upload) {
      this.props.fetchProfilesAction();
    }
    else if (props.app) {
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
            <div className='app-WorkspaceContainer-loading'>Processing&thinsp;…</div>
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
  (state: State): PropsFromState => {
    const filings = state.recentFilings || {loading: true};
    const profiles = state.profiles;
    const upload = state.upload;
    return {filings, profiles, upload};
  },
  {fetchProfilesAction, fetchFilingsAction, uploadAction, showUpload},
)(WorkspaceContainer);
