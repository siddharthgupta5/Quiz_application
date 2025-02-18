
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Container, TextField, Button, Typography, Paper, Alert } from "@mui/material";

// const Login = () => {
//     const [credentials, setCredentials] = useState({ username: "", password: "" });
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setCredentials({ ...credentials, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");

//         try {
//             const response = await axios.post("http://localhost:8000/api/login/", credentials, {
//                 headers: { "Content-Type": "application/json" },
//             });

//             if (response.status === 200) {
//                 const { token, user } = response.data;
//                 localStorage.setItem("token", token);
//                 localStorage.setItem("user", JSON.stringify(user));
//                 navigate("/dashboard");
//             }
//         } catch (err) {
//             setError("Invalid username or password. Please try again.");
//         }
//     };

//     return (
//         <Container maxWidth="sm">
//             <Paper elevation={3} sx={{ padding: 3, marginTop: 5, textAlign: "center" }}>
//                 <Typography variant="h5">Login</Typography>
//                 {error && <Alert severity="error">{error}</Alert>}

//                 <form onSubmit={handleSubmit}>
//                     <TextField
//                         fullWidth
//                         label="Username"
//                         name="username"
//                         value={credentials.username}
//                         onChange={handleChange}
//                         margin="normal"
//                     />
//                     <TextField
//                         fullWidth
//                         label="Password"
//                         type="password"
//                         name="password"
//                         value={credentials.password}
//                         onChange={handleChange}
//                         margin="normal"
//                     />
//                     <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
//                         Login
//                     </Button>
//                 </form>

//                 <Typography variant="body2" sx={{ marginTop: 2 }}>
//                     Don't have an account? <Button component="a" href="/register">Register here</Button>
//                 </Typography>
//             </Paper>
//         </Container>
//     );
// };

// export default Login;

import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login } from "../api/auth";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await login(username, password);
      localStorage.setItem("token", data.access);
      localStorage.setItem("username", username);  // Store username
      setUser({ token: data.access });
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5, textAlign: "center" }}>
        <Typography variant="h5">Login</Typography>
        <TextField fullWidth label="Username" margin="normal" onChange={(e) => setUsername(e.target.value)} />
        <TextField fullWidth label="Password" type="password" margin="normal" onChange={(e) => setPassword(e.target.value)} />
        <Button fullWidth variant="contained" color="primary" onClick={handleLogin}>Login</Button>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Don't have an account? <Link to="/register">Register here</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
