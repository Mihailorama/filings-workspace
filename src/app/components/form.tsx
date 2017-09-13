import * as classNames from 'classnames';
import * as React from 'react';
import { ReactNode } from 'react';

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
  primary?: boolean;
  enabled?: boolean;
  children: ReactNode;
}

export function FormAction({className, enabled, primary, children}: FormActionProps): JSX.Element {
  return <button
    className={classNames('ckr-FormAction', className, {'ckr-FormAction-primary': primary})}
    disabled={!enabled}>{children}</button>;
}
