#!/usr/bin/env sh

if [ -z "$CI" ]; then
  VERSION='0.0.0-local'
elif [ "$CI_COMMIT_REF_NAME" == 'develop' ]; then
  VERSION="0.0.$CI_PIPELINE_ID"
else
  VERSION="0.0.0-ci.$CI_PIPELINE_ID"
fi

echo "Setting version to $VERSION"
echo "$VERSION" > build.version

find . -name 'Chart.yaml' -or -name 'requirements.yaml' | xargs sed -i -e "s/0.0.0-local/$VERSION/g"
