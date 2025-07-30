// import React, { useState, useEffect } from 'react';

// interface Testimonial {
//   id: number;
//   title: string;
//   description: string;
// }

// const DeleteTestimonials: React.FC = () => {
//   const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       try {
//         const response = await fetch('/api/testimonials');
//         if (response.ok) {
//           const data: Testimonial[] = await response.json();
//           setTestimonials(data);
//         } else {
//           setError('Failed to fetch testimonials.');
//         }
//       } catch (err) {
//         setError('An error occurred while fetching.');
//       }
//     };
//     fetchTestimonials();
//   }, []);

//   const handleDelete = async (id: number) => {
//     setError(null);
//     setSuccess(null);
//     try {
//       const response = await fetch(`/api/testimonials/${id}`, {
//         method: 'DELETE',
//       });
//       if (response.ok) {
//         setTestimonials(testimonials.filter((t) => t.id !== id));
//         setSuccess('Testimonial deleted successfully!');
//       } else {
//         setError('Failed to delete testimonial.');
//       }
//     } catch (err) {
//       setError('An error occurred while deleting.');
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Delete Testimonials</h1>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       {success && <p className="text-green-500 mb-4">{success}</p>}
//       {testimonials.length === 0 ? (
//         <p>No testimonials found.</p>
//       ) : (
//         <div className="space-y-4">
//           {testimonials.map((testimonial) => (
//             <div key={testimonial.id} className="border rounded-md p-4 bg-white shadow flex justify-between">
//               <div>
//                 <h2 className="text-xl font-semibold">{testimonial.title}</h2>
//                 <p className="text-gray-600">{testimonial.description}</p>
//               </div>
//               <button
//                 onClick={() => handleDelete(testimonial.id)}
//                 className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DeleteTestimonials;











import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import AdminSidebar from '../components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface Testimonial {
  id: number;
  title: string;
  description: string;
}

const DeleteTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Testimonial[]>(`${BASE_URL}/testimonials/all`);
      setTestimonials(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch testimonials',
        variant: 'destructive',
      });
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await axios.delete(`${BASE_URL}/testimonials/delete/${id}`);
      setTestimonials(testimonials.filter((t) => t.id !== id));
      toast({
        title: 'Success',
        description: 'Testimonial deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete testimonial',
        variant: 'destructive',
      });
      console.error('Error deleting testimonial:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 ml-64 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Delete Testimonials</h1>
        
        {loading && <p className="text-gray-500">Loading testimonials...</p>}
        
        {!loading && testimonials.length === 0 && (
          <p className="text-gray-500 text-center py-8">No testimonials found.</p>
        )}
        
        {!loading && testimonials.length > 0 && (
          <div className="grid grid-cols-1 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 flex justify-between items-center border border-gray-200"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{testimonial.title}</h2>
                  <p className="text-gray-600 mt-1">{testimonial.description.substring(0, 100)}...</p>
                </div>
                <Button
                  onClick={() => handleDelete(testimonial.id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteTestimonials;