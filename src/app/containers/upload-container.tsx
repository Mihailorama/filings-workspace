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

import { Profile } from '../models';
import { checkingStartAction } from '../actions';
import { Item, State, UploadStatus} from '../state';
import Upload from '../components/upload';

interface UploadContainerProps {
  profiles: Item<Profile[]>;
  upload: UploadStatus;
  onUpload: typeof checkingStartAction;
}

class UploadContainer extends Component<UploadContainerProps> {
  render(): JSX.Element {
    const {
      profiles, upload, onUpload,
    } = this.props;
    return (
      <Upload
        profiles={profiles}
        upload={upload}
        onSubmit={onUpload}
      />
    );
  }
}

export default connect(
  ({profiles, upload}: State) => ({profiles, upload}),
  {onUpload: checkingStartAction},
)(UploadContainer);
