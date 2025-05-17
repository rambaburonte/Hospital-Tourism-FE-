import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface LabTest {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

export default function LabTestUploadPage() {
  const [formData, setFormData] = useState<Partial<LabTest>>({});
  const [labTests, setLabTests] = useState<LabTest[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/labtests')
      .then(res => setLabTests(res.data))
      .catch(err => console.error('Error fetching lab tests:', err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      setMessage('All fields are required');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/api/labtests', formData);
      setLabTests(prev => [...prev, res.data]);
      setFormData({});
      setMessage('Lab test uploaded successfully');
    } catch (error) {
      console.error(error);
      setMessage('Failed to upload lab test');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Upload Lab Test</h2>
      {message && <div className="mb-3 text-indigo-600">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={formData.name || ''} onChange={handleChange}
          placeholder="Test Name" className="w-full p-2 border rounded" />

        <textarea name="description" value={formData.description || ''} onChange={handleChange}
          placeholder="Description" className="w-full p-2 border rounded" />

        <input type="number" name="price" value={formData.price || ''} onChange={handleChange}
          placeholder="Price" className="w-full p-2 border rounded" />

        <input name="category" value={formData.category || ''} onChange={handleChange}
          placeholder="Category" className="w-full p-2 border rounded" />

        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Submit
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Uploaded Lab Tests:</h3>
        <ul className="space-y-2">
          {labTests.map(test => (
            <li key={test.id} className="border p-2 rounded">
              <strong>{test.name}</strong> - {test.category} - ₹{test.price}
              <p>{test.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
