# Chat App 💬

This is a simple real-time chat app I built for the Vedaz Software Development Internship task. The idea was to keep things clean and functional — nothing fancy, just a working chat experience with real-time messaging.

## Try it out

- **Live app:** https://chat-app-two-teal-94.vercel.app/
- **Backend server:** https://chat-app-wo30.onrender.com


## What I used

- **Frontend:** React + Vite, with Socket.io-client for real-time updates
- **Backend:** Node.js, Express, and Socket.io

I went with React instead of React Native since I wanted to focus on getting the real-time messaging logic solid rather than fighting with a mobile build setup — the task mentioned this was fine if React Native wasn't familiar.

## Features

- Real-time messaging (Socket.io)
- Login with a username — no password, but usernames have to be unique while someone's active, so no two people can be "Ananya" at the same time
- Timestamps on every message
- Shows how many people are online
- "X is typing..." indicator
- Loads previous messages when you join

## Folder structure

```
vedaz-chat-app/
├── backend/
│   ├── server.js        → all the server + socket logic lives here
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx       → switches between login and chat screens
│   │   ├── Login.jsx     → the login screen
│   │   ├── Chat.jsx      → the actual chat UI
│   │   ├── socket.js     → socket connection setup
│   │   └── App.css
│   └── package.json
└── README.md
```

## Running it yourself

If you'd rather run it locally instead of using the live link:

**Backend first:**
```bash
cd backend
npm install
npm start
```
This starts the server on `http://localhost:5000`.

**Then the frontend** (in a new terminal):
```bash
cd frontend
npm install
npm run dev
```
This opens the app at `http://localhost:5173`.

Open it in two tabs, log in with different names, and you should see messages syncing in real time.

## A few honest notes

- Messages live in memory on the server, not a database — so if the server restarts, chat history resets. Kept it this way to stay within the "keep it simple" scope of the task.
- Login doesn't check passwords — any name works, as long as it's not already taken by someone currently online. That was the dummy-login + uniqueness balance I went with.
- If you're running this locally and want the frontend to talk to a different backend, just update the `SERVER_URL` in `frontend/src/socket.js`.

---
Built for the Vedaz Software Development Internship application.