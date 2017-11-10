# CoreFiling Labs Quick XBRL Validator

A simple demonstration of how the CoreFiling Platform can be used to validate a document.

## Upload

![upload3](https://user-images.githubusercontent.com/1489182/31607189-5a9ce7ea-b263-11e7-8233-c394db384606.png)

## Review

![pass-with-tables](https://user-images.githubusercontent.com/1489182/31607196-602adff0-b263-11e7-8846-4f8df0793487.PNG)


## Synopsis

It starts by using the [CoreFiling True North Platform][] API to request a list of validation
profiles, then presents a form for choosing one and uploading a file. It submits this
to the Document Service and polls for the validation status.

Once the document has been processed it displays the valdiation status
and displays table renderings provided by the Table Rendering API.
This uses Table Linkbase if the taxonomy includes it, otherwise
synthesizes table layouts automatically.

  [CoreFiling True North Platform]: https://www.corefiling.com/products/true-north/


## Stack

- [Typescript](https://github.com/Microsoft/TypeScript)
- [React](https://github.com/facebook/react)
- [Redux](http://redux.js.org/)
- [Redux-Saga](https://redux-saga.js.org/)
- [Storybook](https://storybook.js.org)
- [Webpack](https://github.com/webpack/webpack)


## Running the server


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

Storybook entries are for a component in module `foo.tsx` go in a module next to it called `foo-stories.tsx`.


## Unit tests

Single run:

```bash
yarn test
```

Watch files:

```bash
yarn test-debug
```

## Simple server

This uses a simple Express-based server to stand in for the facilities supplied
by the gateway to the CoreFiling production cluster. You need anOAuth2
client ID and  secret obtaiend from CoreFiling to make this work; these are
passed in as environment variables. One way to do this is as follows:

```bash
echo CLIENT_ID=… CLIENT_SECRET=… >> .env
env `cat .env` yarn start
```

Then open <http://localhost:8080/quick-xbrl-validator/>.


## Development server

This watches the source files and reruns the Webpack build when they change.
It attempts hot reloading of modules and style sheets.

You need `HOST` to be a name for your development machine for which SSL certificates are available.

```bash
npm config set @cfl/quick-xbrl-validator:devserver-host $HOST
npm run dev:server
```

Then open `https://$HOST:9091/quick-xbrl-validator/`

### SSL

The dev server uses HTTPS, with certificates copied in to `.dev/`.


## Build

```bash
yarn compile
```


## Package

```bash
yarn pack # Produces cfl-quick-xbrl-validator-$VERSION.tgz
```


## Licence

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this software except in compliance with the License.
You may obtain a copy of the License at <http://www.apache.org/licenses/LICENSE-2.0>.

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
