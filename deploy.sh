#!/bin/bash

# pull new repo from git
git pull

# find the existing docker CONTAINER ID (IMAGE is astromage)
CONTAINER_ID=`docker ps | awk '/astromage/ {print $1}'`

# build and start the new one
docker build --tag astromage .
docker stop $CONTAINER_ID
docker run --detach --publish 3000:3000 --restart=always astromage
docker rm $CONTAINER_ID
docker images prune

echo "Astromage is deployed"