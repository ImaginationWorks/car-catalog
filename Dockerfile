##############################################################################
#
# Overview:
#   This Dockerfile was drafted in a way to make sure that we do not change
#   The node.JS code that would be moved out of apigee
#   As we go after the migration, the file would change as we mature
#
##############################################################################

# 1. Define from what image we want to build from. Here we will use alpine 3.7
# which is the latest at the time of drafting this file

FROM alpine:3.7

# 2. Install app dependencies

RUN apk upgrade --update
RUN apk add --update bash curl sed nodejs

# 3. Create app directory to hold application code inside the image
#    This will be the working directory for your application

WORKDIR /opt/

# 4. copy files from input artifact (AWS Pipeline)
#    .env would be executed as a parameter to --env-file
#    while running docker image
#    Copy the files into directories

COPY ./ /opt/

# 5. Bind node.js app to port 8080 and IP 0.0.0.0
#    If PORT is set as environment vraiable it would be set as the port
#    to be used by the node.JS app
#    IP is the same and it has to be set to 0.0.0.0 so that it can listen on
#    all IP addresses. If left empty, it would be set to localhost and if set
#    to local host, you won't be able to connect to the container app port as
#    the app is listening only on it's localhost IP address
#    The below environment variables can be set in .env file but it was included
#    here for clarity

ENV PORT=8080
ENV IP=0.0.0.0

EXPOSE 8080

# 6. define the command to run the app
#    We don't need forever as the containers when deployed on ECS
#    ECS would monitor its status and restart as necessary


CMD npm run serve
