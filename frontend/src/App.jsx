import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import ImageAnalyzer from './components/ImageAnalyzer';

function App() {
	const [activeScreen, setActiveScreen] = useState('landing');

	const navigateTo = screen => {
		setActiveScreen(screen);
	};

	return (
		<BrowserRouter>
			<Header navigateTo={navigateTo} activeScreen={activeScreen} />
			{activeScreen === 'landing' && <LandingPage navigateTo={navigateTo} />}
			{activeScreen === 'blood' && <Home navigateTo={navigateTo} />}
			{activeScreen === 'image' && <ImageAnalyzer navigateTo={navigateTo} />}
		</BrowserRouter>
	);
}

export default App;
