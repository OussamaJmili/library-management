// src/components/AuthPage.js
import React, { useState } from 'react';
import { Container, Paper, Tabs, Tab, Box } from '@mui/material';
import Signup from './Signup';
import Login from './Login';

function AuthPage() {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Tabs value={tab} onChange={handleChange} centered>
          <Tab label="Sign Up" />
          <Tab label="Login" />
        </Tabs>
        <Box sx={{ mt: 4 }}>
          {tab === 0 && <Signup />}
          {tab === 1 && <Login />}
        </Box>
      </Paper>
    </Container>
  );
}

export default AuthPage;
