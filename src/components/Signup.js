// src/components/Signup.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Alert, Box } from '@mui/material';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSignup} sx={{ mt: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Sign Up
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
        Sign Up
      </Button>
    </Box>
  );
}

export default Signup;
