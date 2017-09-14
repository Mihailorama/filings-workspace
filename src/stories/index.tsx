import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { App, Profile } from '../app/models';
import AppBar from '../app/corefiling/app-bar';
import FileReference from '../app/components/file-reference';
import ValidationForm from '../app/components/validation-form';
import ValidationResult from '../app/components/validation-result';
import ContactDetails from '../app/components/contact-details';

import '../app/styles/style.less';
import '../app/components/checker-app.less';

storiesOf('FileReference', module)
.addDecorator(story => <div style={{margin: '1em auto', maxWidth: '400px'}}>{story()}</div>)
.add('No file', () => <FileReference/>)
.add('XML file', () => <FileReference file={new File(['CONTENT'], 'greet.xml', {type: 'application/xml'})}/>)
.add('ZIP file', () => <FileReference file={new File(['CONTENT'], 'greet.zip', {type: 'application/zip'})}/>)
.add('Larger', () => {
  let x = 'CONTENT';
  const iterations = 14;
  for (let i = 0; i < iterations; i++) {
    x += x + x;
  }
  return <FileReference file={new File([x], 'greet.zip', {type: 'application/xbrl+xml'})}/>;
})
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
.add('No profiles', () => <ValidationForm onSubmit={action('submit')}/>)
.add('Profiles', () => <ValidationForm onSubmit={action('submit')} profiles={profiles('CRD IV 2.7.3', 'Solvency III')}/>)
.add('Error', () => <ValidationForm profiles={[profile('CRD IV 2.7.3')]} error='Oh, dear'/>)
;

storiesOf('ValidationResult', module)
.addDecorator(story => <div className='ckr-CheckerApp ckr-CheckerApp-checking'><h1>Backgorund</h1>{story()}</div>)
.add('Loading', () => <ValidationResult/>)
.add('Invalid', () => <ValidationResult status='ERROR'/>)
.add('Valid with warnings', () => <ValidationResult status='WARNING'/>)
.add('Valid', () => <ValidationResult status='OK'/>)
.add('Failed', () => <ValidationResult status='FATAL_ERROR'/>)
;

storiesOf('ContactDetails', module)
.addDecorator(story => <div className='ckr-App'>{story()}</div>)
.add('contact us', () => <ContactDetails/>)
;

const app = (name: string): App => {
  const id = name.toLowerCase().split(' ').join('');
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
.add('Loading', () => <AppBar path='/booleanvalidator/'/>)
.add('User with email only', () => <AppBar path='/booleanvalidator/'
    apps={apps('Boolean Validator')}
    user={{sub, email: 'b@example.com'}}/>)
.add('User with name', () => <AppBar path='/booleanvalidator/'
    apps={apps('Boolean Validator')}
    user={{sub, name: 'Tamandani Pleško', email: 'tp@example.com'}}/>)
.add('Multiple apps', () => <AppBar path='/booleanvalidator/'
    apps={apps('Boolean Validator', 'Beacon', 'Full Beam', 'Manage Account')}
    user={{sub, email: 'tp@example.com'}}/>)
;
