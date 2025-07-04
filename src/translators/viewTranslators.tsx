import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';
interface Translator {
  translatorID: number;
  translatorName: string;
  translatorDescription: string;
  translatorImage: string;
  translatorRating: string;
  translatorLanguages: string;
  status?: string;
  price?: number;
  translatorAddress?: string;
  translatorLocIdInteger?: number;
}

const TranslatorList: React.FC = () => {
  const [translators, setTranslators] = useState<Translator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTranslators = async () => {
      try {
        console.log('Fetching translators from:', `${BASE_URL}/api/translators/getAll/traslators`);
        const res = await axios.get(`${BASE_URL}/api/translators/getAll/traslators`);
        console.log('Translators response:', res.data);
        setTranslators(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching translators:', err);
        if (axios.isAxiosError(err)) {
          console.error('Error response:', err.response?.data);
          console.error('Error status:', err.response?.status);
        }
        setLoading(false);
      }
    };

    fetchTranslators();
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 w-full bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Translators</h2>

          {loading ? (
            <p className="text-gray-600">Loading translators...</p>
          ) : translators.length === 0 ? (
            <p className="text-gray-600">No translators available.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {translators.map(translator => (
                <div
                  key={translator.translatorID}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <img
                    src={translator.translatorImage}
                    alt={translator.translatorName}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{translator.translatorName}</h3>
                  <p className="text-xs text-blue-600 mb-2">ID: {translator.translatorID}</p>
                  <p className="text-gray-600 mb-2">{translator.translatorDescription}</p>
                  <p className="text-gray-600 mb-2"><strong>Languages:</strong> {translator.translatorLanguages}</p>
                  {translator.price && (
                    <p className="text-gray-600 mb-2"><strong>Price:</strong> ${translator.price}</p>
                  )}
                  {translator.translatorAddress && (
                    <p className="text-gray-600 mb-2"><strong>Address:</strong> {translator.translatorAddress}</p>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-gray-700 font-medium">{translator.translatorRating}</span>
                    </div>
                    {translator.status && (
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        translator.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : translator.status === 'inactive'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {translator.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranslatorList;
