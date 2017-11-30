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
import { fetchProfilesAction, fetchFilingsAction, uploadAction, showUpload, searchAction,
         searchTextChangedAction, searchSelectionAction } from './actions';
import WorkspaceApps from './workspace-apps';
import FilingList from './filing-list';
import Upload from './upload';
import { Item } from '../state';
import { FilingMatch } from '../fullbeam-search/models';
import { WorkspaceFiling, UploadStatus, WorkspaceAppSpec, WorkspaceState, FilingListMode } from './reducers';
import { Profile } from '@cfl/document-service';

import './container.less';

interface PropsFromState {
  filings: Item<WorkspaceFiling[]>;
  profiles: Item<Profile[]>;
  upload?: UploadStatus;
  search: {
    text: string;
    filings: Item<FilingMatch[]>;
  };
  mode: FilingListMode;
}

interface OwnProps {
  app?: WorkspaceAppSpec;
}

export interface WorkspaceContainerProps extends PropsFromState, OwnProps {
  fetchProfilesAction: typeof fetchProfilesAction;
  fetchFilingsAction: typeof fetchFilingsAction;
  uploadAction: typeof uploadAction;
  showUpload: typeof showUpload;
  searchAction: typeof searchAction;
  searchTextChangedAction: typeof searchTextChangedAction;
  searchSelectionAction: typeof searchSelectionAction;
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
    const {app, mode, filings, profiles, showUpload, upload, uploadAction, search,
      searchAction, searchTextChangedAction, searchSelectionAction} = this.props;
    if (app) {
      if (upload) {
        if (upload.uploading) {
          return <div className='app-WorkspaceContainer-loadingOverlay'>
            <div className='app-WorkspaceContainer-loading'>processing…</div>
          </div>;
        }
        return <Upload profiles={profiles} upload={upload} onSubmit={params => uploadAction(app, params)} />;
      }
      const { text, filings: searchResultFilings } = search;
      return <FilingList app={app} mode={mode}
        userFilings={filings} searchResultFilings={searchResultFilings}
        showUpload={() => showUpload(true)}
        searchText={text}
        onSearch={() => searchAction(text)}
        onSearchTextChange={searchTextChangedAction}
        onSearchSelection={searchSelectionAction} />;
    }
    return <WorkspaceApps />;
  }

}

export default connect(
  ({workspace: state}: {workspace: WorkspaceState}): PropsFromState => {
    const {recentFilings: filings = {loading: true}, profiles, upload, search, mode} = state;
    return {filings, profiles, upload, search, mode};
  },
  {fetchProfilesAction, fetchFilingsAction, uploadAction, showUpload, searchAction, searchTextChangedAction, searchSelectionAction},
)(WorkspaceContainer);
