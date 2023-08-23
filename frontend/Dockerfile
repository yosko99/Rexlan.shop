# Pull Docker Hub base image
FROM node:lts

# Set working directory
WORKDIR /client

# Copy needed files
COPY package*.json /client/
COPY . /client/

# Fix version conflict errors
RUN echo "SKIP_PREFLIGHT_CHECK=true" >> .env

# Install app dependencies
RUN npm install --legacy-peer-deps --silent
RUN npm install --location=global --save serve

# Build the app
RUN npm run build

# Copy app to container
COPY . /client/

# Expose the app
EXPOSE 3000