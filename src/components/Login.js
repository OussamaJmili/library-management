// src/components/Login.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Alert, Box } from '@mui/material';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <TextField 
        label="Email" 
        type="email"
        fullWidth 
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required 
      />
      <TextField 
        label="Password" 
        type="password"
        fullWidth 
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required 
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Login
      </Button>
    </Box>
  );
}

export default Login;
