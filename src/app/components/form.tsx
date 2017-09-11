import * as classNames from 'classnames';
import * as React from 'react';
import * as Dropzone from 'react-dropzone';
import { Component, Props, ReactNode } from 'react';

import { ValidationProfile, ValidationParams, paramsAreComplete } from '../models';
import FileReference from './file-reference';

import './form.less';

interface FormProps {
  className?: string;
  onSubmit?: () => void;
  children: ReactNode;
}

export function Form({className, onSubmit, children}: FormProps): JSX.Element {
  return <form className={classNames('ckr-Form', className)}
    onSubmit={onSubmit ? e => { e.preventDefault(); onSubmit(); } : undefined}
  >{children}</form>;
}

interface FormItemProps {
  className?: string;
  children: ReactNode;
}

export function FormItem({className, children}: FormItemProps): JSX.Element {
  return <div className={classNames('ckr-FormItem', className)}>{children}</div>;
}

interface FormActionListProps {
  className?: string;
  children: ReactNode;
}

export function FormActionList({className, children}: FormActionListProps): JSX.Element {
  return <div className={classNames('ckr-FormActionList', className)}>{children}</div>;
}

interface FormActionProps {
  className?: string;
  enabled?: boolean;
  children: ReactNode;
}

export function FormAction({className, enabled, children}: FormActionProps): JSX.Element {
  return <button className={classNames('ckr-FormAction', className)} disabled={!enabled}>{children}</button>;
}
