import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMicroscope, FaImage, FaTimes } from 'react-icons/fa';
import './Form.css';

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
			setAnalysis('An error occurred during image analysis.');
		}
		setLoading(false);
	};

	return (
		<div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
			<div className='form-container'>
				<h2>
					<div className='header-with-icon'>
						<FaMicroscope size={24} />
						<span>Image Analysis</span>
					</div>
				</h2>

				<form onSubmit={handleSubmit} className='form'>
					<div className='form-group'>
						<label className='label-with-icon'>
							<FaImage size={15} className='icon-right-margin' />
							<span>Upload Image *</span>
						</label>

						{!imagePreviewUrl && (
							<input
								type='file'
								accept='image/*'
								onChange={handleFileChange}
								className={errors.image ? 'error-field' : ''}
							/>
						)}

						{imagePreviewUrl && (
							<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
								<img
									src={imagePreviewUrl}
									alt='preview'
									style={{
										maxWidth: '100%',
										borderRadius: 12,
										boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
									}}
								/>
								<button type='button' className='btn btn-blue' onClick={clearImage}>
									<FaTimes style={{ marginRight: 6 }} /> Remove Image
								</button>
							</div>
						)}

						{errors.image && <span className='error-text'>{errors.image}</span>}
					</div>

					<button type='submit' className='btn btn-green' disabled={loading}>
						{loading ? `Analyzing${dots}` : 'Analyze Image'}
					</button>
				</form>
			</div>

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

export default ImageAnalyzer;
