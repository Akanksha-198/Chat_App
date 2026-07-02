import { useEffect, useRef, useState } from "react";
import { socket, SERVER_URL } from "./socket";

function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function Chat({ username, onLogout }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUser, setTypingUser] = useState(null);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    fetch(`${SERVER_URL}/messages`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch(() => {});

    socket.connect();
    socket.emit("join", username);

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    socket.on("userTyping", (name) => {
      setTypingUser(name);
    });

    socket.on("userStoppedTyping", () => {
      setTypingUser(null);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("onlineUsers");
      socket.off("userTyping");
      socket.off("userStoppedTyping");
      socket.disconnect();
    };
  }, [username]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    socket.emit("sendMessage", { sender: username, text: text.trim() });
    socket.emit("stopTyping");
    setText("");
  };

  const handleTyping = (e) => {
    setText(e.target.value);
    socket.emit("typing", username);

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stopTyping");
    }, 1000);
  };

  return (
    <div className="chat-screen">
      <header className="chat-header">
        <div>
          <h2>Chat App</h2>
          <span className="online-count">{onlineUsers.length} online</span>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </header>

      <main className="messages-container">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message-bubble ${
              msg.sender === username ? "own-message" : "other-message"
            }`}
          >
            {msg.sender !== username && (
              <span className="sender-name">{msg.sender}</span>
            )}
            <p className="message-text">{msg.text}</p>
            <span className="timestamp">{formatTime(msg.timestamp)}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      {typingUser && (
        <div className="typing-indicator">{typingUser} is typing...</div>
      )}

      <form className="message-input-bar" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={handleTyping}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
