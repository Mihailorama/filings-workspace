#!/usr/bin/env sh

if [ -z "$CI" ]; then
  echo "This script should only be run under CI."
  exit 1
fi

cd charts

shopt -s nullglob

for f in *.tgz
do
  echo "Publishing chart '$f'"
  curl -F "file=@$f" https://helm.cfl.io || exit $?
done
