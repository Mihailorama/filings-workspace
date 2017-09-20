#!/usr/bin/env sh

build () {
  echo "Building chart '$1'..."
  if [ -f "$1/requirements.lock" ]; then
    helm dependency up "$1" || exit $?
  elif [ -f "$1/requirements.yaml" ]; then
    echo "No requirements.lock file for chart '$1'. Run `helm dependency build` and commit `requirements.lock` before continuing."
    exit 1
  fi
  helm package "$1" || exit $?
  echo
}

tools/version.sh || exit $?
echo

cd charts || exit $?

echo 'Removing existing chart builds'
rm *.tgz
echo

build passfail-validator
