import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatAnalysis } from './formatAnalysis';
import Form from './Form';
import { FaHome, FaArrowLeft } from 'react-icons/fa';

const Home = ({ navigateTo }) => {
	const [analysis, setAnalysis] = useState('');
	const [loading, setLoading] = useState(false);
	const [dots, setDots] = useState('');

	useEffect(() => {
		if (loading) {
			const interval = setInterval(() => {
				setDots(prev => (prev.length < 3 ? prev + '.' : ''));
			}, 500);
			return () => clearInterval(interval);
		} else {
			setDots('');
		}
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
			setAnalysis('An error occurred during analysis.');
		}
		setLoading(false);
	};

	return (
		<div className='max-w-4xl mx-auto p-4 pt-20'>
			{/* Back Button */}
			<div className='mb-8'>
				<button
					onClick={() => navigateTo('landing')}
					className='inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl text-white px-4 py-2 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105'>
					<FaArrowLeft className='text-sm' />
					<span>Back to home</span>
				</button>
			</div>

			<Form onSubmit={handleSubmit} loading={loading} />

			{loading && (
				<div className='mt-12 mb-12 text-white text-xl font-bold text-center'>
					<div className='inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-primary-500/20 px-6 py-3 rounded-2xl border border-purple-500/30'>
						<div className='w-2 h-2 bg-purple-400 rounded-full animate-bounce'></div>
						<div
							className='w-2 h-2 bg-primary-400 rounded-full animate-bounce'
							style={{ animationDelay: '0.1s' }}></div>
						<div className='w-2 h-2 bg-purple-400 rounded-full animate-bounce' style={{ animationDelay: '0.2s' }}></div>
						<span className='ml-2'>Analyzing{dots}</span>
					</div>
				</div>
			)}

			{analysis && !loading && (
				<div className='mt-12 mb-12 bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl text-white p-8 rounded-3xl shadow-2xl border border-purple-500/20 whitespace-pre-wrap w-full max-w-5xl min-w-96 relative overflow-hidden'>
					<div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-primary-500 to-purple-500'></div>
					<h3 className='mt-0 mb-6 text-2xl font-bold bg-gradient-to-r from-purple-300 to-primary-300 bg-clip-text text-transparent'>
						Analysis:
					</h3>
					<div className='text-gray-100 leading-relaxed text-lg'>{formatAnalysis(analysis)}</div>
				</div>
			)}
		</div>
	);
};

export default Home;
