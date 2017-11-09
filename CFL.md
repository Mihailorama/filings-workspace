CoreFiling Development
======================

We wanted to avoid committing keys or certs into Git, so to use the dev server that
fakes up the gateway & authentication, you will need to copy the `.dev` directory
from the Beacon UI project.


Registry
--------

We need to make `yarn` use the public registry, not our proxy, so the `yarn.lock`
makes sense outside out network. To temporarily use a local development build
of one of our packages, use a command like this:

```shell
yarn add @cfl/simple-platform-server --registry https://artifacts.int.corefiling.com/api/npm/cfl-npm/
```


Updating SSL certificates
-------------------------

These are in `.dev`. When these expire, they will need to be replaced by the [latest ones](https://wiki.int.corefiling.com/cfl/CflDotIo).



Note on the icon
----------------

Just in case we want to update the app logo, here is how I converted it to .ICO format using Inkscape and ImageMagick:

    inkscape -z -e app-logo.png -w 512 -h 512 app-logo.svg
    convert app-logo.png -define icon:auto-resize=64,48,32,16 app-logo.ico
