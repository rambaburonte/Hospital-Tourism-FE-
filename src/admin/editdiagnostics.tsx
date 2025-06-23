import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import AdminSidebar from '../components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface Diagnostic {
  diognosticsId: number;
  diognosticsName: string;
  diognosticsDescription: string;
  diognosticsImage: string;
  diognosticsrating: string;
  diognosticsaddress: string;
  Status?: string;
}

const EditDiagnostics: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<Diagnostic | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    diognosticsName: '',
    diognosticsDescription: '',
    diognosticsrating: '',
    diognosticsaddress: '',
  });
  
  const { toast } = useToast();

  const fetchDiagnostics = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Diagnostic[]>(`${BASE_URL}/api/diagnostics`);
      setDiagnostics(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch diagnostics',
        variant: 'destructive',
      });
      console.error('Error fetching diagnostics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiagnostics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectDiagnostic = (diagnostic: Diagnostic) => {
    setSelectedDiagnostic(diagnostic);
    setFormData({
      diognosticsName: diagnostic.diognosticsName,
      diognosticsDescription: diagnostic.diognosticsDescription,
      diognosticsrating: diagnostic.diognosticsrating,
      diognosticsaddress: diagnostic.diognosticsaddress,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDiagnostic) return;
    
    setLoading(true);
    try {
      await axios.put(`${BASE_URL}/api/diagnostics/update/${selectedDiagnostic.diognosticsId}`, formData);
      
      toast({
        title: 'Success',
        description: 'Diagnostic center updated successfully',
      });
      
      fetchDiagnostics();
      setSelectedDiagnostic(null);
      setFormData({ 
        diognosticsName: '', 
        diognosticsDescription: '', 
        diognosticsrating: '',
        diognosticsaddress: ''
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update diagnostic center',
        variant: 'destructive',
      });
      console.error('Error updating diagnostic center:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 ml-64 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Diagnostic Center</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Diagnostics List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Select a Diagnostic Center</h2>
            
            {loading && !selectedDiagnostic ? (
              <p>Loading diagnostic centers...</p>
            ) : diagnostics.length === 0 ? (
              <p className="text-gray-500">No diagnostic centers available.</p>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {diagnostics.map((diagnostic) => (
                  <div 
                    key={diagnostic.diognosticsId}
                    className={`p-4 border rounded-md cursor-pointer transition-all ${
                      selectedDiagnostic?.diognosticsId === diagnostic.diognosticsId 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'hover:border-gray-400'
                    }`}
                    onClick={() => handleSelectDiagnostic(diagnostic)}
                  >
                    <h3 className="font-medium text-lg">{diagnostic.diognosticsName}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{diagnostic.diognosticsDescription}</p>
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                      <span>Rating: {diagnostic.diognosticsrating}</span>
                      <span>{diagnostic.Status || 'Active'}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Edit Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              {selectedDiagnostic ? `Edit: ${selectedDiagnostic.diognosticsName}` : 'Select a diagnostic center to edit'}
            </h2>
            
            {selectedDiagnostic ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="diognosticsName">Name</Label>
                  <Input 
                    id="diognosticsName"
                    name="diognosticsName"
                    value={formData.diognosticsName}
                    onChange={handleInputChange}
                    className="mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="diognosticsDescription">Description</Label>
                  <Textarea 
                    id="diognosticsDescription"
                    name="diognosticsDescription"
                    value={formData.diognosticsDescription}
                    onChange={handleInputChange}
                    className="mt-1 min-h-[100px]"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="diognosticsrating">Rating</Label>
                  <Input 
                    id="diognosticsrating"
                    name="diognosticsrating"
                    type="text" 
                    value={formData.diognosticsrating}
                    onChange={handleInputChange}
                    className="mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="diognosticsaddress">Address</Label>
                  <Input 
                    id="diognosticsaddress"
                    name="diognosticsaddress"
                    value={formData.diognosticsaddress}
                    onChange={handleInputChange}
                    className="mt-1"
                    required
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => {
                      setSelectedDiagnostic(null);
                      setFormData({
                        diognosticsName: '',
                        diognosticsDescription: '',
                        diognosticsrating: '',
                        diognosticsaddress: ''
                      });
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                Please select a diagnostic center from the list to edit
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDiagnostics;
