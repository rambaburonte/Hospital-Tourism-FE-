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
  hospitalId: number;
  hospitalName?: string; // Make optional in case it's missing
  hospitalDescription?: string;
  hospitalImage?: string;
  rating?: string;
  address?: string;
  status?: string;
  hospitallocationId?: number;
  hospitallocationName?: string;
  // Add alternative field names in case backend sends different names
  hospital_name?: string;
  hospital_description?: string;
  hospital_image?: string;
}

const EditHospital: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(false);  const [formData, setFormData] = useState({
    hospitalName: '',
    hospitalDescription: '',
    address: '',
    rating: '',
    status: '',
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();  const fetchHospitals = async () => {
    setLoading(true);
    try {
      console.log('Fetching hospitals from:', `${BASE_URL}/api/hospitals/getall/hospitals`);
      
      // First try the debug endpoint to see raw data
      try {
        const debugResponse = await axios.get(`${BASE_URL}/api/hospitals/debug/raw`);
        console.log('Debug Raw Data:', debugResponse.data);
      } catch (debugError) {
        console.log('Debug endpoint not available or error:', debugError);
      }
      
      const response = await axios.get<Hospital[]>(`${BASE_URL}/api/hospitals/getall/hospitals`);
      console.log('Full API Response:', response);
      console.log('Response Status:', response.status);
      console.log('Response Data:', response.data);
      console.log('Data Length:', response.data?.length);
      setHospitals(response.data || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch hospitals',
        variant: 'destructive',
      });
      console.error('Error fetching hospitals:', error);
      if (axios.isAxiosError(error)) {
        console.error('Error Response:', error.response?.data);
        console.error('Error Status:', error.response?.status);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  const handleSelectHospital = (hospital: Hospital) => {
    console.log('=== SELECTING HOSPITAL ===');
    console.log('Full hospital object:', hospital);
    console.log('Hospital ID:', hospital.hospitalId);
    console.log('Hospital ID type:', typeof hospital.hospitalId);
    console.log('========================');
    
    setSelectedHospital(hospital);
    setFormData({
      hospitalName: hospital.hospitalName || hospital.hospital_name || '',
      hospitalDescription: hospital.hospitalDescription || hospital.hospital_description || '',
      address: hospital.address || '',
      rating: hospital.rating || '',
      status: hospital.status || '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHospital) return;
    
    setLoading(true);    try {      const updateData = {
        hospitalId: selectedHospital.hospitalId,
        hospitalName: formData.hospitalName,
        hospitalDescription: formData.hospitalDescription,
        hospitalImage: selectedHospital.hospitalImage || selectedHospital.hospital_image || '',
        rating: formData.rating.toString(),
        address: formData.address,
        status: formData.status,
        hospitallocationId: selectedHospital.hospitallocationId,
        hospitallocationName: selectedHospital.hospitallocationName
      };      console.log('=== SUBMITTING HOSPITAL UPDATE ===');
      console.log('Selected hospital:', selectedHospital);
      console.log('Hospital ID:', selectedHospital.hospitalId);
      console.log('Hospital ID type:', typeof selectedHospital.hospitalId);
      console.log('Update URL:', `${BASE_URL}/api/hospitals/update-hospital/${selectedHospital.hospitalId}`);
      console.log('Sending update data:', updateData);
      console.log('=================================');
      
      if (!selectedHospital.hospitalId) {
        throw new Error('Hospital ID is missing');
      }
      
      const response = await axios.put(`${BASE_URL}/api/hospitals/update-hospital/${selectedHospital.hospitalId}`, updateData);
      console.log('Update response:', response);
      
      toast({
        title: 'Success',
        description: 'Hospital updated successfully',
      });
      
      fetchHospitals();
      setSelectedHospital(null);      setFormData({
        hospitalName: '',
        hospitalDescription: '',
        address: '',
        rating: '',
        status: ''
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
      <div className="flex-1 p-8 ml-64">
        <div className="grid grid-cols-3 gap-8">
          {/* Hospital List */}
          <div className="col-span-1 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Select Hospital</h2>
            <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
              {hospitals.map((hospital) => (
                <button
                  onClick={() => handleSelectHospital(hospital)}
                  key={hospital.hospitalId}
                  className={`w-full text-left p-4 rounded-lg border ${
                    selectedHospital?.hospitalId === hospital.hospitalId ? 'bg-green-50 border-green-300' : ''
                  } hover:bg-gray-50 transition-colors`}
                >                  <div className="space-y-1">                  
                    <p className="font-medium">{hospital.hospitalName || hospital.hospital_name || 'Unnamed Hospital'}</p>
                    <p className="text-xs text-blue-600">ID: {hospital.hospitalId || 'No ID'}</p>
                    <p className="text-sm text-gray-600">{hospital.address || 'No address'}</p>
                    <div className="flex items-center">
                      <div className="flex">
                        {/* Convert rating string to number for stars */}
                        {Array.from({ length: parseInt(hospital.rating || '0') }).map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 15.934l-6.18 3.254 1.181-6.882L.001 7.584l6.902-1.002L10 .342l3.097 6.24 6.902 1.002-4.999 4.722 1.181 6.882z"
                            />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{hospital.rating || '0'}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Edit Form */}          <div className="col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Edit Hospital</h2>
            {selectedHospital ? (
              <div>
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Editing Hospital ID:</strong> {selectedHospital.hospitalId || 'No ID Found'}
                  </p>
                  <p className="text-sm text-blue-800">
                    <strong>Name:</strong> {selectedHospital.hospitalName || selectedHospital.hospital_name || 'Unnamed'}
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                <div>                  <Label htmlFor="hospitalName">Hospital Name</Label>
                  <Input
                    id="hospitalName"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="hospitalDescription">Description</Label>
                  <Textarea
                    id="hospitalDescription"
                    name="hospitalDescription"
                    value={formData.hospitalDescription}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    name="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Input
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {loading ? 'Updating...' : 'Update Hospital'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSelectedHospital(null);                      setFormData({
                        hospitalName: '',
                        hospitalDescription: '',
                        address: '',
                        rating: '',
                        status: '',
                      });
                    }}
                  >
                    Cancel
                  </Button>                </div>
              </form>
              </div>
            ) : (
              <p className="text-gray-500">Select a hospital to edit</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHospital;
