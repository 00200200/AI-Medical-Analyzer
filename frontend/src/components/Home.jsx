import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './Form';

const Home = () => {
	const [analysis, setAnalysis] = useState('');
	const [loading, setLoading] = useState(false);
	const [dots, setDots] = useState('');

	useEffect(() => {
		if (!loading) {
			setDots('');
			return;
		}
		const interval = setInterval(() => {
			setDots(prev => (prev.length < 3 ? prev + '.' : ''));
		}, 500);
		return () => clearInterval(interval);
	}, [loading]);

	const handleSubmit = async prompt => {
		setLoading(true);
		try {
			const response = await axios.post('http://localhost:8000/analyze_blood_results', {
				blood_results: prompt,
			});
			setAnalysis(response.data.analysis);
		} catch (error) {
			console.error('Error during analysis:', error);
			setAnalysis('Wystąpił błąd podczas analizy.');
		}
		setLoading(false);
	};

	return (
		<div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
			<Form onSubmit={handleSubmit} />

			{loading && (
				<div
					style={{
						marginTop: 50,
						marginBottom: 50,
						color: '#ffffff',
						fontSize: 18,
						fontWeight: 'bold',
						fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
						textAlign: 'center',
					}}>
					Analyzing{dots}
				</div>
			)}

			{analysis && !loading && (
				<div
					style={{
						marginTop: 50,
						marginBottom: 50,
						background: 'rgba(255, 255, 255, 0.5)',
						color: '#2C3E4E',
						padding: 20,
						borderRadius: 16,
						fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
						boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
						backdropFilter: 'blur(6px)',
						whiteSpace: 'pre-wrap',
						width: '100%',
						maxWidth: '1200px',
						minWidth: '600px',
					}}>
					<h3 style={{ marginTop: 0 }}>Analysis:</h3>
					<p>{analysis}</p>
				</div>
			)}
		</div>
	);
};

export default Home;
