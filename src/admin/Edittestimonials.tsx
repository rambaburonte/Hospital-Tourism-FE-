// import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
// import { useParams } from 'react-router-dom';

// interface Testimonial {
//   id: number;
//   title: string;
//   description: string;
//   hasVideo: boolean;
//   hasNewspaperClip: boolean;
//   videoFileName: string | null;
//   newspaperFileName: string | null;
// }

// const EditTestimonials: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [formData, setFormData] = useState<Testimonial>({
//     id: 0,
//     title: '',
//     description: '',
//     hasVideo: false,
//     hasNewspaperClip: false,
//     videoFileName: null,
//     newspaperFileName: null,
//   });
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);
//   const [videoFile, setVideoFile] = useState<File | null>(null);
//   const [newspaperFile, setNewspaperFile] = useState<File | null>(null);

//   useEffect(() => {
//     const fetchTestimonial = async () => {
//       try {
//         const response = await fetch(`/api/testimonials/${id}`);
//         if (response.ok) {
//           const data: Testimonial = await response.json();
//           setFormData(data);
//         } else {
//           setError('Failed to fetch testimonial.');
//         }
//       } catch (err) {
//         setError('An error occurred while fetching.');
//       }
//     };
//     fetchTestimonial();
//   }, [id]);

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value, type } = e.target;
//     if (type === 'checkbox') {
//       setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, files } = e.target;
//     if (name === 'videoFile') {
//       setVideoFile(files ? files[0] : null);
//     } else if (name === 'newspaperFile') {
//       setNewspaperFile(files ? files[0] : null);
//     }
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     const data = new FormData();
//     data.append('title', formData.title);
//     data.append('description', formData.description);
//     data.append('hasVideo', String(formData.hasVideo));
//     data.append('hasNewspaperClip', String(formData.hasNewspaperClip));
//     if (videoFile) data.append('videoFile', videoFile);
//     if (newspaperFile) data.append('newspaperFile', newspaperFile);

