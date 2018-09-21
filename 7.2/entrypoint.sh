#!/bin/bash

if [ $DEPLOYER_VERSION != "latest" ]; then

  url="https://deployer.org/releases/v$DEPLOYER_VERSION/deployer.phar"

else

  url="https://deployer.org/deployer.phar"

fi

status=$(curl -LO -s -w %{http_code} $url)

if [ $status == 200 ]; then

  mv deployer.phar /usr/local/bin/dep

  chmod +x /usr/local/bin/dep

else

  rm deployer.phar
  echo "You specify an unavailable version of Deployer. Please look at https://deployer.org/download to choose a correct version."
  exit

fi

exec "$@"
