# Web UI Starter Kit

## Stack
- [Typescript](https://github.com/Microsoft/TypeScript)
- [React](https://github.com/facebook/react)
- [Webpack](https://github.com/webpack/webpack)

---
# Clone Me
- Clone the project
- Replace **all** occurrences of `njlgad` to change the group name.  For example:
  ```
  OLD=njlgad
  NEW=$NAME
  grep -rl --exclude-dir .git -e "$OLD" . | xargs sed -i "s/$OLD/$NEW/g"
  ```
- Replace **all** occurrences of `web-ui-starter-kit` to change the project name.  For example:
  ```
  OLD=web-ui-starter-kit
  NEW=my-project
  grep -rl --exclude-dir .git -e "$OLD" . | xargs sed -i "s/$OLD/$NEW/g"
  ```
- Push new project to https://gitlab.int.corefiling.com using the group name and the project name specified above.
- Configure your `kube-auth` secret
    - Follow instructions [here](https://wiki.int.corefiling.com/pdds/KubeAuth) to install and run `kube-auth` locally
    - Once logged in, run `kube-auth token` to print your offline token
    - Go to Settings > CI/CD Pipelines on your GitLab project
    - Scroll down to Secret Variables and add a secret variable with name `KUBE_AUTH_TOKEN` and value of the offline token you just printed

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
npm pack # Produces cfl-web-ui-starter-kit-$VERSION.tgz
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
npm config set @cfl/web-ui-starter-kit:devserver-host `hostname`.cfl.io # You must have a working DNS entry for "`hostname`.cfl.io".
npm start
open https://`hostname`.cfl.io:9091/
```

### SSL
The dev server uses HTTPS, with certificates checked in to `.dev/`. When these expire, they will need to be replaced by the [latest ones](https://wiki.int.corefiling.com/cfl/CflDotIo).
