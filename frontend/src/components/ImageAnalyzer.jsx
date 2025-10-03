import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMicroscope, FaImage, FaTimes } from 'react-icons/fa';
import { formatAnalysis } from './formatAnalysis';

const ImageAnalyzer = () => {
	const [imagePreviewUrl, setImagePreviewUrl] = useState('');
	const [imageBase64, setImageBase64] = useState('');
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [dots, setDots] = useState('');
	const [analysis, setAnalysis] = useState('');

	useEffect(() => {
		if (loading) {
			const interval = setInterval(() => {
				setDots(prev => (prev.length < 3 ? prev + '.' : ''));
			}, 500);
			return () => clearInterval(interval);
		}
		setDots('');
	}, [loading]);

	const handleFileChange = e => {
		const file = e.target.files && e.target.files[0];
		if (!file) return;

		if (!file.type.startsWith('image/')) {
			setErrors({ image: 'Please select a valid image file.' });
			return;
		}

		const reader = new FileReader();
		reader.onload = () => {
			const result = reader.result || '';
			const dataUrl = typeof result === 'string' ? result : '';
			const base64 = dataUrl.includes(',') ? dataUrl.split(',')[1] : dataUrl;
			setImagePreviewUrl(dataUrl);
			setImageBase64(base64);
			setErrors({});
			setAnalysis('');
		};
		reader.readAsDataURL(file);
	};

	const clearImage = () => {
		setImagePreviewUrl('');
		setImageBase64('');
		setErrors({});
	};

	const handleSubmit = async e => {
		e.preventDefault();
		const newErrors = {};
		if (!imageBase64) newErrors.image = 'Image is required.';
		setErrors(newErrors);
		if (Object.keys(newErrors).length > 0) return;

		setLoading(true);
		setAnalysis('');
		try {
			const response = await axios.post('http://localhost:8000/analyze_image', {
				image: imageBase64,
			});
			setAnalysis(response.data.analysis);
		} catch (error) {
			console.error('Error during image analysis:', error);
			setAnalysis('An error occurred during analysis.');
		}
		setLoading(false);
	};

	return (
<div className='max-w-4xl mx-auto p-4 pt-20'>
			<div className='w-full mx-auto mt-5 mb-12 max-w-5xl min-w-96 
			                bg-gradient-to-br from-white/10 to-white/5 
			                p-12 rounded-3xl shadow-2xl backdrop-blur-xl 
			                relative overflow-hidden'>
				<h2 className='text-xl mb-5 text-center text-white'>
					<div className='inline-flex items-center'>
						<FaMicroscope size={24} className='mr-2' />
						<span>Image Analysis</span>
					</div>
				</h2>

				<form onSubmit={handleSubmit} className='flex flex-col gap-8'>
					<div className='flex flex-col gap-2'>
						<label className='inline-flex items-center text-white font-bold text-sm'>
							<FaImage size={15} className='mr-2' />
							<span>Upload Image *</span>
						</label>

						{!imagePreviewUrl && (
							<input
								type='file'
								accept='image/*'
								onChange={handleFileChange}
								className={`w-full px-4 py-3 border rounded-xl text-sm bg-gradient-to-br from-white/10 to-white/5 text-white shadow-lg transition-all duration-300 focus:outline-none focus:border-purple-500 focus:shadow-purple-500/40 focus:bg-gradient-to-br focus:from-white/15 focus:to-white/8 focus:-translate-y-0.5 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-purple-500 file:to-primary-500 file:text-white hover:file:from-purple-600 hover:file:to-primary-600 transition-colors ${
									errors.image ? 'border-red-500 shadow-red-500/50' : 'border-white/20'
								}`}
							/>
						)}

						{imagePreviewUrl && (
							<div className='flex flex-col gap-3'>
								<img
									src={imagePreviewUrl}
									alt='preview'
									className='max-w-full rounded-2xl shadow-2xl border border-white/20'
								/>
								<button
									type='button'
									className='px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg hover:from-primary-600 hover:to-primary-700 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 w-fit'
									onClick={clearImage}>
									<FaTimes className='mr-2' /> Remove Image
								</button>
							</div>
						)}

						{errors.image && <span className='text-red-400 text-xs font-bold mt-1'>{errors.image}</span>}
					</div>

					<button
						type='submit'
						className='w-full max-w-xs mx-auto px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:from-purple-600 hover:to-purple-700 hover:-translate-y-1 hover:shadow-purple-500/40 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none uppercase tracking-wide'
						disabled={loading}>
						Analyze Image
					</button>
				</form>
			</div>

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
					<div className='text-gray-100 leading-relaxed text-lg'>
            {formatAnalysis(analysis)}
          </div>
				</div>
			)}
		</div>
	);
};

export default ImageAnalyzer;
