import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import AdminSidebar from '../components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface LabTest {
  testId: number;
  testTitle: string;
  testDescription: string;
  testPrice: number;
  testDepartment: string;
  testImage: string;
  status?: string;
}

const EditLabTests: React.FC = () => {
  const [labTests, setLabTests] = useState<LabTest[]>([]);
  const [selectedLabTest, setSelectedLabTest] = useState<LabTest | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    testTitle: '',
    testDescription: '',
    testPrice: 0,
    testDepartment: ''
  });
  
  const { toast } = useToast();

  const fetchLabTests = async () => {
    setLoading(true);
    try {
      const response = await axios.get<LabTest[]>(`${BASE_URL}/api/labtests`);
      setLabTests(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch lab tests',
        variant: 'destructive',
      });
      console.error('Error fetching lab tests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLabTests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectLabTest = (labTest: LabTest) => {
    setSelectedLabTest(labTest);
    setFormData({
      testTitle: labTest.testTitle,
      testDescription: labTest.testDescription,
      testPrice: labTest.testPrice,
      testDepartment: labTest.testDepartment
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'testPrice' ? parseFloat(value) || 0 : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLabTest) return;
    
    setLoading(true);
    try {
      await axios.put(`${BASE_URL}/api/labtests/update/${selectedLabTest.testId}`, formData);
      
      toast({
        title: 'Success',
        description: 'Lab test updated successfully',
      });
      
      fetchLabTests();
      setSelectedLabTest(null);
      setFormData({ 
        testTitle: '', 
        testDescription: '', 
        testPrice: 0,
        testDepartment: ''
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update lab test',
        variant: 'destructive',
      });
      console.error('Error updating lab test:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 ml-64 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Lab Test</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Lab Tests List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Select a Lab Test</h2>
            
            {loading && !selectedLabTest ? (
              <p>Loading lab tests...</p>
            ) : labTests.length === 0 ? (
              <p className="text-gray-500">No lab tests available.</p>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {labTests.map((labTest) => (
                  <div 
                    key={labTest.testId}
                    className={`p-4 border rounded-md cursor-pointer transition-all ${
                      selectedLabTest?.testId === labTest.testId 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'hover:border-gray-400'
                    }`}
                    onClick={() => handleSelectLabTest(labTest)}
                  >
                    <h3 className="font-medium text-lg">{labTest.testTitle}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{labTest.testDescription}</p>
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                      <span>Price: ${labTest.testPrice}</span>
                      <span>Department: {labTest.testDepartment}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Edit Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              {selectedLabTest ? `Edit: ${selectedLabTest.testTitle}` : 'Select a lab test to edit'}
            </h2>
            
            {selectedLabTest ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="testTitle">Title</Label>
                  <Input 
                    id="testTitle"
                    name="testTitle"
                    value={formData.testTitle}
                    onChange={handleInputChange}
                    className="mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="testDescription">Description</Label>
                  <Textarea 
                    id="testDescription"
                    name="testDescription"
                    value={formData.testDescription}
                    onChange={handleInputChange}
                    className="mt-1 min-h-[100px]"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="testPrice">Price ($)</Label>
                  <Input 
                    id="testPrice"
                    name="testPrice"
                    type="number" 
                    value={formData.testPrice}
                    onChange={handleInputChange}
                    className="mt-1"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="testDepartment">Department</Label>
                  <Input 
                    id="testDepartment"
                    name="testDepartment"
                    value={formData.testDepartment}
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
                      setSelectedLabTest(null);
                      setFormData({
                        testTitle: '',
                        testDescription: '',
                        testPrice: 0,
                        testDepartment: ''
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
                Please select a lab test from the list to edit
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLabTests;
