import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { ValidationProfile } from '../app/models';
import ValidationForm from '../app/components/validation-form';
import ValidationResult from '../app/components/validation-result';

import '../app/styles/style.less';

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
    name: id(label),
    label,
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
.add('Fail', () => <ValidationResult status='fail'/>)
.add('Pass', () => <ValidationResult status='pass'/>)
;
