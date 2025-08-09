import React, { useState } from 'react';
import { safeExecute } from '../../lib/sandbox';

function FormComponent({ fields = [], submitText = 'Submit', onSubmit: onSubmitLogic }) {
  const initialFormState = fields.reduce((acc, field) => {
    acc[field.name || field.label.toLowerCase()] = '';
    return acc;
  }, {});

  const [values, setValues] = useState(initialFormState);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const logicResult = safeExecute(onSubmitLogic, values);

    if (typeof logicResult === 'string') {
      setError(logicResult);
    } else {
      console.log('Form Submitted:', values);
      setSuccess('Form submitted successfully! Check the console.');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm space-y-4">
      {fields.map(field => {
        const fieldName = field.name || field.label.toLowerCase();
        
        return (
          <div key={fieldName} className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">{field.label}</label>
            <input
              type={field.type}
              name={fieldName}
              placeholder={`Enter your ${field.label.toLowerCase()}`}
              required={field.required}
              min={field.min}
              value={values[fieldName] || ''}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        )
      })}
      <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition font-semibold">
        {submitText}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
    </form>
  );
}

export default FormComponent;