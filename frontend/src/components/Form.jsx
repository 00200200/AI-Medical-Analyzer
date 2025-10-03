import React, { useState, useEffect } from 'react';
import { MdAssignmentInd, MdCalendarMonth, MdTransgender } from 'react-icons/md';
import { FaHospitalUser, FaPills, FaHeartbeat, FaInfoCircle, FaMicroscope, FaTimes } from 'react-icons/fa';
import './Form.css';

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

  const handleRemoveDisease = (index) => {
    setFormData({
      ...formData,
      diseases: formData.diseases.filter((_, i) => i !== index),
    });
  };

  const handleRemoveMedication = (index) => {
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
    <div className='form-container'>
      <h2>
        <div className="header-with-icon">
          <MdAssignmentInd size={24} />
          <span>Patient Information</span>
        </div>
      </h2>

      <form onSubmit={handleSubmit} className='form'>
        <div className='form-group'>
          <label className="label-with-icon">
            <MdCalendarMonth size={15} className="icon-right-margin" />
            <span>Age *</span>
          </label>
          <input
            type='number'
            placeholder='e.g. 35'
            value={formData.age}
            onChange={e => setFormData({ ...formData, age: e.target.value })}
            className={errors.age ? 'error-field' : ''}
          />
          {errors.age && <span className="error-text">{errors.age}</span>}
        </div>

        <div className='form-group'>
          <label className="label-with-icon">
            <MdTransgender size={15} className="icon-right-margin" />
            <span>Gender *</span>
          </label>
          <select
            value={formData.gender}
            onChange={e => setFormData({ ...formData, gender: e.target.value })}
            className={errors.gender ? 'error-field' : ''}
          >
            <option value=''>Select gender</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
          {errors.gender && <span className="error-text">{errors.gender}</span>}
        </div>

        <div className='form-group'>
          <label className="label-with-icon">
            <FaHospitalUser size={15} className="icon-right-margin" />
            <span>Chronic Diseases (optional)</span>
          </label>
          <div className='input-row'>
            <input
              type='text'
              placeholder='e.g. Type 2 Diabetes'
              value={diseaseInput}
              onChange={e => setDiseaseInput(e.target.value)}
            />
            <button type='button' className='btn btn-blue' onClick={handleAddDisease}>
              Add
            </button>
          </div>
          {formData.diseases.length > 0 && (
            <div className='chips'>
              {formData.diseases.map((disease, index) => (
                <span key={index} className='chip'>
                  {disease}
                  <FaTimes className='remove-chip' onClick={() => handleRemoveDisease(index)} />
                </span>
              ))}
            </div>
          )}
        </div>

        <div className='form-group'>
          <label className="label-with-icon">
            <FaPills size={15} className="icon-right-margin" />
            <span>Current Medications (optional)</span>
          </label>
          <div className='input-row'>
            <input
              type='text'
              placeholder='e.g. Metformin 500mg'
              value={medicationInput}
              onChange={e => setMedicationInput(e.target.value)}
            />
            <button type='button' className='btn btn-blue' onClick={handleAddMedication}>
              Add
            </button>
          </div>
          {formData.medications.length > 0 && (
            <div className='chips'>
              {formData.medications.map((medication, index) => (
                <span key={index} className='chip'>
                  {medication}
                  <FaTimes className='remove-chip' onClick={() => handleRemoveMedication(index)} />
                </span>
              ))}
            </div>
          )}
        </div>

        <div className='form-group'>
          <label className="label-with-icon">
            <FaHeartbeat size={15} className="icon-right-margin" />
            <span>Current Health Status (optional)</span>
          </label>
          <textarea
            placeholder='Describe how you feel, any symptoms...'
            value={formData.healthStatus}
            onChange={e => setFormData({ ...formData, healthStatus: e.target.value })}
          />
        </div>

        <div className='form-group'>
          <label className="label-with-icon">
            <FaInfoCircle size={15} className="icon-right-margin" />
            <span>Additional Information (optional)</span>
          </label>
          <textarea
            placeholder='Other relevant information that might affect the analysis...'
            value={formData.additionalInfo}
            onChange={e => setFormData({ ...formData, additionalInfo: e.target.value })}
          />
        </div>

        <div className='form-group'>
          <label className="label-with-icon">
            <FaMicroscope size={15} className="icon-right-margin" />
            <span>Blood Test Results *</span>
          </label>
          <textarea
            placeholder='Enter blood test results...'
            value={formData.bloodResults}
            onChange={e => setFormData({ ...formData, bloodResults: e.target.value })}
            className={errors.bloodResults ? 'error-field' : ''}
          />
          {errors.bloodResults && <span className="error-text">{errors.bloodResults}</span>}
        </div>

        <button type='submit' className='btn btn-green' disabled={loading}>
          Analyze Results
        </button>
      </form>
    </div>
  );
};

export default Form;