//     try {
//       const response = await fetch(`/api/testimonials/${id}`, {
//         method: 'PUT',
//         body: data,
//       });
//       if (response.ok) {
//         setSuccess('Testimonial updated successfully!');
//       } else {
//         setError('Failed to update testimonial.');
//       }
//     } catch (err) {
//       setError('An error occurred while updating.');
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Edit Testimonial</h1>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       {success && <p className="text-green-500 mb-4">{success}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="title" className="block text-sm font-medium">Title</label>
//           <input
//             type="text"
//             name="title"
//             id="title"
//             value={formData.title}
//             onChange={handleInputChange}
//             className="mt-1 block w-full border rounded-md p-2"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="description" className="block text-sm font-medium">Description</label>
//           <textarea
//             name="description"
//             id="description"
//             value={formData.description}
//             onChange={handleInputChange}
//             className="mt-1 block w-full border rounded-md p-2"
//             required
//           />
//         </div>
//         <div>
//           <label className="flex items-center">
//             <input
//               type="checkbox"
//               name="hasVideo"
//               checked={formData.hasVideo}
//               onChange={handleInputChange}
//               className="mr-2"
//             />
//             Has Video
//           </label>
//         </div>
//         {formData.hasVideo && (
//           <div>
//             <label htmlFor="videoFile" className="block text-sm font-medium">Video File</label>
//             <input
//               type="file"
//               name="videoFile"
//               id="videoFile"
//               onChange={handleFileChange}
//               className="mt-1 block w-full"
//               accept="video/*"
//             />
//             {formData.videoFileName && <p className="text-sm">Current: {formData.videoFileName}</p>}
//           </div>
//         )}
//         <div>
//           <label className="flex items-center">
//             <input
//               type="checkbox"
//               name="hasNewspaperClip"
//               checked={formData.hasNewspaperClip}
//               onChange={handleInputChange}
//               className="mr-2"
//             />
//             Has Newspaper Clip
//           </label>
//         </div>
//         {formData.hasNewspaperClip && (
//           <div>
//             <label htmlFor="newspaperFile" className="block text-sm font-medium">Newspaper File</label>
//             <input
//               type="file"
//               name="newspaperFile"
//               id="newspaperFile"
//               onChange={handleFileChange}
//               className="mt-1 block w-full"
//               accept="image/*,application/pdf"
//             />
//             {formData.newspaperFileName && <p className="text-sm">Current: {formData.newspaperFileName}</p>}
//           </div>
//         )}
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//         >
//           Update
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditTestimonials;












// import React, { useState, useEffect, ChangeEvent } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { useToast } from '@/components/ui/use-toast';
// import AdminSidebar from '../components/admin/AdminSidebar';
// import { BASE_URL } from '@/config/config';

// interface Testimonial {
//   id: number;
//   title: string;
//   description: string;
//   hasVideo: boolean;
//   hasNewspaperClip: boolean;
//   videoFileName: string | null;
//   newspaperFileName: string | null;
// }

// const EditTestimonials: React.FC = () => {
//   const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
//   const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     hasVideo: false,
//     hasNewspaperClip: false,
//     videoFile: null as File | null,
//     newspaperFile: null as File | null,
//   });
  
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const fetchTestimonials = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get<Testimonial[]>(`${BASE_URL}/testimonials/all`);
//       setTestimonials(response.data);
//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: 'Failed to fetch testimonials',
//         variant: 'destructive',
//       });
//       console.error('Error fetching testimonials:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTestimonials();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleSelectTestimonial = (testimonial: Testimonial) => {
//     setSelectedTestimonial(testimonial);
//     setFormData({
//       title: testimonial.title,
//       description: testimonial.description,
//       hasVideo: testimonial.hasVideo,
//       hasNewspaperClip: testimonial.hasNewspaperClip,
//       videoFile: null,
//       newspaperFile: null,
//     });
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value, type } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
//     }));
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, files } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: files ? files[0] : null,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedTestimonial) return;
    
//     setLoading(true);
//     try {
//       const data = new FormData();
//       data.append('title', formData.title);
//       data.append('description', formData.description);
//       data.append('hasVideo', String(formData.hasVideo));
//       data.append('hasNewspaperClip', String(formData.hasNewspaperClip));
//       if (formData.videoFile) data.append('videoFile', formData.videoFile);
//       if (formData.newspaperFile) data.append('newspaperFile', formData.newspaperFile);

//       await axios.put(`${BASE_URL}/testimonials/update/${selectedTestimonial.id}`, data);
      
//       toast({
//         title: 'Success',
//         description: 'Testimonial updated successfully',
//       });
      
//       fetchTestimonials();
//       setSelectedTestimonial(null);
//       setFormData({
//         title: '',
//         description: '',
//         hasVideo: false,
//         hasNewspaperClip: false,
//         videoFile: null,
//         newspaperFile: null,
//       });
//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: 'Failed to update testimonial',
//         variant: 'destructive',
//       });
//       console.error('Error updating testimonial:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <AdminSidebar />
//       <div className="flex-1 p-8 ml-64 overflow-y-auto">
//         <h1 className="text-3xl font-bold mb-6">Edit Testimonial</h1>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4">Select a Testimonial</h2>
            
//             {loading && <p>Loading testimonials...</p>}
            
//             {!loading && testimonials.length === 0 && (
//               <p className="text-gray-500">No testimonials available.</p>
//             )}
            
//             {!loading && testimonials.length > 0 && (
//               <div className="max-h-96 overflow-y-auto">
//                 {testimonials.map(testimonial => (
//                   <div 
//                     key={testimonial.id}
//                     className={`p-4 mb-2 border rounded-md cursor-pointer hover:bg-gray-50 ${
//                       selectedTestimonial?.id === testimonial.id ? 'bg-green-50 border-green-300' : ''
//                     }`}
//                     onClick={() => handleSelectTestimonial(testimonial)}
//                   >
//                     <p className="font-medium">{testimonial.title}</p>
//                     <p className="text-sm text-gray-600">{testimonial.description.substring(0, 50)}...</p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
          
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4">Edit Details</h2>
            
