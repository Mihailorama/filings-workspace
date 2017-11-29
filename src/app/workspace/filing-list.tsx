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
import { Link } from 'react-router-dom';

import { WorkspaceAppSpec, WorkspaceFiling } from './reducers';
import UploadIcon from './upload-icon';
import { linkForFiling, LinkDef } from './workspace-apps';

import Button from '../components/button';
import ContactDetails from '../components/contact-details';

import { Item } from '../state';

import './filing-list.less';

interface FilingListPage {
  app: WorkspaceAppSpec;
  filings: Item<WorkspaceFiling[]>;
  showUpload: () => void;
}

function createFilingRow({href, external}: LinkDef, name: string, date: Date): JSX.Element {
  const format = new Intl.DateTimeFormat(window.navigator.language || 'en-US', {
    year: 'numeric', month: 'short', day: '2-digit', hour: 'numeric', minute: 'numeric', second: 'numeric',
  });
  const innards = [
    <div className='app-FilingList-row-name'>{name}</div>,
    <div className='app-FilingList-row-date'>{format.format(date)}</div>,
  ];
  return external ?
    <a className='app-FilingList-row' href={href}>{innards}</a> :
    <Link className='app-FilingList-row' to={href}>{innards}</Link>;
}

function FilingList({app, filings}: {app: WorkspaceAppSpec, filings: WorkspaceFiling[]}): JSX.Element {
  return <div className='app-FilingList'>
    <div className='app-FilingList-header'>
      <div className='app-FilingList-header-name'>Recent Filings</div>
      <div className='app-FilingList-header-date'>Date</div>
    </div>
    <div className='app-FilingList-list'>
      {filings.map(filing =>
        createFilingRow(linkForFiling(app, filing.id), filing.name, filing.date))}
    </div>
  </div>;
}

export default function FilingListPage({app, filings, showUpload}: FilingListPage): JSX.Element {
  return <div className='app-FilingListPage-container'>
    <div className='app-FilingListPage'>
      <div className='app-FilingListPage-header'>
        <Button className='app-FilingListPage-uploadButton' primary onClick={showUpload}>
          <UploadIcon />
          <div>Upload</div>
        </Button>
        <div className='app-FilingListPage-search'></div>
      </div>
      <div className='app-FilingListPage-inner'>
        {filings.loading ?
          <div className='app-FilingListPage-loading'>loading…</div> :
          filings.error ?
            <div className='app-FilingListPage-error'>{filings.error}</div> :
            filings.value && filings.value.length ?
              <FilingList app={app} filings={filings.value} /> :
              <div className='app-FilingListPage-noFilings'>
                <div><a onClick={showUpload} className='app-FilingListPage-noFilings-upload'>Upload a filing</a> to begin.</div>
              </div>
        }
      </div>
    </div>
    <ContactDetails />
  </div>;
}
