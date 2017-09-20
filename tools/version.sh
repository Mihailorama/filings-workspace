#!/usr/bin/env sh

VERSION=`cat build.version`
echo "Setting version to $VERSION"

cd charts
find . -name 'Chart.yaml' | xargs sed -i -e "s/version: .*/$VERSION/g"
