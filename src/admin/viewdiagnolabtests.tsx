import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './sidebar';
import { BASE_URL } from '@/config/config';
interface LabTest {
  id: number;
  testTitle: string;
  testDescription: string;
  testPrice: number;
  testDepartment: string;
  testImage: string;
}

const LabTests: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [labTests, setLabTests] = useState<LabTest[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(`${BASE_URL}/api/diagnostics/${id}`)
      .then(res => {
        setLabTests(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="flex min-h-screen">
      <div className="w-64">
        <Sidebar />
      </div>

      <div className="flex-1 bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Lab Tests</h2>

          {loading ? (
            <p className="text-gray-600">Loading tests...</p>
          ) : labTests.length === 0 ? (
            <p className="text-gray-600">No lab tests available for this diagnostics center.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {labTests.map(test => (
                <div key={test.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition">
                  <div>
                    <img
                      src={test.testImage}
                      alt={test.testTitle}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{test.testTitle}</h3>
                    <p className="text-gray-600 mb-1"><strong>Description:</strong> {test.testDescription}</p>
                    <p className="text-gray-600 mb-1"><strong>Department:</strong> {test.testDepartment}</p>
                    <p className="text-gray-800 font-bold text-lg mt-2">₹{test.testPrice}</p>
                  </div>

                  {/* <button
                    className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                    onClick={() => alert(`Booking ${test.testTitle}...`)}
                  >
                    Book Now
                  </button> */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LabTests;
