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

// Interface declarations for the JSON objects returned by the API.
// There are example values in ./tests/model-examples.ts.

/**
 * Info about the currently logged-in user.
 */

export interface User {
  sub: string;  // Subject indentifier: uniquely identifies this user.
  email: string;
  name?: string;
  preferred_username?: string;
}

/**
 * Information about other apps.
 */
export interface App {
  id: string;
  name: string;
  href: string;
  colour?: string;
  iconHref?: string;  // Not SRC for reasons I am sure are excellent.
  features?: string[];  // Optional features enabled in this app.
}

/**
 * Information needed to request a validation operation.
 */
export interface ValidationParams {
  profile: string;
  file: File;
}

/**
 * Check these params are ready to be submitted.
 */
export function paramsAreComplete(params: Partial<ValidationParams>): params is ValidationParams {
  const { profile,  file } = params;
  return !!profile && !!file;
}

/**
 * Describes the person or system that performed an action.
 */
export interface Actor {
  id: string;
  name?: string;
}

/**
 * Describes a representation of data associated with a filing.
 */
export interface Document {
  id: string;
  category: 'validation' | 'unknown';
  profile: string;  // Identifies a validation profile.
  creation?: {
    status: 'PENDING' | 'RUNNING' | 'DONE';
  };
  created: string;  // XML Schema data format
}

export interface TableRenderingWindow {
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
}
