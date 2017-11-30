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

import * as classNames from 'classnames';
import * as React from 'react';

import './search-box.less';

export interface SearchBoxProps {
  searchText?: string;
  onSearch?: () => any;
  disabled?: boolean;
  placeholder: string;
  onSearchTextChange: (search: string) => any;
}

export default class SearchBox extends React.Component<SearchBoxProps> {

  componentDidMount(): void {
    this.focusIfEnabled();
  }

  componentDidUpdate(prevProps: SearchBoxProps): void {
    if (prevProps.disabled) {
      this.focusIfEnabled();
    }
  }

  render(): JSX.Element {
    const { disabled, placeholder, onSearch, onSearchTextChange, searchText } = this.props;
    return (
      <form className='app-SearchBox' onSubmit={e => {e.preventDefault(); if (onSearch) { onSearch(); }}}>
        <div className={classNames('app-SearchBox-search', {'app-SearchBox-searchEnabled': !disabled})}>
          <input ref='input' id='searchInput' type='text' placeholder={placeholder} value={searchText}
            onChange={e => onSearchTextChange(e.currentTarget.value)}/>
          <input type='submit' className='app-SearchBox-searchButton' value=''/>
        </div>
      </form>
    );
  }

  private focusIfEnabled(): void {
    if (!this.props.disabled) {
      (this.refs.input as HTMLElement).focus();
    }
  }

}
