// import React, { useState, ChangeEvent, FormEvent } from 'react';

// interface TestimonialForm {
//   title: string;
//   description: string;
//   hasVideo: boolean;
//   hasNewspaperClip: boolean;
//   videoFile: File | null;
//   newspaperFile: File | null;
// }

// const UploadTestimonials: React.FC = () => {
//   const [formData, setFormData] = useState<TestimonialForm>({
//     title: '',
//     description: '',
//     hasVideo: false,
//     hasNewspaperClip: false,
//     videoFile: null,
//     newspaperFile: null,
//   });
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);

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
//     setFormData({ ...formData, [name]: files ? files[0] : null });
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
//     if (formData.videoFile) data.append('videoFile', formData.videoFile);
//     if (formData.newspaperFile) data.append('newspaperFile', formData.newspaperFile);

//     try {
//       const response = await fetch('/api/testimonials', {
//         method: 'POST',
//         body: data,
//       });
//       if (response.ok) {
//         setSuccess('Testimonial uploaded successfully!');
//         setFormData({
//           title: '',
//           description: '',
//           hasVideo: false,
//           hasNewspaperClip: false,
//           videoFile: null,
//           newspaperFile: null,
//         });
//       } else {
//         setError('Failed to upload testimonial.');
//       }
//     } catch (err) {
//       setError('An error occurred while uploading.');
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Upload Testimonial</h1>
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
//           </div>
//         )}
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//         >
//           Upload
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UploadTestimonials;











import React, { useState, ChangeEvent, FormEvent } from 'react';

interface TestimonialForm {
  title: string;
  description: string;
  hasVideo: boolean;
  hasNewspaperClip: boolean;
  videoFile: File | null;
  newspaperFile: File | null;
}

const UploadTestimonials: React.FC = () => {
  const [formData, setFormData] = useState<TestimonialForm>({
    title: '',
    description: '',
    hasVideo: false,
    hasNewspaperClip: false,
    videoFile: null,
    newspaperFile: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : null });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('hasVideo', String(formData.hasVideo));
    data.append('hasNewspaperClip', String(formData.hasNewspaperClip));
    if (formData.videoFile) data.append('videoFile', formData.videoFile);
    if (formData.newspaperFile) data.append('newspaperFile', formData.newspaperFile);

    try {
      const response = await fetch('http://localhost:4545/testimonials/upload', {
        method: 'POST',
        body: data,
      });
      if (response.ok) {
        setSuccess('Testimonial uploaded successfully!');
        setFormData({
          title: '',
          description: '',
          hasVideo: false,
          hasNewspaperClip: false,
          videoFile: null,
          newspaperFile: null,
        });
      } else {
        setError('Failed to upload testimonial.');
      }
    } catch (err) {
      setError('An error occurred while uploading.');
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Upload Testimonial</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 block w-full border rounded-md p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full border rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="hasVideo"
              checked={formData.hasVideo}
              onChange={handleInputChange}
              className="mr-2"
            />
            Has Video
          </label>
        </div>
        {formData.hasVideo && (
          <div>
            <label htmlFor="videoFile" className="block text-sm font-medium">Video File</label>
            <input
              type="file"
              name="videoFile"
              id="videoFile"
              onChange={handleFileChange}
              className="mt-1 block w-full"
              accept="video/*"
            />
          </div>
        )}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="hasNewspaperClip"
              checked={formData.hasNewspaperClip}
              onChange={handleInputChange}
              className="mr-2"
            />
            Has Newspaper Clip
          </label>
        </div>
        {formData.hasNewspaperClip && (
          <div>
            <label htmlFor="newspaperFile" className="block text-sm font-medium">Newspaper File</label>
            <input
              type="file"
              name="newspaperFile"
              id="newspaperFile"
              onChange={handleFileChange}
              className="mt-1 block w-full"
              accept="image/*,application/pdf"
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadTestimonials;