import * as React from 'react';
import * as Dropzone from 'react-dropzone';
import { Component, Props } from 'react';

import { ValidationProfile, ValidationParams, paramsAreComplete } from '../models';
import FileReference from './file-reference';
import { Form, FormItem, FormActionList, FormAction } from './form';

import './validation-form.less';

export interface ValidationFormProps extends Props<ValidationForm> {
  profiles?: ValidationProfile[];

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
    const { profiles } = this.props;
    const { params } = this.state;

    if (!profiles) {
      return <div  className='ckr-ValidationForm ckr-ValidationForm-loading'>
          Loading&thinsp;…
        </div>;
    }

    return <Form className='ckr-ValidationForm' onSubmit={() => this.onSubmit()}>
      <FormItem>
        <label>Validation profile</label>
        <select onChange={e => this.onChange({profile: e.currentTarget.value})}>
          {profiles.map(({id, name}) => <option key={id} value={id}>{name}</option>)}
        </select>
      </FormItem>
      <FormItem>
        <Dropzone
          className='ckr-ValidationForm-dropzone'
          activeClassName='ckr-ValidationForm-dropzoneActive'
          multiple={false}
          onDrop={(files: File[]) => this.onChange({file: files[0]})}
        >
          <div>
            {params.file && <FileReference className='ckr-ValidationForm-file' file={params.file}/>}
            {!params.file && <div>
                <h2 className='ckr-ValidationForm-heading'>Drag file to upload or</h2>
                <div className='ckr-ValidationForm-btn'><span className='ckr-Button'>Choose file to upload</span></div>
                <div className='ckr-ValidationForm-hint'>(Zip only / 5MB max)</div>
              </div>}
            </div>
        </Dropzone>
      </FormItem>
      <FormActionList>
        <FormAction enabled={paramsAreComplete(params)}>Validate</FormAction>
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
    }
  }
}
