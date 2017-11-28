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

/**
 * App bar with user name and menu. Simplified down from the brand bar + app bar of the CoreFiling UI framework.
 */

import * as classNames from 'classnames';
import * as React from 'react';
import { Component, Props } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import CoreFilingLogo from './corefiling-logo';
import NavMenu, { MenuItem } from './nav-menu';
import WorkspaceIcon from './workspace-icon';
import { User } from '../models';
import { WorkspaceAppSpec } from '../state';
import { AUTH_LOGOUT } from '../urls';
import { linkForFiling, HOME } from '../workspace/workspace-apps';

import './app-bar.less';

export interface AppBarProps extends Props<AppBar> {
  apps: {[key: string]: WorkspaceAppSpec};
  app?: WorkspaceAppSpec;
  filingVersionId?: string;
  user?: User;
  className?: string;
}

export default class AppBar extends Component<AppBarProps> {
  render(): JSX.Element {
    const { app, filingVersionId, user, className } = this.props;
    const apps = Object.keys(this.props.apps).map(key => this.props.apps[key]);

    // Assemble the menu.
    const itemGroups: MenuItem[][] = [];
    if (apps) {
      const appItems = apps.filter(x => x !== app)
        .map(x => {
          const link = linkForFiling(x, filingVersionId);
          return {label: x.name, href: link.href, external: link.external};
        });
      if (appItems.length > 0) {
        itemGroups.push(appItems);
      }
    }
    itemGroups.push([{label: 'Log out', href: AUTH_LOGOUT, external: true}]);

    const name = app ? app.name : 'Innovations';
    const href = app ? app.href : HOME;
    const icon = app && app.icon ? app.icon : (props: any) => <WorkspaceIcon {... props} />;

    return <header className={classNames('app-AppBar', className)}>
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <div className='app-AppBar-brand'>
        <Link to={href} className='app-AppBar-appLogo'>
          {icon({className: 'app-AppBar-appSymbol'})}
          {name}
        </Link>
        <CoreFilingLogo className='app-AppBar-corefilingLogo'/>
      </div>
      <nav className='app-AppBar-nav'>
        <ul className='app-AppBar-breadcrumbNav'>
          <li><Link to={HOME} className='app-AppBar-breadcrumbLink'>Home</Link></li>
        </ul>
        {user && <span className='app-AppBar-userName'>{user.email}</span>}
        <NavMenu itemGroups={itemGroups}/>
      </nav>
    </header>;
  }
}
