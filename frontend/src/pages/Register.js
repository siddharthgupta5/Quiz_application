import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/auth";
import { Container, TextField, Button, Typography, Paper, FormControlLabel, Checkbox } from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "", is_admin: false });
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register(formData);
      alert("Registration successful!");
      navigate("/");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5, textAlign: "center" }}>
        <Typography variant="h5">Register</Typography>
        <TextField fullWidth label="Username" margin="normal" onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
        <TextField fullWidth label="Email" margin="normal" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <TextField fullWidth label="Password" type="password" margin="normal" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <FormControlLabel control={<Checkbox onChange={(e) => setFormData({ ...formData, is_admin: e.target.checked })} />} label="Register as Admin" />
        <Button fullWidth variant="contained" color="primary" onClick={handleRegister}>Register</Button>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Already have an account? <Link to="/">Login here</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
