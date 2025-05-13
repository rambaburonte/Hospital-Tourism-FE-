import React, { useState, useEffect, FormEvent } from 'react';
import Sidebar from './sidebar';

interface DoctorFormData {
  name: string;
  email: string;
  mobileNum: string;
  rating: number;
  description: string;
  location: string;
  hospital: string;
  department: string;
  country: string;
  state: string;
  city: string;
}

const hospitalData = {
  USA: {
    California: {
      LosAngeles: ['Sunset Clinic', 'LA Hospital'],
      SanFrancisco: ['SF General', 'Bay Hospital']
    },
    Texas: {
      Houston: ['Houston Medical', 'Memorial Health'],
      Dallas: ['Dallas Clinic']
    }
  },
  India: {
    Maharashtra: {
      Mumbai: ['Mumbai Central Hospital'],
      Pune: ['Pune Health Center']
    },
    Karnataka: {
      Bangalore: ['Bangalore Hospital'],
      Mysore: ['Mysore Care']
    }
  }
};

const DoctorUploadForm: React.FC = () => {
  const [formData, setFormData] = useState<DoctorFormData>({
    name: '',
    email: '',
    mobileNum: '',
    rating: 0,
    description: '',
    location: '',
    hospital: '',
    department: '',
    country: '',
    state: '',
    city: ''
  });

  const [errors, setErrors] = useState<Partial<DoctorFormData>>({});
  const [availableStates, setAvailableStates] = useState<string[]>([]);
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [availableHospitals, setAvailableHospitals] = useState<string[]>([]);

  useEffect(() => {
    if (formData.country) {
      const states = Object.keys(hospitalData[formData.country] || {});
      setAvailableStates(states);
    } else {
      setAvailableStates([]);
    }
    setFormData((prev) => ({ ...prev, state: '', city: '', hospital: '' }));
  }, [formData.country]);

  useEffect(() => {
    if (formData.country && formData.state) {
      const cities = Object.keys(hospitalData[formData.country]?.[formData.state] || {});
      setAvailableCities(cities);
    } else {
      setAvailableCities([]);
    }
    setFormData((prev) => ({ ...prev, city: '', hospital: '' }));
  }, [formData.state]);

  useEffect(() => {
    if (formData.country && formData.state && formData.city) {
      const hospitals = hospitalData[formData.country]?.[formData.state]?.[formData.city] || [];
      setAvailableHospitals(hospitals);
    } else {
      setAvailableHospitals([]);
    }
    setFormData((prev) => ({ ...prev, hospital: '' }));
  }, [formData.city]);

  const validateForm = (): boolean => {
    const newErrors: Partial<DoctorFormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.mobileNum.trim()) newErrors.mobileNum = 'Mobile number is required';
    else if (!/^\d{10}$/.test(formData.mobileNum)) newErrors.mobileNum = 'Mobile number must be 10 digits';
    if (formData.rating < 0 || formData.rating > 5) newErrors.rating = 'Rating must be between 0 and 5';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.hospital) newErrors.hospital = 'Hospital is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch('/api/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, location: `${formData.city}, ${formData.state}, ${formData.country}` }),
      });

      if (response.ok) {
        alert('Doctor added successfully!');
        setFormData({
          name: '',
          email: '',
          mobileNum: '',
          rating: 0,
          description: '',
          location: '',
          hospital: '',
          department: '',
          country: '',
          state: '',
          city: ''
        });
      } else {
        alert('Failed to add doctor.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-white min-h-screen">
        <div className="flex justify-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Add New Doctor</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto border border-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
              <select name="country" value={formData.country} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg">
                <option value="">Select Country</option>
                {Object.keys(hospitalData).map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
              <select name="state" value={formData.state} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg">
                <option value="">Select State</option>
                {availableStates.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
              <select name="city" value={formData.city} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg">
                <option value="">Select City</option>
                {availableCities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Hospital</label>
              <select name="hospital" value={formData.hospital} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg">
                <option value="">Select Hospital</option>
                {availableHospitals.map((hospital) => (
                  <option key={hospital} value={hospital}>{hospital}</option>
                ))}
              </select>
              {errors.hospital && <p className="text-red-500 text-xs mt-1">{errors.hospital}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
              <input type="text" name="mobileNum" value={formData.mobileNum} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" />
              {errors.mobileNum && <p className="text-red-500 text-xs mt-1">{errors.mobileNum}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
              <input type="number" name="rating" min="0" max="5" value={formData.rating} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" />
              {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
            </div>
          </div>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full p-3 border border-gray-300 rounded-lg"></textarea>
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>
          <button type="submit" className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600">Add Doctor</button>
        </form>
      </div>
    </div>
  );
};

export default DoctorUploadForm;