# Web UI Starter Kit

## Stack
- [Typescript](https://github.com/Microsoft/TypeScript)
- [React](https://github.com/facebook/react)
- [Webpack](https://github.com/webpack/webpack)

---

# Development
## Prerequisites
Install node@>=6.0.0, npm@>=4.0.0 and yarn@>=0.21.0 and [configure for use in CFL](https://wiki.int.corefiling.com/dev/NPM)

```bash
yarn install
```

## Build
```bash
npm run compile
```

## Package
```bash
npm pack # Produces web-ui-starter-kit-$VERSION.tgz
```

## Test
### Single run
```bash
npm run test
```

### Watch files
```bash
npm run test-debug
```

## Development Server
```bash
npm config set web-ui-starter-kit:devserver-host `hostname`.cfl.io # You must have a working DNS entry for "`hostname`.cfl.io".
npm start
open https://`hostname`.cfl.io:9091/
```

### SSL
The dev server uses HTTPS, with certificates checked in to `.dev/`. When these expire, they will need to be replaced by the [latest ones](https://wiki.int.corefiling.com/cfl/CflDotIo).
