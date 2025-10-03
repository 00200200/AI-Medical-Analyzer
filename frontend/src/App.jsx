import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import ImageAnalyzer from './components/ImageAnalyzer';

function App() {
  const [activeScreen, setActiveScreen] = useState('blood');

  const navigateTo = screen => {
    setActiveScreen(screen);
  };

  return (
    <BrowserRouter>
      <Header navigateTo={navigateTo} activeScreen={activeScreen} />
      {activeScreen === 'blood' && <Home />}
      {activeScreen === 'image' && <ImageAnalyzer />}
    </BrowserRouter>
  );
}

export default App;
