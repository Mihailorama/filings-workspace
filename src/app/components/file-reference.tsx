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
  return <span className={classNames('cflbv-FileReference', className)}>
    <span className='cflbv-FileReference-name'>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 24' className='cflbv-FileReference-icon'>
        <path className='cflbv-FileReference-outline' d='M1,1H11l6,8V23H1z'/>
        <path className='cflbv-FileReference-inline' d='M11,1l-2,6 8,2'/>
      </svg>
      {file.name}
    </span>
    <span className='cflbv-FileReference-size'>{humanSize(file.size)}</span>
  </span>;
}
