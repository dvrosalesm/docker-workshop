# Docker Workshop

This is a fun project that I created to showcase some docker functionalities related to building images and deploying a service + frontend + mongodb server.

## Build the frontend:

1. Create a `Dockerfile` file inside the `app` folder. `touch app/Dockerfile`
2. Copy and paste the following content in the `Dockerfile`:

```
# syntax=docker/dockerfile:1
# Use node:latest as parent image
FROM node:latest
# Select the working directory
WORKDIR /src
# Copy and paste the package.json
COPY package*.json ./
# Install npm dependencies
RUN npm install
# Copy source code into the working directory
COPY . .
# Build  the project
RUN npm run build
# Expose the required ports
EXPOSE 3000
# Start the application
CMD ["npm","start"]
```

3. Run the build command `docker build -t app . ` inside the app folder.
4. That's it!

## Build the services:

1. Create a `Dockerfile` file inside the `services` folder. `touch services/Dockerfile`
2. Copy and paste the following content in the `Dockerfile`:

```
# syntax=docker/dockerfile:1
# Use node:latest as parent image
FROM node:latest
# Select the working directory
WORKDIR /src
# Copy and paste the package.json
COPY package*.json ./
# Install npm dependencies
RUN npm install
# Copy source code into the working directory
COPY . .
# Build  the project
RUN npm run build
# Expose the required ports
EXPOSE 3001
# Start the application
CMD ["npm","start"]
```

3. Run the build command `docker build -t services . ` inside the app folder.
4. That's it!

## Compose it!

1. Create a `docker-compose.yml` file in the root directory.
2. Copy and paste the following content in the `docker-compose.yml`:

```
version: "3.9"
services:
  mongo:
    image: mongo:latest
    environment:
      - MONGO_INITDB_ROOT_USERNAME=local
      - MONGO_INITDB_ROOT_PASSWORD=local
    ports:
      - 27017:27017
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongosh localhost:27017 --quiet
      interval: 10s
      timeout: 10s
      retries: 5
  frontend:
    image: app
    ports:
      - "3001:3001"
  services:
    image: services
    environment:
      - mongo_username=local
      - mongo_password=local
      - mongo_ip=mongo:27017
    ports:
      - "3000:3000"
    depends_on:
      mongo:
        condition: service_healthy
```

3. Run the up command `docker-compose up` inside the root folder. Use the `-d` flag if to run it as dettached from the terminal.
4. That's it!

The applications will be available on:

- Frontend: `http://localhost:3001`
- Services: `http://localhost:3000`
