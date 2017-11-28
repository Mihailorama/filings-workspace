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

import { WorkspaceAppSpec, WorkspaceFiling } from '../state';
import { linkForFiling, LinkDef } from './workspace-apps';

interface FilingListProps {
  app: WorkspaceAppSpec;
  filings?: WorkspaceFiling[];
  showUpload: () => void;
}

function createLink({href, external}: LinkDef, name: string, date: Date): JSX.Element {
  const format = new Intl.DateTimeFormat(window.navigator.language || 'en-US', {
    year: 'numeric', month: 'short', day: '2-digit', hour: 'numeric', minute: 'numeric', second: 'numeric',
  });
  const text = `${name} - ${format.format(date)}`;
  return external ?
    <a href={href}>{text}</a> :
    <Link to={href}>{text}</Link>;
}

export default function FilingList({app, filings, showUpload}: FilingListProps): JSX.Element {
  return <div>
    <h2>{app.name}</h2>
    <div><Button onClick={showUpload}>Upload</Button></div>
    {filings ?
      filings.map(filing =>
        <div key={filing.id}>
          {createLink(linkForFiling(app, filing.id), filing.name, filing.date)}
        </div>,
      ) :
      <div>Loading ...</div>
    }
  </div>;
}