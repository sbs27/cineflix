import React, { useState } from "react";
import { TextField, Button, FormControlLabel, Checkbox, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMovieContext } from "../../context/movie-context"; // Import MovieContext

// Simulate a login API or local validation
const loginUser = async (email: string, password: string) => {
  // This is a mock login function. Replace this with actual API logic.
  if (email === "test@example.com" && password === "password") {
    return { email, token: "mockToken123" }; // Example of a user object returned after successful login
  }
  throw new Error("Invalid credentials");
};

const Login = () => {
  const [email, setEmail] = useState(""); // Store email input
  const [password, setPassword] = useState(""); // Store password input
  const [rememberMe, setRememberMe] = useState(false); // Store "remember me" state
  const [error, setError] = useState<string>(""); // Error state for invalid credentials
  const navigate = useNavigate(); // Navigate hook for redirection
  const { dispatch } = useMovieContext(); // Access dispatch function from context

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error on new attempt

    try {
      // Call the login function (replace with your actual API call)
      const user = await loginUser(email, password);

      // Dispatch action to set the user in context
      dispatch({ type: "SET_USER", user });

      // Redirect to home page after successful login
      navigate("/home");
    } catch (err) {
      // Show error if login fails
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
      <Typography variant="h5" component="h1" align="center" marginBottom={2}>
        Sign In
      </Typography>

      <TextField
        label="Email Address"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
        }
        label="Remember me"
      />
      {error && (
        <Typography color="error" variant="body2" align="center" marginTop={2}>
          {error}
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ marginTop: 2 }}
      >
        Sign In
      </Button>
    </form>
  );
};

export default Login;


