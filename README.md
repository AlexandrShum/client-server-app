## command to create docker image 
  docker build -t server-api .

## command to start docker container
  docker run --name test-api-container -p 5005:5000 server-api

## remove conainer
  docker rm [container-name]

## remove image
  docker rmi [image-name]