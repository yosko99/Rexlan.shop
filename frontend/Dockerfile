# Pull Docker Hub base image
FROM node:lts-alpine

# Set working directory
WORKDIR /client

# Install app dependencies
COPY package*.json /client/
RUN npm install --legacy-peer-deps --silent

# Copy app to container
COPY . /client/

EXPOSE 3000