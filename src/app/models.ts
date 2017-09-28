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

import { HeaderSlice, QueryableTablePage } from '@cfl/table-viewer';
import { Cell, Header, TableChunk, TableHeader, TableMetadata } from '@cfl/table-rendering-service';
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
 * One of the ways the backend might be asked to validate a document.
 */
export interface Profile {
  category?: 'validation';
  id: string;  // Internal name.
  name: string;  // Human-readable label.
  description?: string;
}

/**
 * Returned by `/categories/validation`. Container for ValdiationProfile instances.
 */
export interface Category {
  name: string;
  profiles: Profile[];
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
 * Information about filing returned by Document Service.
 */
export interface Filing {
  id: string;
  type: 'Filing' | 'FilingSummary';
  name: string;  // Human-chosen name for this filing.  (Defaults to name of uploaded file.)
  versions?: FilingVersion[];  // Included if type is `Filing`.
};

/**
 * Information about one version of a filing. (Filings at present always have exactly one version.)
 */
export interface FilingVersion {
  type: 'FilingVersion' | 'FilingVersionSummary';
  id: string;
  creator?: Actor;
  status: 'PENDING' | 'RUNNING' | 'DONE';
  validationStatus?: ValidationStatus;
  documents?: Document[];  // Included if type is `FilingVersion`
  filing?: Filing;  // Included if type is `FilingVersion`.
  created: string; // Date in XML Schema format
  deleted?: string;  // Date in XML Schema format
};

export type ValidationStatus = 'FATAL_ERROR' | 'ERROR' | 'WARNING' | 'OK';

/**
 * Describes the person or system that performed an action.
 */
export interface Actor {
  id: string;
  name?: string;
};

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

export class QueryableTablePageImpl implements QueryableTablePage {
  constructor(
    private readonly metadata: TableMetadata,
    private readonly chunk: TableChunk,
  ) {
    chunk.data = chunk.data.map(colData =>
      colData.map(cell => cell || {
        issues: [],
        facts: [],
      }),
    );
  }

  get key(): string {
    const { metadata, x, y, z } = this;
    return `${metadata.id}(${x},${y},${z})`;
  }

  get x(): number {
    return this.chunk.x;
  }

  get y(): number {
    return this.chunk.y;
  }

  get z(): number {
    return this.chunk.z;
  }

  get zHeaders(): Header[] {
    return this.chunk.zAxis;
  }

  get height(): number {
    return this.chunk.data[0].length;
  }

  get width(): number {
    return this.chunk.data.length;
  }

  get xDepth(): number {
    return this.metadata.x.breakdowns.length;
  }

  get yDepth(): number {
    return this.metadata.y.breakdowns.length;
  }

  getXHeaders(col: number): HeaderSlice[] {
    const slice = this.chunk.xAxis[col - this.x];
    return this.metadata.x.breakdowns.map((breakdown, i) => {
      return {
        breakdown,
        depth: slice[i].depth,
        header: slice[i],
        headers: slice,
      };
    });
  }

  getYHeaders(row: number): HeaderSlice[] {
    const slice = this.chunk.yAxis[row - this.y];
    return this.metadata.y.breakdowns.map((breakdown, i) => ({
      breakdown,
      depth: slice[i].depth,
      header: slice[i],
      headers: slice,
    }));
  }

  getRow(y: number): Cell[] {
    const row = y - this.y;
    return this.chunk.data.map(col => col[row]);
  }

  getCell(col: number, row: number): Cell {
    return this.chunk.data[col - this.x][row - this.y];
  }

  get pageCoordinates(): [number[], number[]] {
    return [this.getAxisPageCoordinates(this.metadata.x, this.width), this.getAxisPageCoordinates(this.metadata.y, this.height)];
  }

  get hasMultiplePages(): boolean {
    return this.x > 0 || this.y > 0 || this.metadata.x.sliceCount > this.width || this.metadata.y.sliceCount > this.height;
  }

  getPageCoordinates(x: number, y: number): [number, number] {
    return [Math.floor(x / this.width) * this.width, Math.floor(y / this.height) * this.height];
  }

  has(x: number, y: number): boolean {
    return x >= this.x && x < (this.x + this.width) && y >= this.y && y < (this.y + this.height);
  }

  private getAxisPageCoordinates(axis: TableHeader, pageSize: number): number[] {
    const coordinates = [];
    for (let i = 0; i < axis.sliceCount; i += pageSize) {
      coordinates.push(i);
    }
    return coordinates;
  }
}

export interface TableRenderingWindow {
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
}
