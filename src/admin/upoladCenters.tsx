import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Location {
  locationId: number;
  city: string;
  state: string;
  country: string;
}

const SpaUploadPage: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [formData, setFormData] = useState({
    spaName: '',
    spaDescription: '',
    spaImage: '',
    rating: '',
    address: '',
    locationId: ''
  });

  useEffect(() => {
    axios.get('http://localhost:8080/api/locations')
      .then(res => setLocations(res.data))
      .catch(err => console.error('Failed to fetch locations:', err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        locationId: parseInt(formData.locationId, 10)
      };
      await axios.post('http://localhost:8080/spaCenter/upload', payload);
      alert('Spa center uploaded successfully!');
      setFormData({
        spaName: '',
        spaDescription: '',
        spaImage: '',
        rating: '',
        address: '',
        locationId: ''
      });
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. See console for details.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Upload Spa Center</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="spaName" placeholder="Spa Name" value={formData.spaName} onChange={handleChange} style={styles.input} required />
        <textarea name="spaDescription" placeholder="Description" value={formData.spaDescription} onChange={handleChange} style={styles.textarea} required />
        <input type="text" name="spaImage" placeholder="Image URL" value={formData.spaImage} onChange={handleChange} style={styles.input} required />
        <input type="text" name="rating" placeholder="Rating" value={formData.rating} onChange={handleChange} style={styles.input} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} style={styles.input} required />
        
        <select name="locationId" value={formData.locationId} onChange={handleChange} style={styles.input} required>
          <option value="">Select Location</option>
          {locations.map(loc => (
            <option key={loc.locationId} value={loc.locationId}>
              {loc.city}, {loc.state}, {loc.country}
            </option>
          ))}
        </select>

        <button type="submit" style={styles.button}>Upload Spa</button>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '2rem',
    maxWidth: '600px',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  input: {
    padding: '10px',
    fontSize: '1rem'
  },
  textarea: {
    padding: '10px',
    fontSize: '1rem',
    minHeight: '100px'
  },
  button: {
    padding: '12px',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer'
  }
};

export default SpaUploadPage;
