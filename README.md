# CoreFiling Labs Pass/Fail Validator

A simple demonstrator of using the CoreFiling Platform to valdiate a document.


## Stack

- [Typescript](https://github.com/Microsoft/TypeScript)
- [React](https://github.com/facebook/react)
- [Storybook](https://storybook.js.org)
- [Webpack](https://github.com/webpack/webpack)


## Development prerequisites

Install node@>=6.0.0, npm@>=4.0.0 and yarn@>=0.21.0

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

The dev server uses HTTPS, with certificates checked in to `.dev/`. When these expire, they will need to be replaced by the [latest ones](https://wiki.int.corefiling.com/cfl/CflDotIo).


## Build

```bash
yarn compile
```


## Package

```bash
yarn pack # Produces cfl-passfail-validator-$VERSION.tgz
```
