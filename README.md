# Jangle

### Chat Application

Original idea and initial code comes from a [team project](https://github.com/jangle401/jangle-front) I worked on for my final project at a coding bootcamp.

This is my progression of the application so I can learn new technologies and implement new features.

## Installation

Steps to follow to setup the application on your local machine.

Requires the following dependencies:

- Node.js >= 16
- Yarn

### Local Setup

#### Docker Compose

The following commands will start both the frontend and backend services.

1. Using the [.env.sample](.env.sample) as a reference, set the required variables for the environment. Create a `.env` file with those values.
2. `docker compose build`
3. `docker compose up`

Default ports:

- Frontend: 3000
- Backend: 5000
