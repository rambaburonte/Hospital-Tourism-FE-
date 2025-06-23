import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import AdminSidebar from '../components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface Hospital {
  id: number;
  name: string;
  location: string;
  description: string;
  rating: number;
  image: string;
  status: string;
}

const EditHospital: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    rating: 0,
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchHospitals = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Hospital[]>(`${BASE_URL}/api/hospitals`);
      setHospitals(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch hospitals',
        variant: 'destructive',
      });
      console.error('Error fetching hospitals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectHospital = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setFormData({
      name: hospital.name,
      location: hospital.location,
      description: hospital.description,
      rating: hospital.rating,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'rating' ? parseFloat(value) || 0 : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHospital) return;
    
    setLoading(true);
    try {
      await axios.put(`${BASE_URL}/api/hospitals/update-hospital/${selectedHospital.id}`, formData);
      
      toast({
        title: 'Success',
        description: 'Hospital updated successfully',
      });
      
      fetchHospitals();
      setSelectedHospital(null);
      setFormData({ 
        name: '', 
        location: '', 
        description: '', 
        rating: 0
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update hospital',
        variant: 'destructive',
      });
      console.error('Error updating hospital:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 ml-64 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Hospital</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Select a Hospital</h2>
            
            {loading && <p>Loading hospitals...</p>}
            
            {!loading && hospitals.length === 0 && (
              <p className="text-gray-500">No hospitals available.</p>
            )}
            
            {!loading && hospitals.length > 0 && (
              <div className="max-h-96 overflow-y-auto">
                {hospitals.map(hospital => (
                  <div 
                    key={hospital.id}
                    className={`p-4 mb-2 border rounded-md cursor-pointer hover:bg-gray-50 ${
                      selectedHospital?.id === hospital.id ? 'bg-green-50 border-green-300' : ''
                    }`}
                    onClick={() => handleSelectHospital(hospital)}
                  >
                    <p className="font-medium">{hospital.name}</p>
                    <p className="text-sm text-gray-600">{hospital.location}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-500">Rating: {hospital.rating}</span>
                      <span className="ml-2 text-yellow-500">
                        {Array.from({ length: Math.round(hospital.rating) }).map((_, i) => (
                          <i key={i} className="fas fa-star text-xs"></i>
                        ))}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Edit Details</h2>
            
            {!selectedHospital ? (
              <p className="text-gray-500">Please select a hospital to edit.</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Hospital Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating (0-5)</Label>
                  <Input
                    id="rating"
                    name="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={handleInputChange}
                    required
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
                      setSelectedHospital(null);
                      setFormData({ 
                        name: '', 
                        location: '', 
                        description: '', 
                        rating: 0
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

export default EditHospital;
