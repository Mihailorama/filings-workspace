/**
 * Display a reference to the file the user has uploaded.
 */

import * as classNames from 'classnames';
import humanSize = require('human-size');
import * as React from 'react';
import { Component, Props, ReactNode } from 'react';

import './file-reference.less';

interface FileReferenceProps {
  className?: string;
  file?: File;
}

export default function FileReference({className, file}: FileReferenceProps): JSX.Element {
  if (!file) {
    return <span>No file</span>;
  }
  return <span className={classNames('ckr-FileReference', className)}>
    <span className='ckr-FileReference-name'>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 24' className='ckr-FileReference-icon'>
        <path className='ckr-FileReference-outline' d='M1,1H11l6,8V23H1z'/>
        <path className='ckr-FileReference-inline' d='M11,1l-2,6 8,2'/>
      </svg>
      {file.name}
    </span>
    <span className='ckr-FileReference-size'>{humanSize(file.size)}</span>
  </span>;
}
