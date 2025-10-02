import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
	const [bloodResults, setBloodResults] = useState('');
	const [analysis, setAnalysis] = useState('');
	const [loading, setLoading] = useState(false);

	const apiBaseUrl = 'http://localhost:8000';

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await axios.post(`${apiBaseUrl}/analyze`, {
				blood_results: bloodResults,
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
			<h1>Analizator Wyników Krwi</h1>
			<form onSubmit={handleSubmit}>
				<textarea
					style={{ width: '100%', height: 180, padding: 8 }}
					placeholder='Wprowadź wyniki badań krwi'
					value={bloodResults}
					onChange={e => setBloodResults(e.target.value)}
				/>
				<div style={{ marginTop: 12 }}>
					<button type='submit' disabled={loading}>
						{loading ? 'Analizowanie...' : 'Analizuj'}
					</button>
				</div>
			</form>

			{analysis && (
				<div style={{ marginTop: 24, background: '#f7f7f7', padding: 12 }}>
					<h3>Wynik analizy:</h3>
					<p>{analysis}</p>
				</div>
			)}
		</div>
	);
};

export default Home;
