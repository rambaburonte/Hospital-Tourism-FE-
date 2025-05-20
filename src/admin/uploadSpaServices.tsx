import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';

interface SpaCenter {
  spaId: number;
  spaName: string;
}

const SpaServiceUpload: React.FC = () => {
  const [spaCenters, setSpaCenters] = useState<SpaCenter[]>([]);
  const [formData, setFormData] = useState({
    serviceName: '',
    serviceDescription: '',
    serviceImage: '',
    rating: '',
    price: '',
    spaCenterId: 0
  });

  const [message, setMessage] = useState('');

  // Fetch spa centers on mount
  useEffect(() => {
    fetch('http://localhost:8080/spaCenter/all')
      .then((res) => res.json())
      .then((data) => setSpaCenters(data))
      .catch((err) => console.error('Error fetching spa centers:', err));
  }, []);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'spaCenterId' ? Number(value) : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:8080/spaServices/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to upload service');
        return res.json();
      })
      .then((data) => {
        setMessage('Spa service uploaded successfully!');
        setFormData({
          serviceName: '',
          serviceDescription: '',
          serviceImage: '',
          rating: '',
          price: '',
          spaCenterId: 0
        });
      })
      .catch((err) => {
        console.error(err);
        setMessage('Upload failed.');
      });
  };

  return (
    <>
    <Sidebar/>
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Upload Spa Service</h2>
      {message && <div className="mb-4 text-green-600">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
          <div>
          <label className="block mb-1 font-medium">Spa Center</label>
          <select
            name="spaCenterId"
            value={formData.spaCenterId}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Select a Spa Center</option>
            {spaCenters.map((spa) => (
              <option key={spa.spaId} value={spa.spaId}>
                {spa.spaName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Service Name</label>
          <input
            type="text"
            name="serviceName"
            value={formData.serviceName}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="serviceDescription"
            value={formData.serviceDescription}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="text"
            name="serviceImage"
            value={formData.serviceImage}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Rating</label>
          <input
            type="text"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

      

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Upload
        </button>
      </form>
    </div>
    </>
  );
};

export default SpaServiceUpload;
