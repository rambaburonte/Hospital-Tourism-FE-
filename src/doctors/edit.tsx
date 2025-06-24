import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import AdminSidebar from '../components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  hospital: string;
  email: string;
  phone: string;
  experience: number;
}

const EditDoctor: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    hospital: '',
    email: '',
    phone: '',
    experience: 0,
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Doctor[]>(`${BASE_URL}/api/doctors`);
      setDoctors(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch doctors',
        variant: 'destructive',
      });
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setFormData({
      name: doctor.name,
      specialization: doctor.specialization,
      hospital: doctor.hospital,
      email: doctor.email,
      phone: doctor.phone,
      experience: doctor.experience,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'experience' ? parseInt(value) || 0 : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor) return;
    
    setLoading(true);
    try {
      await axios.put(`${BASE_URL}/api/doctors/${selectedDoctor.id}`, formData);
      
      toast({
        title: 'Success',
        description: 'Doctor updated successfully',
      });
      
      fetchDoctors();
      setSelectedDoctor(null);
      setFormData({ 
        name: '', 
        specialization: '', 
        hospital: '', 
        email: '', 
        phone: '', 
        experience: 0 
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update doctor',
        variant: 'destructive',
      });
      console.error('Error updating doctor:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 ml-64 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Doctor</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Select a Doctor</h2>
            
            {loading && <p>Loading doctors...</p>}
            
            {!loading && doctors.length === 0 && (
              <p className="text-gray-500">No doctors available.</p>
            )}
            
            {!loading && doctors.length > 0 && (
              <div className="max-h-96 overflow-y-auto">
                {doctors.map(doctor => (
                  <div 
                    key={doctor.id}
                    className={`p-4 mb-2 border rounded-md cursor-pointer hover:bg-gray-50 ${
                      selectedDoctor?.id === doctor.id ? 'bg-green-50 border-green-300' : ''
                    }`}
                    onClick={() => handleSelectDoctor(doctor)}
                  >
                    <p className="font-medium">{doctor.name}</p>
                    <p className="text-sm text-gray-600">{doctor.specialization}</p>
                    <p className="text-sm text-gray-600">{doctor.hospital}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Edit Details</h2>
            
            {!selectedDoctor ? (
              <p className="text-gray-500">Please select a doctor to edit.</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hospital">Hospital</Label>
                  <Input
                    id="hospital"
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience (years)</Label>
                  <Input
                    id="experience"
                    name="experience"
                    type="number"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    min="0"
                  />
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 mr-2"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                  
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSelectedDoctor(null);
                      setFormData({ 
                        name: '', 
                        specialization: '', 
                        hospital: '', 
                        email: '', 
                        phone: '', 
                        experience: 0 
                      });
                    }}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDoctor;
