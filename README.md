# Basic Chat Application

A simple real-time chat application built as part of the Vedaz Software Development internship task.

## Tech Stack

- **Frontend:** React (Vite) + Socket.io-client
- **Backend:** Node.js + Express + Socket.io

## Features

- Real-time messaging using Socket.io
- Dummy login (enter any username to join — no password required)
- Message timestamps
- Online user count
- Typing indicator
- Chat history loaded on join (via REST endpoint)

## Project Structure

```
vedaz-chat-app/
├── backend/
│   ├── server.js        # Express + Socket.io server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx       # Root component
│   │   ├── Login.jsx     # Dummy login screen
│   │   ├── Chat.jsx      # Chat interface
│   │   ├── socket.js     # Socket.io client setup
│   │   └── App.css       # Styling
│   └── package.json
└── README.md
```

## How to Run Locally

### 1. Backend

```bash
cd backend
npm install
npm start
```

The server will start on `http://localhost:5000`.

### 2. Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app will open on `http://localhost:5173`.

### 3. Try it out

- Open the app in two different browser tabs (or two browsers).
- Log in with two different usernames.
- Send messages from either tab — they appear instantly on both, with timestamps.

## Notes

- Messages are stored in memory on the server (no database), so history resets when the server restarts. This was a deliberate choice to keep the submission simple, as requested in the task.
- Login is intentionally "dummy" — any non-empty username is accepted, per the task's optional bonus requirement.
- `frontend/src/socket.js` has a `SERVER_URL` constant — update this if you deploy the backend somewhere other than `localhost:5000`.

## Author

Submitted for the Vedaz Software Development Internship application.
