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
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { UploadStatus, WorkspaceAppSpec, WorkspaceFiling, Item } from '../state';
import Upload from './upload';
import { Profile, ValidationParams } from '../models';

import './app.less';

interface FilingListProps extends React.Props<FilingList> {
  app: WorkspaceAppSpec;
  filings?: WorkspaceFiling[];
  profiles: Item<Profile[]>;
  upload: UploadStatus;
  onUpload: (params: ValidationParams) => void;
}

interface FilingListState {
  showUpload: boolean;
}

export default class FilingList extends React.Component<FilingListProps, FilingListState> {
  constructor(props: FilingListProps) {
    super(props);
    this.state = {showUpload: false};
  }

  render(): JSX.Element {
    const {app, filings, profiles, upload, onUpload} = this.props;
    const {showUpload} = this.state;
    return <div>
      <h2>{app.name}</h2>
      <div><Button onClick={() => this.setState({showUpload: true})}>Upload</Button></div>
      {filings ? filings.map(filing =>
          <div key={filing.id}><Link to={app.urlTemplate.replace('{id}', filing.id)}>{filing.name}</Link></div>,
        ) :
        <div>Loading ...</div>
      }
      {showUpload && <Upload onSubmit={onUpload} profiles={profiles} upload={upload} />}
      {upload.uploading && <div className='app-App-loadingOverlay'>
        <div className='app-App-loading'>Processing&thinsp;…</div>
      </div>}
    </div>;
  }
}
