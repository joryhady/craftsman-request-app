# Craftsman Request App

A web application that helps users describe home-service problems in natural language and automatically identifies the appropriate craftsman category and priority.

The application can also detect multiple distinct problems in a single description and split them into separate service requests.

## Features

- Describe a home-service problem using natural language
- AI-powered problem classification using Hugging Face
- Automatic category detection:
  - Plumbing
  - Electrical
  - Carpentry
  - AC
  - Insulation
  - Flooring
  - Other
- Automatic priority detection:
  - Normal
  - Urgent
- Splits multiple problems into separate requests
- Users can manually edit the AI's category and priority
- Submit confirmed requests
- View all submitted requests
- Responsive, mobile-first interface
- API key is kept on the backend and is not exposed to the frontend

## Tech Stack

### Frontend

- React
- Vite
- React Router
- CSS

### Backend

- Node.js
- Express
- Hugging Face Inference API
- dotenv
- CORS

### Storage

Requests are currently stored in memory using a simple JavaScript array.

This was intentionally kept simple because the task did not require a persistent database.

## Architecture

The application follows a simple frontend/backend architecture:

    text
React Frontend
      |
      | HTTP API
      v
Express Backend
      |
      | Hugging Face API
      v
Hugging Face LLM