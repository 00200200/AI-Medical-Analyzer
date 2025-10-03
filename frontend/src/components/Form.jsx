import React, { useState, useEffect } from 'react';
import { MdAssignmentInd, MdCalendarMonth, MdTransgender } from 'react-icons/md';
import { FaHospitalUser, FaPills, FaHeartbeat, FaInfoCircle, FaMicroscope, FaTimes } from 'react-icons/fa';

const Form = ({ onSubmit, loading }) => {
	const [formData, setFormData] = useState({
		age: '',
		gender: '',
		diseases: [],
		medications: [],
		healthStatus: '',
		additionalInfo: '',
		bloodResults: '',
	});

	const [errors, setErrors] = useState({});
	const [diseaseInput, setDiseaseInput] = useState('');
	const [medicationInput, setMedicationInput] = useState('');
	const [dots, setDots] = useState('');

	useEffect(() => {
		if (loading) {
			const interval = setInterval(() => {
				setDots(prev => (prev.length < 3 ? prev + '.' : ''));
			}, 500);
			return () => clearInterval(interval);
		}
		setDots('');
	}, [loading]);

	const handleAddDisease = () => {
		if (diseaseInput.trim()) {
			setFormData({
				...formData,
				diseases: [...formData.diseases, diseaseInput.trim()],
			});
			setDiseaseInput('');
		}
	};

	const handleAddMedication = () => {
		if (medicationInput.trim()) {
			setFormData({
				...formData,
				medications: [...formData.medications, medicationInput.trim()],
			});
			setMedicationInput('');
		}
	};

	const handleRemoveDisease = index => {
		setFormData({
			...formData,
			diseases: formData.diseases.filter((_, i) => i !== index),
		});
	};

	const handleRemoveMedication = index => {
		setFormData({
			...formData,
			medications: formData.medications.filter((_, i) => i !== index),
		});
	};

	const handleSubmit = e => {
		e.preventDefault();

		const newErrors = {};
		if (!formData.age) newErrors.age = 'This field is required.';
		if (!formData.gender) newErrors.gender = 'This field is required.';
		if (!formData.bloodResults) newErrors.bloodResults = 'This field is required.';

		setErrors(newErrors);

		if (Object.keys(newErrors).length > 0) return;

		const prompt = `
      Blood Test Analysis Request:
      - Age: ${formData.age} years
      - Gender: ${formData.gender || 'Not specified'}
      - Chronic Diseases: ${formData.diseases.length > 0 ? formData.diseases.join(', ') : 'None reported'}
      - Current Medications: ${formData.medications.length > 0 ? formData.medications.join(', ') : 'None reported'}
      ${formData.healthStatus ? `- Current Health Status: ${formData.healthStatus}` : ''}
      ${formData.additionalInfo ? `- Additional Information: ${formData.additionalInfo}` : ''}

      Blood Test Results:
      ${formData.bloodResults}
    `;

		onSubmit(prompt);
	};

	return (
  <div className='w-full mx-auto mt-5 mb-12 max-w-5xl min-w-96 
                  bg-gradient-to-br from-white/10 to-white/5 
                  p-12 rounded-3xl shadow-2xl backdrop-blur-xl 
                  relative overflow-hidden'>
			<h2 className='text-xl mb-5 text-center text-white'>
				<div className='inline-flex items-center'>
					<MdAssignmentInd size={24} className='mr-2' />
					<span>Patient Information</span>
				</div>
			</h2>

			<form onSubmit={handleSubmit} className='flex flex-col gap-12'>
				<div className='flex flex-col gap-2'>
					<label className='inline-flex items-center text-white font-bold text-sm'>
						<MdCalendarMonth size={15} className='mr-2' />
						<span>Age *</span>
					</label>
					<input
						type='number'
						placeholder='e.g. 35'
						value={formData.age}
						onChange={e => setFormData({ ...formData, age: e.target.value })}
						className={`w-full px-4 py-3 border rounded-xl text-sm 
						bg-gradient-to-br from-white/10 to-white/5 
						text-gray-900 placeholder-gray-400 shadow-lg 
						transition-all duration-300 focus:outline-none 
						focus:border-purple-500 focus:shadow-purple-500/40 
						focus:bg-gradient-to-br focus:from-white/15 focus:to-white/8 
						focus:-translate-y-0.5 ${
							errors.age ? 'border-red-500 shadow-red-500/50' : 'border-white/20'
						}`}
					/>
					{errors.age && <span className='text-red-400 text-xs font-bold mt-1'>{errors.age}</span>}
				</div>

				<div className='flex flex-col gap-2'>
					<label className='inline-flex items-center text-white font-bold text-sm'>
						<MdTransgender size={15} className='mr-2' />
						<span>Gender *</span>
					</label>
					<select
						value={formData.gender}
						onChange={e => setFormData({ ...formData, gender: e.target.value })}
						className={`w-full px-4 py-3 border rounded-xl text-sm 
									bg-white text-gray-900 shadow-lg 
									transition-all duration-300 focus:outline-none 
									focus:border-purple-500 focus:shadow-purple-500/40 
									focus:-translate-y-0.5 cursor-pointer ${
									errors.gender ? 'border-red-500 shadow-red-500/50' : 'border-white/20'
									}`}
					>
						<option value='' className='bg-white text-gray-900'>
						Select gender
						</option>
						<option value='Male' className='bg-white text-gray-900'>
						Male
						</option>
						<option value='Female' className='bg-white text-gray-900'>
						Female
						</option>
					</select>
					{errors.gender && (
						<span className='text-red-400 text-xs font-bold mt-1'>{errors.gender}</span>
					)}
					</div>


				<div className='flex flex-col gap-2'>
					<label className='inline-flex items-center text-white font-bold text-sm'>
						<FaHospitalUser size={15} className='mr-2' />
						<span>Chronic Diseases (optional)</span>
					</label>
					<div className='flex gap-2'>
						<input
							type='text'
							placeholder='e.g. Type 2 Diabetes'
							value={diseaseInput}
							onChange={e => setDiseaseInput(e.target.value)}
							className={`w-full px-4 py-3 border rounded-xl text-sm 
										bg-gradient-to-br from-white/10 to-white/5 
										text-gray-900 placeholder-gray-400 shadow-lg 
										transition-all duration-300 focus:outline-none 
										focus:border-purple-500 focus:shadow-purple-500/40 
										focus:bg-gradient-to-br focus:from-white/15 focus:to-white/8 
										focus:-translate-y-0.5 `}						/>
						<button
							type='button'
							className='px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg hover:from-primary-600 hover:to-primary-700 hover:-translate-y-1 hover:shadow-xl transition-all duration-300'
							onClick={handleAddDisease}>
							Add
						</button>
					</div>
					{formData.diseases.length > 0 && (
						<div className='flex flex-wrap gap-2 mt-2'>
							{formData.diseases.map((disease, index) => (
								<span
									key={index}
									className='inline-flex items-center bg-gradient-to-r from-purple-500/20 to-purple-600/10 px-3 py-2 rounded-2xl text-sm text-white border border-purple-500/30 shadow-lg hover:from-purple-500/30 hover:to-purple-600/20 hover:-translate-y-0.5 transition-all duration-200'>
									{disease}
									<FaTimes
										className='ml-2 w-3 h-3 cursor-pointer hover:text-red-400 transition-colors'
										onClick={() => handleRemoveDisease(index)}
									/>
								</span>
							))}
						</div>
					)}
				</div>

				<div className='flex flex-col gap-2'>
					<label className='inline-flex items-center text-white font-bold text-sm'>
						<FaPills size={15} className='mr-2' />
						<span>Current Medications (optional)</span>
					</label>
					<div className='flex gap-2'>
						<input
							type='text'
							placeholder='e.g. Metformin 500mg'
							value={medicationInput}
							onChange={e => setMedicationInput(e.target.value)}
							className={`w-full px-4 py-3 border rounded-xl text-sm 
										bg-gradient-to-br from-white/10 to-white/5 
										text-gray-900 placeholder-gray-400 shadow-lg 
										transition-all duration-300 focus:outline-none 
										focus:border-purple-500 focus:shadow-purple-500/40 
										focus:bg-gradient-to-br focus:from-white/15 focus:to-white/8 
										focus:-translate-y-0.5`}						/>
						<button
							type='button'
							className='px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg hover:from-primary-600 hover:to-primary-700 hover:-translate-y-1 hover:shadow-xl transition-all duration-300'
							onClick={handleAddMedication}>
							Add
						</button>
					</div>
					{formData.medications.length > 0 && (
						<div className='flex flex-wrap gap-2 mt-2'>
							{formData.medications.map((medication, index) => (
								<span
									key={index}
									className='inline-flex items-center bg-gradient-to-r from-purple-500/20 to-purple-600/10 px-3 py-2 rounded-2xl text-sm text-white border border-purple-500/30 shadow-lg hover:from-purple-500/30 hover:to-purple-600/20 hover:-translate-y-0.5 transition-all duration-200'>
									{medication}
									<FaTimes
										className='ml-2 w-3 h-3 cursor-pointer hover:text-red-400 transition-colors'
										onClick={() => handleRemoveMedication(index)}
									/>
								</span>
							))}
						</div>
					)}
				</div>

				<div className='flex flex-col gap-2'>
					<label className='inline-flex items-center text-white font-bold text-sm'>
						<FaHeartbeat size={15} className='mr-2' />
						<span>Current Health Status (optional)</span>
					</label>
					<textarea
						placeholder='Describe how you feel, any symptoms...'
						value={formData.healthStatus}
						onChange={e => setFormData({ ...formData, healthStatus: e.target.value })}
						className={`w-full px-4 py-3 border rounded-xl text-sm 
									bg-gradient-to-br from-white/10 to-white/5 
									text-gray-900 placeholder-gray-400 shadow-lg 
									transition-all duration-300 focus:outline-none 
									focus:border-purple-500 focus:shadow-purple-500/40 
									focus:bg-gradient-to-br focus:from-white/15 focus:to-white/8 
									focus:-translate-y-0.5 min-h-32 resize-y`}					/>
				</div>

				<div className='flex flex-col gap-2'>
					<label className='inline-flex items-center text-white font-bold text-sm'>
						<FaInfoCircle size={15} className='mr-2' />
						<span>Additional Information (optional)</span>
					</label>
					<textarea
						placeholder='Other relevant information that might affect the analysis...'
						value={formData.additionalInfo}
						onChange={e => setFormData({ ...formData, additionalInfo: e.target.value })}
						className={`w-full px-4 py-3 border rounded-xl text-sm 
									bg-gradient-to-br from-white/10 to-white/5 
									text-gray-900 placeholder-gray-400 shadow-lg 
									transition-all duration-300 focus:outline-none 
									focus:border-purple-500 focus:shadow-purple-500/40 
									focus:bg-gradient-to-br focus:from-white/15 focus:to-white/8 
									focus:-translate-y-0.5 min-h-32 resize-y`}					/>
				</div>

				<div className='flex flex-col gap-2'>
					<label className='inline-flex items-center text-white font-bold text-sm'>
						<FaMicroscope size={15} className='mr-2' />
						<span>Blood Test Results *</span>
					</label>
					<textarea
						placeholder='Enter blood test results...'
						value={formData.bloodResults}
						onChange={e => setFormData({ ...formData, bloodResults: e.target.value })}
						className={`w-full px-4 py-3 border rounded-xl text-sm 
									bg-gradient-to-br from-white/10 to-white/5 
									text-gray-900 placeholder-gray-400 shadow-lg 
									transition-all duration-300 focus:outline-none 
									focus:border-purple-500 focus:shadow-purple-500/40 
									focus:bg-gradient-to-br focus:from-white/15 focus:to-white/8 
									focus:-translate-y-0.5 min-h-32 resize-y ${
										errors.bloodResults ? 'border-red-500 shadow-red-500/50' : 'border-white/20'
									}`}
					/>
					{errors.bloodResults && <span className='text-red-400 text-xs font-bold mt-1'>{errors.bloodResults}</span>}
				</div>

				<button
					type='submit'
					className='w-full max-w-xs mx-auto px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:from-purple-600 hover:to-purple-700 hover:-translate-y-1 hover:shadow-purple-500/40 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none uppercase tracking-wide relative overflow-hidden'
					disabled={loading}>
					Analyze Results
				</button>
			</form>
		</div>
	);
};

export default Form;
