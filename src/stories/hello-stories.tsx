import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Hello from '../app/components/hello';

storiesOf('Hello', module)
.add('Alice', () => <Hello name='Alice'/>)
.add('Sakura', () => <Hello name='さくら'/>)
;

storiesOf('Button', module)
.add('Action', () => <button onClick={action('button.onClick')}>Action!</button>)
.add('Link', () => <button onClick={linkTo('Hello', 'Alice')}>Link!</button>)
;
