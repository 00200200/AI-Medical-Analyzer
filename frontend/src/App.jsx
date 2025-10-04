import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import ImageAnalyzer from './components/ImageAnalyzer';
import Footer from './components/Footer';

function App() {
	const [activeScreen, setActiveScreen] = useState('landing');

	const navigateTo = screen => {
		setActiveScreen(screen);
	};

	return (
		<BrowserRouter>
			<div className='min-h-screen flex flex-col'>
				<Header navigateTo={navigateTo} activeScreen={activeScreen} />
				<main className='flex-1'>
					{activeScreen === 'landing' && <LandingPage navigateTo={navigateTo} />}
					{activeScreen === 'blood' && <Home navigateTo={navigateTo} />}
					{activeScreen === 'image' && <ImageAnalyzer navigateTo={navigateTo} />}
				</main>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
