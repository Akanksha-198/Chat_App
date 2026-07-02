import { io } from "socket.io-client";

export const SERVER_URL = "https://chat-app-wo30.onrender.com";

export const socket = io(SERVER_URL, {
  autoConnect: false,
});
