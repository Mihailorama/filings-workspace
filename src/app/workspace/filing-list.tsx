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
import * as classNames from 'classnames';
import { Link } from 'react-router-dom';

import { WorkspaceAppSpec, WorkspaceFiling, FilingListMode } from './reducers';
import UploadIcon from './upload-icon';
import { linkForFiling, LinkDef } from './workspace-apps';

import Button from '../components/button';
import ContactDetails from '../components/contact-details';
import SearchBox from '../fullbeam-search/search-box';

import { Item } from '../state';
import { FilingMatch } from '../fullbeam-search/models';

import './filing-list.less';

export interface FilingListPageProps {
  app: WorkspaceAppSpec;
  mode: FilingListMode;
  userFilings: Item<WorkspaceFiling[]>;
  searchResultFilings: Item<FilingMatch[]>;
  showUpload: () => void;
  changeMode: (mode: FilingListMode) => void;

  searchPerformed: boolean;
  searchText?: string;
  onSearch: () => void;
  onSearchTextChange: (search: string) => void;
  onSearchSelection: (app: WorkspaceAppSpec, selectedFiling: FilingMatch) => void;
}

function createFilingRow(id: string, name: string, date: Date, {href, external}: LinkDef): JSX.Element {
  const format = new Intl.DateTimeFormat(window.navigator.language || 'en-US', {
    year: 'numeric', month: 'short', day: '2-digit', hour: 'numeric', minute: 'numeric', second: 'numeric',
  });
  const innards = [
    <div className='app-FilingList-row-name app-FilingList-row-cell'>{name}</div>,
    <div className='app-FilingList-row-date app-FilingList-row-cell'>{format.format(date)}</div>,
  ];
  return external ?
    <a key={id} className='app-FilingList-row' href={href}>{innards}</a> :
    <Link key={id} className='app-FilingList-row' to={href}>{innards}</Link>;
}

function FilingList({app, filings}: {app: WorkspaceAppSpec, filings: WorkspaceFiling[]}): JSX.Element {
  return <div className='app-FilingList'>
    <div className='app-FilingList-header'>
      <div className='app-FilingList-header-cell app-FilingList-header-name app-FilingList-header-main'>Recent filings</div>
      <div className='app-FilingList-header-cell app-FilingList-header-date'>Date</div>
    </div>
    <div className='app-FilingList-list'>
      {filings.map(filing =>
        createFilingRow(filing.id, filing.name, filing.date, linkForFiling(app, filing.id)))}
    </div>
  </div>;
}

function SearchResultFilingList({app, filings, onSearchSelection}: {app: WorkspaceAppSpec, filings: FilingMatch[],
    onSearchSelection: (app: WorkspaceAppSpec, selectedFiling: FilingMatch) => void}): JSX.Element {
  return <div className='app-FilingList'>
    <div className='app-FilingList-header'>
      <div className='app-FilingList-header-cell app-FilingList-header-main app-FilingList-header-only'>Matching filings</div>
    </div>
    <div className='app-FilingList-list'>
      {filings.map(filing => {
        return <a key={filing.filing.id} className='app-FilingList-row' onClick={
            e => { e.preventDefault(); onSearchSelection(app, filing); }}>
            <div className='app-FilingList-row-cell app-FilingList-row-only'>{filing.filingName}</div>
            </a>;
      })}
    </div>
  </div>;
}

function UserFilingList({ app, userFilings, showUpload }:
  { app: WorkspaceAppSpec, userFilings: Item<WorkspaceFiling[]>, showUpload: () => void }): JSX.Element {
  return <div className='app-FilingListPage-modeContainer'>
    <div className='app-FilingListPage-header app-FilingListPage-uploadHeader'>
      <Button className='app-FilingListPage-uploadButton' onClick={showUpload}>
        <UploadIcon />
        <div>Upload</div>
      </Button>
    </div>
    <div className='app-FilingListPage-inner'>
      {userFilings.loading ?
        <div className='app-FilingListPage-loading'>loading…</div> :
        userFilings.error ?
          <div className='app-FilingListPage-error'>{userFilings.error}</div> :
          userFilings.value && userFilings.value.length ?
            <FilingList app={app} filings={userFilings.value} /> :
            <div className='app-FilingListPage-noFilings'>
              <div><a onClick={showUpload} className='app-FilingListPage-noFilings-upload'>Upload a filing</a> to begin.</div>
            </div>}
    </div>
  </div>;
}