//             {!selectedTestimonial ? (
//               <p className="text-gray-500">Please select a testimonial to edit.</p>
//             ) : (
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="title">Title</Label>
//                   <Input
//                     id="title"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="description">Description</Label>
//                   <Textarea
//                     id="description"
//                     name="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label className="flex items-center">
//                     <Input
//                       type="checkbox"
//                       name="hasVideo"
//                       checked={formData.hasVideo}
//                       onChange={handleInputChange}
//                       className="mr-2"
//                     />
//                     Has Video
//                   </Label>
//                 </div>
                
//                 {formData.hasVideo && (
//                   <div className="space-y-2">
//                     <Label htmlFor="videoFile">Video File</Label>
//                     <Input
//                       type="file"
//                       id="videoFile"
//                       name="videoFile"
//                       onChange={handleFileChange}
//                       accept="video/*"
//                     />
//                     {selectedTestimonial.videoFileName && (
//                       <p className="text-sm">Current: {selectedTestimonial.videoFileName}</p>
//                     )}
//                   </div>
//                 )}
                
//                 <div className="space-y-2">
//                   <Label className="flex items-center">
//                     <Input
//                       type="checkbox"
//                       name="hasNewspaperClip"
//                       checked={formData.hasNewspaperClip}
//                       onChange={handleInputChange}
//                       className="mr-2"
//                     />
//                     Has Newspaper Clip
//                   </Label>
//                 </div>
                
//                 {formData.hasNewspaperClip && (
//                   <div className="space-y-2">
//                     <Label htmlFor="newspaperFile">Newspaper File</Label>
//                     <Input
//                       type="file"
//                       id="newspaperFile"
//                       name="newspaperFile"
//                       onChange={handleFileChange}
//                       accept="image/*,application/pdf"
//                     />
//                     {selectedTestimonial.newspaperFileName && (
//                       <p className="text-sm">Current: {selectedTestimonial.newspaperFileName}</p>
//                     )}
//                   </div>
//                 )}
                
//                 <div className="pt-4">
//                   <Button 
//                     type="submit"
//                     className="bg-green-600 hover:bg-green-700 mr-2"
//                     disabled={loading}
//                   >
//                     {loading ? 'Saving...' : 'Save Changes'}
//                   </Button>
                  
//                   <Button 
//                     type="button"
//                     variant="outline"
//                     onClick={() => {
//                       setSelectedTestimonial(null);
//                       setFormData({
//                         title: '',
//                         description: '',
//                         hasVideo: false,
//                         hasNewspaperClip: false,
//                         videoFile: null,
//                         newspaperFile: null,
//                       });
//                     }}
//                     disabled={loading}
//                   >
//                     Cancel
//                   </Button>
//                 </div>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditTestimonials;









import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import AdminSidebar from '../components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface Testimonial {
  id: number;
  title: string;
  description: string;
  hasVideo: boolean;
  hasNewspaperClip: boolean;
  videoFileName: string | null;
  newspaperFileName: string | null;
}

const EditTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    hasVideo: false,
    hasNewspaperClip: false,
    videoFile: null as File | null,
    newspaperFile: null as File | null,
  });
  
  const navigate = useNavigate();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectTestimonial = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setFormData({
      title: testimonial.title,
      description: testimonial.description,
      hasVideo: testimonial.hasVideo,
      hasNewspaperClip: testimonial.hasNewspaperClip,
      videoFile: null,
      newspaperFile: null,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTestimonial) return;
    
    setLoading(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('hasVideo', String(formData.hasVideo));
      data.append('hasNewspaperClip', String(formData.hasNewspaperClip));
      if (formData.videoFile) data.append('videoFile', formData.videoFile);
      if (formData.newspaperFile) data.append('newspaperFile', formData.newspaperFile);

      await axios.put(`${BASE_URL}/testimonials/update/${selectedTestimonial.id}`, data);
      
      toast({
        title: 'Success',
        description: 'Testimonial updated successfully',
      });
      
      fetchTestimonials();
      setSelectedTestimonial(null);
      setFormData({
        title: '',
        description: '',
        hasVideo: false,
        hasNewspaperClip: false,
        videoFile: null,
        newspaperFile: null,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update testimonial',
        variant: 'destructive',
      });
      console.error('Error updating testimonial:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 ml-64 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Testimonial</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Select a Testimonial</h2>
            
            {loading && <p className="text-gray-500">Loading testimonials...</p>}
            
            {!loading && testimonials.length === 0 && (
              <p className="text-gray-500">No testimonials available.</p>
            )}
            
            {!loading && testimonials.length > 0 && (
              <div className="max-h-96 overflow-y-auto">
                {testimonials.map(testimonial => (
                  <div 
                    key={testimonial.id}
                    className={`p-4 mb-2 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                      selectedTestimonial?.id === testimonial.id ? 'bg-green-50 border-green-300' : 'border-gray-200'
                    }`}
                    onClick={() => handleSelectTestimonial(testimonial)}
                  >
                    <p className="font-medium text-gray-800">{testimonial.title}</p>
                    <p className="text-sm text-gray-600">{testimonial.description.substring(0, 50)}...</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Testimonial Details</h2>
            
            {!selectedTestimonial ? (
              <p className="text-gray-500 text-center py-8">Please select a testimonial to edit.</p>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium text-gray-700">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-lg transition-all duration-200"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    className="border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-lg min-h-[120px] transition-all duration-200"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="flex items-center text-sm font-medium text-gray-700">
                    <Input
                      type="checkbox"
                      name="hasVideo"
                      checked={formData.hasVideo}
                      onChange={handleInputChange}
                      className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    Has Video
                  </Label>
                </div>
                
                {formData.hasVideo && (
                  <div className="space-y-2">
                    <Label htmlFor="videoFile" className="text-sm font-medium text-gray-700">Video File</Label>
                    <Input
                      type="file"
                      id="videoFile"
                      name="videoFile"
                      onChange={handleFileChange}
                      accept="video/*"
                      className="border-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition-all duration-200"
                    />
                    {selectedTestimonial.videoFileName && (
                      <p className="text-sm text-gray-600">Current: {selectedTestimonial.videoFileName}</p>
                    )}
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label className="flex items-center text-sm font-medium text-gray-700">
                    <Input
                      type="checkbox"
                      name="hasNewspaperClip"
                      checked={formData.hasNewspaperClip}
                      onChange={handleInputChange}
                      className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    Has Newspaper Clip
                  </Label>
                </div>
                
                {formData.hasNewspaperClip && (
                  <div className="space-y-2">
                    <Label htmlFor="newspaperFile" className="text-sm font-medium text-gray-700">Newspaper File</Label>
                    <Input
                      type="file"
                      id="newspaperFile"
                      name="newspaperFile"
                      onChange={handleFileChange}
                      accept="image/*,application/pdf"
                      className="border-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition-all duration-200"
                    />
                    {selectedTestimonial.newspaperFileName && (
                      <p className="text-sm text-gray-600">Current: {selectedTestimonial.newspaperFileName}</p>
                    )}
                  </div>
                )}
                
                <div className="pt-4 flex gap-4">
                  <Button 
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                  
                  <Button 
                    type="button"
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-100 font-medium py-2 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => {
                      setSelectedTestimonial(null);
                      setFormData({
                        title: '',
                        description: '',
                        hasVideo: false,
                        hasNewspaperClip: false,
                        videoFile: null,
                        newspaperFile: null,
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

export default EditTestimonials;