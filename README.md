# ☕ Coffee Dashboard

A small learning project built to practice Docker, Docker Compose, Node.js, Express and MongoDB.

The main goal is to understand how an application, containers, networking, environment variables and a database work together.

## Architecture

```text
Browser
   ↓ HTTP
Node.js + Express
   ↓
MongoDB
```

The application and MongoDB run as separate Docker containers and are managed with Docker Compose.

## Current features

- Node.js application running in Docker
- Express API
- MongoDB running in a separate Docker container
- Docker Compose for managing the application and database
- Docker networking between services
- Environment variables for MongoDB credentials
- MongoDB database with coffee documents
- `GET /api/coffees` — fetch coffees from MongoDB
- `POST /api/coffees` — add a coffee to MongoDB
- `PUT /api/coffees/:id` — update a coffee
- `DELETE /api/coffees/:id` — delete a coffee

The API currently supports the basic CRUD operations:

- **Create** → `POST`
- **Read** → `GET`
- **Update** → `PUT`
- **Delete** → `DELETE`

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

Then start the application with:

```bash
docker compose up --build
```

The application is available at:

`http://localhost:3000`

Coffee API:

`http://localhost:3000/api/coffees`

## Project status

🚧 Work in progress.

This is primarily a hands-on learning project. The application is being built step by step while learning Docker and backend infrastructure concepts.

The project will eventually be used to explore Kubernetes concepts as well.

## Planned

- [ ] Improve API validation and error handling
- [ ] Add a simple frontend
- [ ] Improve the Docker setup
- [ ] Add health checks
- [ ] Explore Kubernetes deployment