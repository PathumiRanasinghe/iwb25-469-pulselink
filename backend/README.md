# PulseLink Backend

This is the backend service for the PulseLink application, built using Ballerina. It provides API endpoints for user authentication, organ matching, and other core functionality.

## Prerequisites

- [Ballerina 2201.12.7](https://ballerina.io/downloads/) or higher
- MongoDB Atlas account (or local MongoDB instance)

## Getting Started

### 1. Configure the Database Connection

Create a `Config.toml` file in the root directory with your MongoDB connection string

> ⚠️ Important: Never commit your Config.toml file to version control. It's already added to .gitignore.

### 2. Run the Service

```bash
bal run
```

This will start the server on port 9090.

## API Endpoints (Just prototypes)

Health Check

- GET /health - Check if the service is running

User Management

- GET /users - Get all users (admin only)
- POST /register - Register a new user
- POST /login - Authenticate a user

## Development Guide

Project Structure

`service.bal` - Main service implementation

## License

Copyright © 2025 PulseLink