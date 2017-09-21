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
import * as Dropzone from 'react-dropzone';
import { Component, Props } from 'react';

import { Profile, ValidationParams, paramsAreComplete } from '../models';
import FileReference from './file-reference';
import { Form, FormItem, FormActionList, FormAction } from './form';

import './validation-form.less';

export interface ValidationFormProps extends Props<ValidationForm> {
  profiles?: Profile[];
  error?: string;

  onSubmit?: (params: ValidationParams) => void;
}

interface ValidationFormState {
  params: Partial<ValidationParams>;
}

export default class ValidationForm extends Component<ValidationFormProps, ValidationFormState> {
  constructor(props: ValidationFormProps) {
    super(props);

    const { profiles } = props;

    this.state = {
      params: {
        profile: profiles && profiles.length > 0 ? profiles[0].id : undefined,
      },
    };
  }

  componentWillReceiveProps(nextProps: ValidationFormProps): void {
    if (nextProps.profiles && nextProps.profiles.length && !this.state.params.profile) {
      this.setState({params: {...this.state.params, profile: nextProps.profiles[0].id}});
    }
  }

  render(): JSX.Element {
    const { profiles, error, onSubmit } = this.props;
    const { params } = this.state;

    if (!profiles) {
      return <div  className='ckr-ValidationForm-loading'>
          <span>{error || 'Loading\u2009…'}</span>
        </div>;
    }

    return <Form className='ckr-ValidationForm' onSubmit={() => this.onSubmit()}>
      <FormItem>
        {
          error
          ? <div className='ckr-ValidationForm-dropzone ckr-ValidationForm-errorDropzone'>
              <span  className='ckr-ValidationForm-error'>{error}</span>
            </div>
          : <Dropzone
              className='ckr-ValidationForm-dropzone'
              activeClassName='ckr-ValidationForm-dropzoneActive'
              multiple={false}
              accept='.xml,.xbrl,.html,.htm,.zip'
              aria-label='File to validate'
              onDrop={(files: File[]) => this.onChange({file: files[0]})}
            >
              <div>
                {params.file && <FileReference className='ckr-ValidationForm-file' file={params.file}/>}
                {!params.file && <div>
                    <h2 className='ckr-ValidationForm-heading'>Drag &amp; Drop</h2>
                    <div className='ckr-ValidationForm-prompt'>
                      your file here, or <span className='ckr-ValidationForm-btn'>browse</span>
                    </div>
                    <div className='ckr-ValidationForm-hint'>XBRL, Inline XBRL, or ZIP. Up to 5&thinsp;MB</div>
                  </div>}
                </div>
            </Dropzone>
        }
      </FormItem>
      <FormItem>
        <label htmlFor='profile-pickr'>Validation profile</label>
        <select id='profile-pickr' disabled={!onSubmit} onChange={e => this.onChange({profile: e.currentTarget.value})}>
          {profiles.map(({id, name}) => <option key={id} value={id}>{name}</option>)}
        </select>
      </FormItem>
      <FormActionList>
        <FormAction enabled={onSubmit && paramsAreComplete(params)} primary>Validate</FormAction>
      </FormActionList>
    </Form>;
  }

  onChange(delta: Partial<ValidationParams>): void {
    this.setState({params: {...this.state.params, ...delta}});
  }

  onSubmit(): void {
    const { onSubmit } = this.props;
    const { params } = this.state;
    if (onSubmit && paramsAreComplete(params)) {
      onSubmit(params);
      this.setState({params: {...params, file: undefined}});
    }
  }
}
