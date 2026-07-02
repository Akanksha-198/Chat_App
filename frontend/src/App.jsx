import { useState } from "react";
import Login from "./Login";
import Chat from "./Chat";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (username, token) => {
    setUser({ username, token });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return user ? (
    <Chat username={user.username} onLogout={handleLogout} />
  ) : (
    <Login onLogin={handleLogin} />
  );
}

export default App;
