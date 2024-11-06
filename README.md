# Client-Server App

This repository contains a client-server application with a React frontend and Express.js backend, configured to run with Docker.

## Structure
  - client-app: React frontend application
  - server-app: Express backend server
  - db: Database configuration
  - docker-compose.yaml: Docker Compose configuration for the entire app

## Prerequisites
  - Docker and Docker Compose installed

## Installation and Setup

**Start the Docker containers:**:
  docker-compose up --build

**Access the application**:
  Frontend: http://localhost:3030
  Backend: http://localhost:5050

## Stopping the Application
  docker-compose down

## To run app without docker
  ### Running the Server
  - Navigate to the server-app directory
  - npm install
  - npm run dev

  ### Running the Client
  - Navigate to the client-app directory
  - npm install
  - npm start
