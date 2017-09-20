#!/usr/bin/env sh

if [ -z "$CI" ]; then
  echo "This script should only be run under CI."
  exit 1
fi

cd charts

for f in *.tgz
do
  /kube/helmPush $f || exit $?
done
