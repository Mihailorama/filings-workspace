#!/usr/bin/env sh

# User specified as parameter or assume project name
CHART=${1:-$CI_PROJECT_NAME}
if [ -z "$CHART" ]; then
  echo "Couldn't find chart to publish"
  exit 1
fi

VERSION=`cat build.version`
if [ -z "$VERSION" ]; then
  echo "Missing 'build.version' file"
  exit 1
fi

echo "Setting chart $CHART to version $VERSION"
cd charts || exit $?
find . -name 'Chart.yaml' | xargs sed -i -e "s/version: .*/version: $VERSION/g"

echo 'Removing existing chart builds'
rm *.tgz
echo

/kube/helmPush $CHART || exit $?
