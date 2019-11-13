#!/bin/bash

export $(egrep -v '^#' .env | xargs)
echo "STARTING MONGODB"
echo "USING MONGO CONFIG ${MONGO_CONFIG_PATH}"
mongod --config $MONGO_CONFIG_PATH


