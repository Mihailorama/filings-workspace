import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ValidationProfile } from '../app/models';
import FileReference from '../app/components/file-reference';
import ValidationForm from '../app/components/validation-form';
import ValidationResult from '../app/components/validation-result';

import '../app/styles/style.less';

storiesOf('FileReference', module)
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

function profile(label: string): ValidationProfile {
  return {
    id: id(label),
    name: label,
  };
}

function profiles(...labels: string[]): ValidationProfile[] {
  return labels.map(x => profile(x));
}

storiesOf('ValidationForm', module)
.add('No profiles', () => <ValidationForm onSubmit={action('submit')}/>)
.add('One profile', () => <ValidationForm onSubmit={action('submit')} profiles={[profile('CRD IV 2.7.3')]}/>)
.add('Many profiles', () => <ValidationForm onSubmit={action('submit')} profiles={profiles('CRD IV 2.7.3', 'Solvency III')}/>)
;

storiesOf('ValidationResult', module)
.add('Loading', () => <ValidationResult status='loading'/>)
.add('Invalid', () => <ValidationResult status='invalid'/>)
.add('Valid', () => <ValidationResult status='valid'/>)
.add('Failed', () => <ValidationResult status='failed'/>)
;
