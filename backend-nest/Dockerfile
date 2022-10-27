# Pull Docker Hub base image
FROM node:lts-alpine

# Set working directory
WORKDIR /usr/app

COPY . .

# Install app dependencies
COPY package*.json ./
RUN npm install --silent
RUN npm run build

# Copy app to container
COPY . .

EXPOSE 5000