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
import { Store } from 'redux';
import { Provider } from 'react-redux';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { App, Profile } from '../app/models';
import { CheckerState } from '../app/state';
import AppBar from '../app/corefiling/app-bar';
import { Form, FormItem, FormActionList, FormAction } from '../app/components/form';
import FileReference from '../app/components/file-reference';
import ValidationForm from '../app/components/validation-form';
import ValidationResult from '../app/components/validation-result';
import ContactDetails from '../app/components/contact-details';
import CheckerAppContainer from '../app/containers/checker-app-container';
import CloseSymbol from '../app/components/close-symbol';

import '../app/styles/style.less';
import '../app/components/checker-app.less';

storiesOf('CloseSymbol', module)
.addDecorator(story => <div className='ckr-CheckerApp-resultOverlay'>{story()}</div>)
.add('Default size', () => <CloseSymbol/>)
;

const file = (name?: string, size: number = 1024 * 20, type?: string): File => {
  return {
    name,
    size,
    type,
  } as any;
};

storiesOf('FileReference', module)
.addDecorator(story => <div style={{margin: '1em auto', maxWidth: '400px'}}>{story()}</div>)
.add('No file', () => <FileReference/>)
.add('Bytes', () => <FileReference file={file('Best Soufflé Company 2017.xml', 69, 'application/xml')}/>)
.add('Kilobytes', () => <FileReference file={file('Amalagmated Holdings (Group).xml', 42 * 1024, 'application/xml')}/>)
.add('Megabytes', () => <FileReference file={file('accts.xml', 13 * 1024 * 1024, 'application/xml')}/>)
.add('Longer name', () => <FileReference file={
  file('United Frog Hunters Group (Holdings) Ltd annual accounts FINAL rev 4.zip', 77 * 1024)}/>)
;

storiesOf('Form items', module)
.addDecorator(story => <Form onSubmit={action('onSubmit')} style={{width: '400px'}}>{story()}</Form>)
.add('Enabled button', () => <FormActionList><FormAction primary enabled>Fold</FormAction></FormActionList>)
.add('Disabled button', () => <FormActionList><FormAction primary>Spindle</FormAction></FormActionList>)
.add('Other button', () => <FormActionList><FormAction enabled>Mutilate</FormAction><FormAction>Escape</FormAction></FormActionList>)
.add('Select', () => <FormItem>
    <label>Flavour</label>
    <select><option>Strawberry</option><option>Sump</option></select>
  </FormItem>)
;

// Some hackery for creating fake profiles.

function id(label: string): string {
  let hash = 0;
  for (let i = 0; i < label.length; i++) {
    const chr = label.charCodeAt(i);
    hash  = (((hash << 5) - hash) + chr) & 0x7FFFFFFF; // tslint:disable-line:no-bitwise
  }
  return `id_${hash.toString(16)}`;
}

function profile(label: string): Profile {
  return {
    id: id(label),
    name: label,
  };
}

function profiles(...labels: string[]): Profile[] {
  return labels.map(x => profile(x));
}

storiesOf('ValidationForm', module)
.addDecorator(story => <div className='ckr-CheckerApp ckr-CheckerApp-form'>{story()}</div>)
.add('Loading', () => <ValidationForm onSubmit={action('submit')}/>)
.add('Startup failed', () => <ValidationForm error='Startup failed (401).'/>)
.add('Form', () => <ValidationForm onSubmit={action('submit')} profiles={profiles('CRD IV 2.7.3', 'Solvency III')}/>)
.add('Upload error', () => <ValidationForm profiles={[profile('CRD IV 2.7.3')]} error='File error (404).'/>)
;

storiesOf('ValidationResult', module)
.addDecorator(story => <div className='ckr-CheckerApp ckr-CheckerApp-checking'>
  <h1>Backgorund</h1>
  <div className='ckr-CheckerApp-resultOverlay'>
    {story()}
    <ContactDetails/>
  </div>
</div>)
.add('Loading', () => <ValidationResult/>)
.add('Invalid', () => <ValidationResult status='ERROR'/>)
.add('Valid with warnings', () => <ValidationResult status='WARNING'/>)
.add('Valid', () => <ValidationResult status='OK'/>)
.add('Failed', () => <ValidationResult status='FATAL_ERROR'/>)
;

storiesOf('ContactDetails', module)
.add('Form', () => <div className='ckr-CheckerApp'><ContactDetails/></div>)
.add('Results', () => <div className='ckr-CheckerApp ckr-CheckerApp-results' style={{background: '#2C5173', paddingTop: '96px'}}>
  {/* <ValidationForm profiles={profiles('sock')}/>
  <ValidationResult status='OK'/> */}
  <ContactDetails/>
</div>)
;

const app = (name: string): App => {
  const id = name.toLowerCase().replace(/[^a-z]+/g, '-');
  return {
    id,
    name,
    href: `/${id}/`,
  };
};

const apps = (...names: string[]): App[] => names.map(name => app(name));

const sub = 'uuid-of-user';

storiesOf('AppBar', module)
.addDecorator(story => <div style={{height: '400px', backgroundColor: '#DDD'}}>{story()}</div>)
.add('Loading', () => <AppBar path='/quick-xbrl-validator/'/>)
.add('User with email only', () => <AppBar path='/quick-xbrl-validator/'
    apps={apps('Quick XBRL Validator')}
    user={{sub, email: 'b@example.com'}}/>)
.add('User with name', () => <AppBar path='/quick-xbrl-validator/'
    apps={apps('Quick XBRL Validator')}
    user={{sub, name: 'Tamandani Pleško', email: 'tp@example.com'}}/>)
.add('Multiple apps', () => <AppBar path='/quick-xbrl-validator/'
    apps={apps('Quick XBRL Validator', 'Beacon', 'Full Beam', 'Manage Account')}
    user={{sub, email: 'tp@example.com'}}/>)
;

const etc: CheckerState = {
  user: {sub, email: 'b@example.com'},
  apps: apps('Pass/Fail Validator'),
  profiles: profiles('Profile'),
  phase: 'startup',
};
const funcs: Store<CheckerState> = {
  getState: () => etc,
  dispatch: action('dispatch') as any,
  subscribe: action('subscribe') as any,
  replaceReducer: action('replaceReducer') as any,
};

storiesOf('App layout', module)
.add('Form', () => <Provider store={{
    ...funcs,
    getState: () => ({...etc,  phase: 'form'}),
  }}>
    <CheckerAppContainer/>
  </Provider>)
.add('Checking', () => <Provider store={{
    ...funcs,
    getState: () => ({...etc, phase: 'checking'}),
  }}>
    <CheckerAppContainer/>
  </Provider>)
.add('Result', () => <Provider store={{
    ...funcs,
    getState: () => ({...etc, profiles: profiles('Profile'), phase: 'results', status: 'OK'}),
  }}>
    <CheckerAppContainer/>
  </Provider>)
;
