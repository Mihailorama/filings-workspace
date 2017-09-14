/**
 * App bar with user name and menu. Simplified down from the brand bar + app bar of the CoreFiling UI framework.
 */

import * as classNames from 'classnames';
import * as React from 'react';
import { Component, Props } from 'react';

import { User, App } from '../models';
import { appHelp, AUTH_LOGOUT } from '../urls';
import AppSymbol from './app-symbol';
import CoreFilingLogo from './corefiling-logo';
import NavMenu, { MenuItem } from './nav-menu';

import './app-bar.less';

export interface AppBarProps extends Props<AppBar> {
  path: string;
  user?: User;
  apps?: App[];
}

export default class AppBar extends Component<AppBarProps> {
  render(): JSX.Element {
    const { path, user, apps } = this.props;

    // Assemble the menu.
    const itemGroups: MenuItem[][] = [];
    if (apps) {
      const appItems = apps.filter(x => x.href !== path).map(x => ({label: x.name || x.id, href: x.href}));
      if (appItems.length > 0) {
        itemGroups.push(appItems);
      }
      const app = apps.find(x => x.href === path);
      if (app) {
        itemGroups.push([{label: 'User’s Guide', href: appHelp(app)}]);
      }
    }
    itemGroups.push([{label: 'Log out', href: AUTH_LOGOUT}]);

    return <header className={classNames('ckr-AppBar')}>
      <div className='ckr-AppBar-brand'>
        <a href={path} className='ckr-AppBar-appLogo'>
          <AppSymbol className='ckr-AppBar-appSymbol'/>
          Boolean Validator</a>
        <CoreFilingLogo className='ckr-AppBar-corefilingLogo'/>
      </div>
      <nav className='ckr-AppBar-nav'>
        <ul className='ckr-AppBar-breadcrumbNav'>
          <li><a href={path} className='ckr-AppBar-breadcrumbLink'>Home</a></li>
        </ul>
        {user && <span className='ckr-AppBar-userName'>{user.name || user.preferred_username || user.email}</span>}
        <NavMenu itemGroups={itemGroups}/>
      </nav>
    </header>;
  }
}
