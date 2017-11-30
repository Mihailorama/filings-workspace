# CoreFiling Labs Filings Workspace

A demonstration of CoreFiling's True North Data Platform.

This application demonstrates the platform's support for working with XBRL
filings and provides links to other applications that demonstrate other
platform features.

To try out these examples, please sign-up for the True North Data Platform
at <https://www.corefiling.com/platform/>.

## Working with XBRL filings

Each example requires the user to select a filing. This can be done by
uploading a filing, selecting a filing from the dataset of all
US Securities and Exchange Commission filings, or reusing a recent filing.

When uploading a filing, choose the relevant "Validation Profile". This
ensures the document is validated against the correct set of business rules.

This step uses the True North Data Platform Document Service and Search
Service APIs. Documents are uploaded to the Document Service.

The code can be found [in src/app/workspace](./src/app/workspace).

### Quick XBRL Validator

This example displays the validation status of the filing from the Validation
Service API.

The code can be found [in src/app/validator](./src/app/validator).

### Quick XBRL Viewer

This example displays table renderings provided by the Table Rendering API.
This uses Table Linkbase if the taxonomy includes it, otherwise synthesizes
table layouts automatically.

The code can be found [in src/app/viewer](./src/app/viewer).

### Filing Statistics

This example displays statistics derived from CoreFiling platform APIs.

The Filing Statistics Service API is a CoreFiling Labs API that aggregates
the statistics.

The code can be found [in src/app/statistics](./src/app/statistics).

### Benfords Analysis Report

This example shows how the CoreFiling Platform can be used to perform
analysis of XBRL documents.

An [Open Source CoreFiling Labs service](https://github.com/CoreFiling/digit-frequency-analysis-service-impl)
is used to calculate statistics related to [Benford's law](https://en.wikipedia.org/wiki/Benford%27s_law).
Benford's law is an observation about the frequency distribution of leading digits in
many real-life sets of numerical data that has applications in accounting fraud detection.

The code can be found [in src/app/benfords](./src/app/benfords).

## Other applications demonstrating platform features

- [Quick Taxonomy Info](https://github.com/CoreFiling/quick-taxonomy-info) demonstates searching for concepts in a taxonomy.
- [Taxonomy Packager](https://github.com/CoreFiling/taxonomy-packager) demonstates creating an XBRL Taxonomy Package from a taxonomy ZIP file.
- [XBRL Document Change Report](https://github.com/CoreFiling/xbrl-document-change-report) demonstates comparing two versions of a filing to review the changes.

## Quick start

Sign-up for the True North Data Platform at <https://www.corefiling.com/platform/>.

As part of the sign-up process you can access a CoreFiling-hosted copy of this
application. The following instructions allow you to run a local copy based on
a checkout of this Git repository.

Install node@>=6.0.0, npm@>=4.0.0 and yarn@>=1.0.0.

```bash
$ yarn install
$ yarn start
```

The application will be available on <http://localhost:8080/filings-workspace/>.

When prompted, log in using the email address and password for your CoreFiling account.

### Configuring authentication (not required)

To configure non-default OAuth 2 client credentials (supplied by CoreFiling)
export the following variables before starting the application with `yarn start`.

```bash
$ export CLIENT_ID="your-client-id"
$ export CLIENT_SECRET="your-client-secret"
```

## Development

See [Getting Started](#getting-started) for the dependencies.

### Stack

- [Typescript](https://github.com/Microsoft/TypeScript)
- [React](https://github.com/facebook/react)
- [Redux](http://redux.js.org/)
- [Redux-Saga](https://redux-saga.js.org/)
- [Storybook](https://storybook.js.org)
- [Webpack](https://github.com/webpack/webpack)

### Storybook

```bash
yarn storybook
```

and visit <http://localhost:6006/>.

### Unit tests

Single run:

```bash
yarn test
```

Watch files:

```bash
yarn test-debug
```

### Build

```bash
yarn compile
```

### Package

```bash
yarn pack # Produces cfl-filings-workspace-$VERSION.tgz
```

### Development server

The webpack development server is currently optimised for running in CoreFiling's
development environment and cannot easily be used externally.

## Licence

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this software except in compliance with the License.
You may obtain a copy of the License at <http://www.apache.org/licenses/LICENSE-2.0>.

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
