# Pull Docker Hub base image
FROM node:lts-alpine

# Set working directory
WORKDIR /usr/app

COPY . .
COPY package*.json ./

RUN npm install --silent
RUN npm run build
RUN npm run seed:refresh

# Copy app to container
COPY . .

EXPOSE 5000