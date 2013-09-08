#!/bin/bash

set -e

# This script requires your pom.xml to include the following private env variables:
# SAUCE_USERNAME
# SAUCE_ACCESS_KEY
# SAUCE_TUNNEL_ID (typically would be the build.number)

CONNECT_URL="http://saucelabs.com/downloads/Sauce-Connect-latest.zip"
CONNECT_DIR=".sauce-connect"
CONNECT_DOWNLOAD="Sauce_Connect.zip"
CONNECT_LOG="log"

mkdir -p $CONNECT_DIR
cd $CONNECT_DIR

echo "Downloading Sauce Connect..."
curl $CONNECT_URL > $CONNECT_DOWNLOAD 2> /dev/null
unzip -o $CONNECT_DOWNLOAD
rm $CONNECT_DOWNLOAD


echo "Starting Sauce Connect in the background (tunnel $BUILD_NUMBER)"
echo "Logging into $CONNECT_LOG"
$JAVA_HOME/bin/java -jar Sauce-Connect.jar --readyfile ./sauce-connect-ready \
    --tunnel-identifier $BUILD_NUMBER \
    $SAUCE_USERNAME $SAUCE_ACCESS_KEY > $CONNECT_LOG &
