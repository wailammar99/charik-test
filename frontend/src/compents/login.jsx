import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Box, CircularProgress } from "@mui/material";
import { Alert } from "@mui/material";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/hubspot/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
       
        setError(null);
        navigate("/contacts");
      } else {
        setError(data.error || "Invalid username or password");
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ width: "100%", maxWidth: 400 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign in to your account
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="username "
            
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2 }}>
            <Button href="#" variant="text" color="primary">
              Forgot password?
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="secondary" /> : "Sign in"}
            </Button>
          </Box>
        </form>

        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <Typography variant="body2">
            Not a member?{' '}
            <Button href="#" variant="text" color="primary">
              Start a 14-day free trial
            </Button>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
