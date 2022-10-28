#!/bin/bash  
docker pull mongo

docker run -d \
  --name local-mongo \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=local \
  -e MONGO_INITDB_ROOT_PASSWORD=local mongo