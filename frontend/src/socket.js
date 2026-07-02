import { io } from "socket.io-client";

// Change this to your deployed backend URL when hosting,
// or keep as localhost for local testing.
export const SERVER_URL = "http://localhost:5000";

export const socket = io(SERVER_URL, {
  autoConnect: false, // we connect manually after login
});
