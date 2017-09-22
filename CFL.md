CoreFiling Development
======================

We wanted to avoid committing keys or certs into Git, so to use the dev server that
fakes up the gateway & authentication, you will need to copy the `.dev` directory
from the Beacon UI project.


Updating SSL certificates
-------------------------

These are in `.dev`. When these expire, they will need to be replaced by the [latest ones](https://wiki.int.corefiling.com/cfl/CflDotIo).


Note on the icon
----------------

Just in case we want to update the app logo, here is how I converted it to .ICO format using Inkscape and ImageMagick:

    inkscape -z -e app-logo.png -w 512 -h 512 app-logo.svg
    convert app-logo.png -define icon:auto-resize=64,48,32,16 app-logo.ico
