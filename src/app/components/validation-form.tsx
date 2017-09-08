import * as classNames from 'classnames';
import * as React from 'react';
import * as Dropzone from 'react-dropzone';
import { Component, Props, ReactNode } from 'react';

import { ValidationProfile, ValidationParams, paramsAreComplete } from '../models';
import FileReference from './file-reference';

import './validation-form.less';

interface FormProps {
  className?: string;
  onSubmit?: () => void;
  children: ReactNode;
}

function Form({className, onSubmit, children}: FormProps): JSX.Element {
  return <form className={classNames('ckr-Form', className)}
    onSubmit={onSubmit ? e => { e.preventDefault(); onSubmit(); } : undefined}
  >{children}</form>;
}

interface FormItemProps {
  className?: string;
  children: ReactNode;
}

function FormItem({className, children}: FormItemProps): JSX.Element {
  return <div className={classNames('ckr-FormItem', className)}>{children}</div>;
}

interface FormActionListProps {
  className?: string;
  children: ReactNode;
}

function FormActionList({className, children}: FormActionListProps): JSX.Element {
  return <div className={classNames('ckr-FormActionList', className)}>{children}</div>;
}

interface FormActionProps {
  className?: string;
  enabled?: boolean;
  children: ReactNode;
}

function FormAction({className, enabled, children}: FormActionProps): JSX.Element {
  return <button className={classNames('ckr-FormAction', className)} disabled={!enabled}>{children}</button>;
}

// Actual component.

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
        profile: profiles && profiles.length > 0 ? profiles[0].name : undefined,
      },
    };
  }

  componentWillReceiveProps(nextProps: ValidationFormProps): void {
    if (nextProps.profiles && nextProps.profiles.length && !this.state.params.profile) {
      this.setState({params: {...this.state.params, profile: nextProps.profiles[0].name}});
    }
  }

  render(): JSX.Element {
    const { profiles, onSubmit } = this.props;
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
          {profiles.map(({name, label}) => <option key={name} value={name}>{label}</option>)}
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
