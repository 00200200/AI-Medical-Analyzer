import React, { useState } from 'react';

const Form = ({ onSubmit }) => {
	const [formData, setFormData] = useState({
		age: '',
		gender: '',
		diseases: [],
		medications: [],
		healthStatus: '',
		additionalInfo: '',
		bloodResults: '',
	});

	const [diseaseInput, setDiseaseInput] = useState('');
	const [medicationInput, setMedicationInput] = useState('');

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

	const handleSubmit = e => {
		e.preventDefault();

		// Create prompt combining all information in English
		const prompt = `
            Blood Test Analysis Request:
            - Age: ${formData.age} years
            - Gender: ${formData.gender || 'Not specified'}
            - Chronic Diseases: ${formData.diseases.length > 0 ? formData.diseases.join(', ') : 'None reported'}
            - Current Medications: ${
							formData.medications.length > 0 ? formData.medications.join(', ') : 'None reported'
						}
            ${formData.healthStatus ? `- Current Health Status: ${formData.healthStatus}` : ''}
            ${formData.additionalInfo ? `- Additional Information: ${formData.additionalInfo}` : ''}

            Blood Test Results:
            ${formData.bloodResults}
`;

		onSubmit(prompt);
	};

	return (
		<div className='form-container' style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
			<h2>📋 Patient Information</h2>

			<form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
				<div>
					<label>🔢 Age</label>
					<input
						type='number'
						placeholder='e.g. 35'
						value={formData.age}
						onChange={e => setFormData({ ...formData, age: e.target.value })}
						style={{ width: '100%', padding: '8px' }}
					/>
				</div>

				<div>
					<label>⚧ Gender</label>
					<select
						value={formData.gender}
						onChange={e => setFormData({ ...formData, gender: e.target.value })}
						style={{ width: '100%', padding: '8px' }}>
						<option value=''>Select gender (optional)</option>
						<option value='Male'>Male</option>
						<option value='Female'>Female</option>
					</select>
				</div>

				<div>
					<label>🏥 Chronic Diseases (optional)</label>
					<div style={{ display: 'flex', gap: '10px' }}>
						<input
							type='text'
							placeholder='e.g. Type 2 Diabetes'
							value={diseaseInput}
							onChange={e => setDiseaseInput(e.target.value)}
							style={{ flex: 1, padding: '8px' }}
						/>
						<button
							type='button'
							onClick={handleAddDisease}
							style={{
								padding: '8px 16px',
								backgroundColor: '#007bff',
								color: 'white',
								border: 'none',
								borderRadius: '4px',
							}}>
							Add
						</button>
					</div>
					{formData.diseases.length > 0 && (
						<div style={{ marginTop: '10px' }}>
							{formData.diseases.map((disease, index) => (
								<span
									key={index}
									style={{
										display: 'inline-block',
										background: '#e9ecef',
										padding: '4px 8px',
										margin: '2px',
										borderRadius: '4px',
									}}>
									{disease}
								</span>
							))}
						</div>
					)}
				</div>

				<div>
					<label>💊 Current Medications (optional)</label>
					<div style={{ display: 'flex', gap: '10px' }}>
						<input
							type='text'
							placeholder='e.g. Metformin 500mg'
							value={medicationInput}
							onChange={e => setMedicationInput(e.target.value)}
							style={{ flex: 1, padding: '8px' }}
						/>
						<button
							type='button'
							onClick={handleAddMedication}
							style={{
								padding: '8px 16px',
								backgroundColor: '#007bff',
								color: 'white',
								border: 'none',
								borderRadius: '4px',
							}}>
							Add
						</button>
					</div>
					{formData.medications.length > 0 && (
						<div style={{ marginTop: '10px' }}>
							{formData.medications.map((medication, index) => (
								<span
									key={index}
									style={{
										display: 'inline-block',
										background: '#e9ecef',
										padding: '4px 8px',
										margin: '2px',
										borderRadius: '4px',
									}}>
									{medication}
								</span>
							))}
						</div>
					)}
				</div>

				<div>
					<label>🩺 Current Health Status (optional)</label>
					<textarea
						placeholder='Describe how you feel, any symptoms...'
						value={formData.healthStatus}
						onChange={e => setFormData({ ...formData, healthStatus: e.target.value })}
						style={{ width: '100%', padding: '8px', minHeight: '100px' }}
					/>
				</div>

				<div>
					<label>ℹ️ Additional Information (optional)</label>
					<textarea
						placeholder='Other relevant information that might affect the analysis...'
						value={formData.additionalInfo}
						onChange={e => setFormData({ ...formData, additionalInfo: e.target.value })}
						style={{ width: '100%', padding: '8px', minHeight: '100px' }}
					/>
				</div>

				<div>
					<label>🔬 Blood Test Results</label>
					<textarea
						placeholder='Enter blood test results...'
						value={formData.bloodResults}
						onChange={e => setFormData({ ...formData, bloodResults: e.target.value })}
						style={{ width: '100%', padding: '8px', minHeight: '150px' }}
					/>
				</div>

				<button
					type='submit'
					style={{
						padding: '12px 24px',
						backgroundColor: '#28a745',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						fontSize: '16px',
						cursor: 'pointer',
					}}>
					Analyze Results
				</button>
			</form>
		</div>
	);
};

export default Form;
