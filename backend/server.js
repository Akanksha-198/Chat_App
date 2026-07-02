

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // for demo purposes; restrict in production
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 5000;

// ---------- In-memory "database" ----------
let messages = []; // { id, sender, text, timestamp }
let onlineUsers = {}; // socketId -> username
let takenUsernames = new Set(); // lowercase usernames currently in use
// ---------- REST API ----------

// Health check
app.get("/", (req, res) => {
  res.send("Chat server is running.");
});

// Dummy login: accepts any non-empty username, returns a fake token
app.post("/login", (req, res) => {
  const { username } = req.body;
  if (!username || !username.trim()) {
    return res.status(400).json({ error: "Username is required." });
  }
  const cleanUsername = username.trim();
  const key = cleanUsername.toLowerCase();

  if (takenUsernames.has(key)) {
    return res.status(409).json({ error: "This username is already taken. Please choose another one." });
  }
  takenUsernames.add(key);

  const fakeToken = Buffer.from(`${cleanUsername}-${Date.now()}`).toString("base64");
  res.json({ success: true, user: { username: cleanUsername }, token: fakeToken });
});

// Fetch chat history (used when the frontend first loads)
app.get("/messages", (req, res) => {
  res.json(messages);
});

// ---------- Socket.io real-time logic ----------
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Client sends their username right after connecting
  socket.on("join", (username) => {
    onlineUsers[socket.id] = username;
    io.emit("onlineUsers", Object.values(onlineUsers));
    console.log(`${username} joined the chat.`);
  });

  // Handle incoming messages
  socket.on("sendMessage", (data) => {
    const message = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      sender: data.sender,
      text: data.text,
      timestamp: new Date().toISOString(),
    };

    messages.push(message);

    // Broadcast to all connected clients (including sender)
    io.emit("receiveMessage", message);
  });

  // Typing indicator (nice-to-have, keeps things simple)
  socket.on("typing", (username) => {
    socket.broadcast.emit("userTyping", username);
  });

  socket.on("stopTyping", () => {
    socket.broadcast.emit("userStoppedTyping");
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    const username = onlineUsers[socket.id];
    delete onlineUsers[socket.id];
if (username) takenUsernames.delete(username.toLowerCase());    
    io.emit("onlineUsers", Object.values(onlineUsers));
    console.log(`User disconnected: ${username || socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Chat server listening on port ${PORT}`);
});
