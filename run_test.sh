#!/bin/sh

if [ -f ".env.test.local" ]; then
    export `cat .env.test.local`
fi

if [ -z "${AIDBOX_LICENSE_KEY_TESTS}" ]; then
    echo "AIDBOX_LICENSE_KEY_TESTS is required to run tests"
    exit 1
fi

if [ -z "${AIDBOX_LICENSE_ID_TESTS}" ]; then
    echo "AIDBOX_LICENSE_ID_TESTS is required to run tests"
    exit 1
fi

docker-compose -f docker-compose.tests.yaml pull
docker-compose -f docker-compose.tests.yaml up --exit-code-from dockerize dockerize || exit 1

if [ -z "$CI" ]; then
    yarn test $@ --runInBand --passWithNoTests
else
    docker-compose -f docker-compose.tests.yaml -f docker-compose.ci.yaml up --exit-code-from frontend frontend
fi
exit $?
