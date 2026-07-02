import { useState } from "react";
import { SERVER_URL } from "./socket";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter a username.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${SERVER_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();

      if (data.success) {
        onLogin(data.user.username, data.token);
      } else {
        setError(data.error || "Login failed.");
      }
    } catch (err) {
      setError("Could not reach the server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <h1>Chat App</h1>
        <p className="subtitle">Enter a username to join the chat</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          {error && <p className="error-text">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Joining..." : "Join Chat"}
          </button>
        </form>
      </div>
    </div>
  );
}
