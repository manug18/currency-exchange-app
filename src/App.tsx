import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Stack } from '@mui/material';
import { HomePage } from './pages/HomePage';
import Landing from '../src/assets/Landing.json';
import DisplayLottie from './components/DisplayLottie';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 5000);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Stack>
          {showAnimation && <DisplayLottie animationData={Landing} />}
          {!showAnimation && <HomePage />}
        </Stack>
      </header>
    </div>
  );
}

export default App;
