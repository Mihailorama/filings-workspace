import * as React from 'react';
import { Component, Props } from 'react';
import { connect } from 'react-redux';

import { User, App } from '../models';
import { CheckerState } from '../state';
import AppBar from './app-bar';

export const HOME = `/${location.pathname.split('/')[1]}/`;

interface PropsFromState {
  user?: User;
  apps?: App[];
}

type AppBarContainerProps = Props<AppBarContainer> & PropsFromState;

class AppBarContainer extends Component<AppBarContainerProps> {
  render(): JSX.Element {
    const { user, apps } = this.props;
    return <AppBar path={HOME} user={user} apps={apps}/>;
  }
}

const propsFromState = ({ user, apps }: CheckerState): PropsFromState => ({user, apps});

export default connect(propsFromState)(AppBarContainer);
