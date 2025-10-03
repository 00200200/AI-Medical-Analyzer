import React, { useState } from 'react';
import axios from 'axios';
import Form from './Form';

const Home = () => {
	const [analysis, setAnalysis] = useState('');
	const [loading, setLoading] = useState(false);

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
		<div style={{ maxWidth: 800, margin: '32px auto', padding: 16 }}>
			<h1>🏥 Blood Test Analyzer</h1>

			<Form onSubmit={handleSubmit} />

			{loading && <div>Analyzing...</div>}

			{analysis && (
				<div style={{ marginTop: 24, background: '#f7f7f7', padding: 12 }}>
					<h3>Analysis:</h3>
					<p style={{ whiteSpace: 'pre-wrap' }}>{analysis}</p>
				</div>
			)}
		</div>
	);
};

export default Home;
