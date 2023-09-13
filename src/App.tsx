import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Stack } from '@mui/material';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Stack>
          <HomePage />
        </Stack>
      </header>
    </div>
  );
}

export default App;
