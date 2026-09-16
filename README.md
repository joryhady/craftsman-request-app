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

## How to Run Locally
### Requirements

Make sure you have installed:

Node.js
npm
A Hugging Face account/API token

1. Clone the repository:
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd craftsman-request-app
2. Install backend dependencies:
cd server
npm install
3. Configure environment variables:

Create:

server/.env

Add:

HF_API_KEY=your_hugging_face_token
PORT=5000

Do not commit .env to GitHub.

4. Start the backend

From the server directory:

npm run dev

The backend will run on:

http://localhost:5000

5. Install frontend dependencies:

Open another terminal:

cd client
npm install

6. Start the frontend:
npm run dev

The frontend will normally be available at:

http://localhost:5173

## How It Works
1. User describes a problem

For example:

My kitchen sink is leaking and the bedroom light keeps flickering.

2. Backend sends the description to Hugging Face

The backend asks the AI to identify:

The service category
The priority
Whether multiple separate problems are present

3. AI returns structured requests

The example above can become:
{
  "requests": [
    {
      "description": "Kitchen sink is leaking",
      "category": "plumbing",
      "priority": "normal"
    },
    {
      "description": "Bedroom light keeps flickering",
      "category": "electrical",
      "priority": "normal"
    }
  ]
}

4. User reviews the suggestions

The user can manually change the category or priority before confirming.

This is important because AI suggestions should not be treated as final without allowing user correction.

5. Requests are saved

After confirmation, the frontend sends the final requests to the Express backend.

The backend stores them in memory.

6. Requests can be viewed
The Requests page retrieves the saved requests from the backend and displays:
- Problem description
- Category
- Priority
- Submission date

## Technical Decisions
### React + Vite

I chose React with Vite because it provides a lightweight setup suitable for a small web application and allows the UI to be developed quickly with reusable components.

### Node.js + Express

I used Express for the backend because the application only needs a small REST API.

The backend is responsible for:

- AI communication
- Request validation
- Saving requests
- Returning requests to the frontend

### Hugging Face

I chose Hugging Face as the LLM provider because it provides access to open and hosted models and satisfied the requirement for an AI-powered solution without exposing an API key in the frontend.

The Hugging Face integration is implemented server-side using @huggingface/inference.

### In-memory storage

I used an in-memory JavaScript array instead of introducing a database.

For this assignment, persistent storage was not required, and keeping the storage layer simple allowed more time to be spent on the core AI workflow and user experience.

### AI-generated structured output

The AI is instructed to return a predictable JSON structure containing a requests array.

This makes it possible for the frontend to support multiple problems without needing to interpret free-form AI text.

### Manual editing

AI classification is presented as a suggestion rather than an irreversible decision.

The user can modify both category and priority before submitting the request.

### What Is Missing / What I Would Improve!

Given more development time, I would improve the following:

#### Persistent database

The current requests are stored in memory, so they disappear when the backend restarts.

I would replace this with SQLite, PostgreSQL, or another persistent database.

#### Stronger AI response validation

I would add schema validation for the AI response before returning it to the frontend.

For example, the backend could validate that:

- requests is an array
- Every request has a description
- Category is one of the allowed categories
- Priority is either normal or urgent

#### Better error handling

I would add more detailed handling for:
- Hugging Face API failures
- Rate limits
- Invalid AI responses
- Network failures
- Empty user input

#### Authentication

For a production application, users would need authentication so requests belong to the correct user.

#### Better UI

Given more time, I would improve:

- Loading states
- Empty states
- Error messages
- Accessibility
- Visual hierarchy
- Mobile interactions

#### Environment-based API configuration

The frontend currently uses the local backend URL directly.

For deployment, I would move the API URL into an environment variable so development and production environments can use different backend URLs.

#### Automated tests

I would add tests for:
- AI response parsing
- Multiple-problem splitting
- Request validation
- API endpoints
- Frontend request submission

The application is intentionally focused on the core workflow only!
By: Jory Hady Alharbi