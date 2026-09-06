# ☕ Coffee Dashboard

A small full-stack learning project built to practice Docker, Docker Compose, Node.js, Express and MongoDB.

The main goal of this project is to understand how containers, networking, environment variables, an application and a database work together.

## Current architecture

Browser
↓ HTTP
Node.js + Express
↓
MongoDB

The application and MongoDB run as separate Docker containers and are connected through Docker Compose.

## Current features

- Node.js application running in Docker
- Express API
- MongoDB database running in Docker
- Docker Compose for managing the services
- Environment variables for MongoDB credentials
- `GET /api/coffees` — fetch coffees from MongoDB
- `POST /api/coffees` — add a coffee to MongoDB

## Tech stack

- Node.js
- Express
- MongoDB
- Docker
- Docker Compose

## Running locally

Create a `.env` file in the project root:

```env
MONGO_USERNAME=admin
MONGO_PASSWORD=your-password
```

Then start the application:

```bash
docker compose up --build
```

The API is available at:

`http://localhost:3000`

Coffee endpoint:

`http://localhost:3000/api/coffees`

## Project status

🚧 Work in progress.

This project is primarily a hands-on learning project. The goal is to gradually build a working application while learning Docker and backend infrastructure concepts along the way.

### Planned

- [ ] Complete CRUD API
- [ ] Improve error handling and validation
- [ ] Add a simple frontend
- [ ] Improve Docker setup
- [ ] Add health checks
- [ ] Explore Kubernetes deployment