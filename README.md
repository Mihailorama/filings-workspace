# CoreFiling Labs Quick XBRL Validator

A simple demonstration of how the CoreFiling Platform can be used to validate a document.

It starts by using the CoreFiling Platform API to request a list of validation
profiles, then presents a form for choosing one and uploading a file. It submits this
to the Document Service and polls for the validation status.


## Licence

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this software except in compliance with the License.
You may obtain a copy of the License at <http://www.apache.org/licenses/LICENSE-2.0>.

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.


## Stack

- [Typescript](https://github.com/Microsoft/TypeScript)
- [React](https://github.com/facebook/react)
- [Redux](http://redux.js.org/)
- [Redux-Saga](https://redux-saga.js.org/)
- [Storybook](https://storybook.js.org)
- [Webpack](https://github.com/webpack/webpack)


## Development prerequisites

Install node@>=6.0.0, npm@>=4.0.0 and yarn@>=1.0.0

```bash
yarn install
```


## Storybook

```bash
yarn storybook
```

and visit <http://localhost:6006/>.

If and when creating new modules in `./src/stories`, add an import from `src/stories/index.ts`.


## Unit tests

Single run:

```bash
yarn test
```

Watch files:

```bash
yarn test-debug
```


## Development server

You need `HOST` to be a name for your development machine for which SSL certificates are available.

```bash
npm config set @cfl/passfail-validator:devserver-host $HOST
npm start
```

Then open `https://$HOST:9091/`

### SSL

The dev server uses HTTPS, with certificates copied in to `.dev/`.


## Build

```bash
yarn compile
```


## Package

```bash
yarn pack # Produces cfl-passfail-validator-$VERSION.tgz
```