function SearchResultsList({ app, searchText, searchPerformed, searchResultFilings, onSearch, onSearchTextChange, onSearchSelection }:
  { app: WorkspaceAppSpec, searchText?: string, searchPerformed: boolean, searchResultFilings: Item<FilingMatch[]>,
    onSearch: () => void, onSearchTextChange: (search: string) => void,
    onSearchSelection: (app: WorkspaceAppSpec, selectedFiling: FilingMatch) => void,
  }): JSX.Element {
  return <div className='app-FilingListPage-modeContainer'>
    <div className='app-FilingListPage-header app-FilingListPage-searchHeader'>
      <div className='app-FilingListPage-searchLabel'>Search:</div>
      <SearchBox onSearch={onSearch} onSearchTextChange={onSearchTextChange} searchText={searchText}
        className='app-FilingListPage-searchBox' placeholder='Company name or number' />
    </div>
    <div className='app-FilingListPage-inner'>
      {searchResultFilings.loading ?
        <div className='app-FilingListPage-loading'>loading…</div> :
        searchResultFilings.error ?
          <div className='app-FilingListPage-error'>{searchResultFilings.error}</div> :
          searchResultFilings.value && searchResultFilings.value.length ?
            <SearchResultFilingList app={app} filings={searchResultFilings.value} onSearchSelection={onSearchSelection} /> :
            <div className='app-FilingListPage-noFilings'>
              {searchPerformed ? <div>No results.</div> : <div>Search for US SEC filings.</div>}
            </div>
      }
    </div>
  </div>;
}

interface FilingListPageModeSelectorProps {
  currentMode: FilingListMode;
  requiredMode: FilingListMode;
  title: string;
  hasLeft?: boolean;
  hasRight?: boolean;
  changeMode: (mode: FilingListMode) => void;
};

function FilingListPageModeSelector(props: FilingListPageModeSelectorProps): JSX.Element {
  const { currentMode, requiredMode, title, changeMode, hasLeft, hasRight } = props;
  return <a className={
    classNames('app-FilingListPageModeChanger-selector', {
      'app-FilingListPageModeChanger-selected': currentMode === requiredMode,
      'app-FilingListPageModeChanger-selected-hasLeft': hasLeft,
      'app-FilingListPageModeChanger-selected-hasRight': hasRight,
    })} onClick={e => { e.preventDefault(); changeMode(requiredMode); }} href='#' role='tab'>{title}</a>;
}

function FilingListPageModeChanger({mode, changeMode}: {mode: FilingListMode, changeMode: (mode: FilingListMode) => void}): JSX.Element {
  return <div className='app-FilingListPageModeChanger'>
    <FilingListPageModeSelector currentMode={mode} hasRight={true} requiredMode='user' title='Recent filings' changeMode={changeMode}/>
    <FilingListPageModeSelector currentMode={mode} hasLeft={true} requiredMode='search' title='Search SEC filings' changeMode={changeMode}/>
  </div>;
}

export default function FilingListPage({ app, mode, userFilings, searchResultFilings, searchPerformed, searchText,
  showUpload, onSearch, onSearchTextChange, onSearchSelection, changeMode }: FilingListPageProps): JSX.Element {
  return <div className='app-FilingListPage-container'>
    <div className='app-FilingListPage'>
      <FilingListPageModeChanger mode={mode} changeMode={changeMode} />
      {(mode === 'user')
        ? <UserFilingList app={app} userFilings={userFilings} showUpload={showUpload} />
        : <SearchResultsList app={app} searchText={searchText} searchPerformed={searchPerformed} searchResultFilings={searchResultFilings}
          onSearch={onSearch} onSearchTextChange={onSearchTextChange} onSearchSelection={onSearchSelection} />}
    </div>
    <ContactDetails />
  </div>;

}
