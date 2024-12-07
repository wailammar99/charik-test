import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Correct hook for navigation
import "./Login.css"; // Import the external CSS file for styling

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state for better UX
  const navigate = useNavigate(); // Initialize navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      const response = await fetch("http://localhost:8000/hubspot/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Optional: Show a success message
        setError(null); // Clear any previous error
         // Call onLogin if provided (marks the user as authenticated)
        navigate("/contacts"); // Navigate to the dashboard
      } else {
        setError(data.error || "Invalid username or password");
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input-field"
            disabled={isLoading} // Disable input when loading
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
            disabled={isLoading} // Disable input when loading
          />
        </div>
        <button
          type="submit"
          className="login-button"
          disabled={isLoading} // Disable button when loading
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
