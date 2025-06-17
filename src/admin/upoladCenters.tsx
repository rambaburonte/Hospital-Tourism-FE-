import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './sidebar';
import { BASE_URL } from '@/config/config';
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
    address: '',
    spaDescription: '',
    rating: '',
    locationId: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/locations`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setLocations(data);
      } else {
        console.error("Expected array but got:", data);
      }
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      alert('Please upload an image.');
      return;
    }

    const spaData = new FormData();
    spaData.append('name', formData.spaName);
    spaData.append('description', formData.spaDescription);
    spaData.append('rating', formData.rating);
    spaData.append('locationId', formData.locationId);
    spaData.append('image', imageFile);

    try {
      await axios.post(`${BASE_URL}/spaCenter/upload`, spaData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Spa center uploaded successfully!');
      setFormData({
        spaName: '',
        spaDescription: '',
        address:'',
        rating: '',
        locationId: ''

      });
      setImageFile(null);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Check console for more info.');
    }
  };

  return (
    <>
      <Sidebar />
      <div style={styles.container}>
        <h1 style={styles.title}>Upload Spa Center</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <select name="locationId" value={formData.locationId} onChange={handleChange} style={styles.input} required>
            <option value="">Select Location</option>
            {locations.map(loc => (
              <option key={loc.locationId} value={loc.locationId}>
                {loc.city}, {loc.state}, {loc.country}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="spaName"
            placeholder="Spa Name"
            value={formData.spaName}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <textarea
            name="spaDescription"
            placeholder="Description"
            value={formData.spaDescription}
            onChange={handleChange}
            style={styles.textarea}
            required
          />
           <input
            name="address"
            placeholder="address"
            value={formData.address}
            onChange={handleChange}
            style={styles.textarea}
            required
          />
          <input
            type="text"
            name="rating"
            placeholder="Rating (0-5)"
            value={formData.rating}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="file"
            name="spaImage"
            accept="image/*"
            onChange={handleFileChange}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Upload Spa</button>
        </form>
      </div>
    </>
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
