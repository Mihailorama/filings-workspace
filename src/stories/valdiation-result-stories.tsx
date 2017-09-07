import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import ValidationResult from '../app/components/validation-result';

storiesOf('ValidationResult', module)
.add('Fail', () => <ValidationResult status='fail'/>)
.add('Pass', () => <ValidationResult status='pass'/>)
;
