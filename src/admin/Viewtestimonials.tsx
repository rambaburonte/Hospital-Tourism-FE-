// import React, { useState, useEffect } from 'react';

// interface Testimonial {
//   id: number;
//   title: string;
//   description: string;
//   hasVideo: boolean;
//   hasNewspaperClip: boolean;
//   videoFileName: string | null;
//   newspaperFileName: string | null;
//   uploadedAt: string;
// }

// const ViewTestimonials: React.FC = () => {
//   const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
//   const [error, setError] = useState<string | null>(null);

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

//   return (
//     <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">View Testimonials</h1>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       {testimonials.length === 0 ? (
//         <p>No testimonials found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {testimonials.map((testimonial) => (
//             <div key={testimonial.id} className="border rounded-md p-4 bg-white shadow">
//               <h2 className="text-xl font-semibold">{testimonial.title}</h2>
//               <p className="text-gray-600">{testimonial.description}</p>
//               <p className="text-sm text-gray-500">Uploaded: {new Date(testimonial.uploadedAt).toLocaleDateString()}</p>
//               {testimonial.hasVideo && testimonial.videoFileName && (
//                 <p className="text-sm">Video: {testimonial.videoFileName}</p>
//               )}
//               {testimonial.hasNewspaperClip && testimonial.newspaperFileName && (
//                 <p className="text-sm">Newspaper: {testimonial.newspaperFileName}</p>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewTestimonials;










// import React, { useState, useEffect } from 'react';

// interface Testimonial {
//   id: number;
//   title: string;
//   description: string;
//   hasVideo: boolean;
//   hasNewspaperClip: boolean;
//   videoFileName: string | null;
//   newspaperFileName: string | null;
//   uploadedAt: string;
// }

// const ViewTestimonials: React.FC = () => {
//   const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       try {
//         const response = await fetch('http://localhost:4545/testimonials/all');
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

//   return (
//     <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">View Testimonials</h1>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       {testimonials.length === 0 ? (
//         <p>No testimonials found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {testimonials.map((testimonial) => (
//             <div key={testimonial.id} className="border rounded-md p-4 bg-white shadow">
//               <h2 className="text-xl font-semibold">{testimonial.title}</h2>
//               <p className="text-gray-600">{testimonial.description}</p>
//               <p className="text-sm text-gray-500">Uploaded: {new Date(testimonial.uploadedAt).toLocaleDateString()}</p>
//               {testimonial.hasVideo && testimonial.videoFileName && (
//                 <p className="text-sm">Video: {testimonial.videoFileName}</p>
//               )}
//               {testimonial.hasNewspaperClip && testimonial.newspaperFileName && (
//                 <p className="text-sm">Newspaper: {testimonial.newspaperFileName}</p>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewTestimonials;












// import React, { useState, useEffect } from 'react';

// interface Testimonial {
//   id: number;
//   title: string;
//   description: string;
//   hasVideo: boolean;
//   hasNewspaperClip: boolean;
//   videoFileName: string | null;
//   newspaperFileName: string | null;
//   uploadedAt: string;
// }

// const ViewTestimonials: React.FC = () => {
//   const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [activeMedia, setActiveMedia] = useState<{ id: number; type: 'video' | 'image' } | null>(null);

//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       try {
//         const response = await fetch('http://localhost:4545/testimonials/all');
//         if (response.ok) {
//           const data: Testimonial[] = await response.json();
//           // Sort testimonials: video testimonials first, then others
//           const sortedData = data.sort((a, b) => {
//             if (a.hasVideo && !b.hasVideo) return -1;
//             if (!a.hasVideo && b.hasVideo) return 1;
//             return 0;
//           });
//           setTestimonials(sortedData);
//         } else {
//           setError('Failed to fetch testimonials.');
//         }
//       } catch (err) {
//         setError('An error occurred while fetching.');
//       }
//     };

//     fetchTestimonials();
//   }, []);

//   const handleMediaClick = (id: number, type: 'video' | 'image') => {
//     setActiveMedia({ id, type });
//   };

//   const closeModal = () => {
//     setActiveMedia(null);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Testimonials</h1>
//       {error && (
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
//           {error}
//         </div>
//       )}
//       {testimonials.length === 0 ? (
//         <p className="text-center text-gray-600 text-lg">No testimonials found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {testimonials.map((testimonial) => (
//             <div
//               key={testimonial.id}
//               className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
//             >
//               <div className="p-6 flex flex-col">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-2">{testimonial.title}</h2>
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {testimonial.hasVideo && testimonial.videoFileName && (
//                     <button
//                       onClick={() => handleMediaClick(testimonial.id, 'video')}
//                       className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors"
//                     >
//                       <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.2A1 1 0 0010 9.8v4.4a1 1 0 001.555.832l3.197-2.2a1 1 0 000-1.664z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                       Watch Video
//                     </button>
//                   )}
//                   {testimonial.hasNewspaperClip && testimonial.newspaperFileName && (
//                     <button
//                       onClick={() => handleMediaClick(testimonial.id, 'image')}
//                       className="inline-flex items-center px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-full hover:bg-green-700 transition-colors"
//                     >
//                       <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                       </svg>
//                       View Newspaper
//                     </button>
//                   )}
//                 </div>
//                 <p className="text-gray-600 mb-4 line-clamp-3">{testimonial.description}</p>
//                 <p className="text-sm text-gray-500">
//                   Uploaded: {new Date(testimonial.uploadedAt).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {activeMedia && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl p-6 max-w-3xl w-full relative">
//             <button
//               onClick={closeModal}
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//             {activeMedia.type === 'video' && (
//               (() => {
//                 const testimonial = testimonials.find(t => t.id === activeMedia.id);
//                 if (!testimonial || !testimonial.videoFileName) {
//                   return <p className="text-red-600">Video not available.</p>;
//                 }
//                 console.log('Video URL:', `http://localhost:4545/testimonials/video/${testimonial.videoFileName}`);
//                 return (
//                   <video controls className="w-full rounded-md">
//                     <source
//                       src={`http://localhost:4545/testimonials/video/${testimonial.videoFileName}`}
//                       type="video/mp4"
//                     />
//                     Your browser does not support the video tag.
//                   </video>
//                 );
//               })()
//             )}
//             {activeMedia.type === 'image' && (
//               (() => {
//                 const testimonial = testimonials.find(t => t.id === activeMedia.id);
//                 if (!testimonial || !testimonial.newspaperFileName) {
//                   return <p className="text-red-600">Image not available.</p>;
//                 }
//                 return (
//                   <img
//                     className="w-full rounded-md"
//                     src={`http://localhost:4545/testimonials/newspaper/${testimonial.newspaperFileName}`}
//                     alt="Newspaper clipping"
//                   />
//                 );
//               })()
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewTestimonials;










import React, { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  title: string;
  description: string;
  hasVideo: boolean;
  hasNewspaperClip: boolean;
  videoData: string | null; // Base64 string (e.g., data:video/mp4;base64,...) or URL
  newspaperData: string | null; // Base64 string (e.g., data:image/jpeg;base64,...) or URL
  uploadedAt: string;
}

const ViewTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeMedia, setActiveMedia] = useState<{ id: number; type: 'video' | 'image' } | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('http://localhost:4545/testimonials/all');
        if (response.ok) {
          const data: Testimonial[] = await response.json();
          // Sort testimonials: video testimonials first, then others
          const sortedData = data.sort((a, b) => {
            if (a.hasVideo && !b.hasVideo) return -1;
            if (!a.hasVideo && b.hasVideo) return 1;
            return 0;
          });
          setTestimonials(sortedData);
        } else {
          setError('Failed to fetch testimonials.');
        }
      } catch (err) {
        setError('An error occurred while fetching.');
      }
    };

    fetchTestimonials();
  }, []);

  const handleMediaClick = (id: number, type: 'video' | 'image') => {
    setActiveMedia({ id, type });
  };

  const closeModal = () => {
    setActiveMedia(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Testimonials</h1>
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
          {error}
        </div>
      )}
      {testimonials.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No testimonials found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
            >
              <div className="p-6 flex flex-col">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{testimonial.title}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {testimonial.hasVideo && testimonial.videoData && (
                    <button
                      onClick={() => handleMediaClick(testimonial.id, 'video')}
                      className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.2A1 1 0 0010 9.8v4.4a1 1 0 001.555.832l3.197-2.2a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Watch Video
                    </button>
                  )}
                  {testimonial.hasNewspaperClip && testimonial.newspaperData && (
                    <button
                      onClick={() => handleMediaClick(testimonial.id, 'image')}
                      className="inline-flex items-center px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-full hover:bg-green-700 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      View Newspaper
                    </button>
                  )}
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">{testimonial.description}</p>
                <p className="text-sm text-gray-500">
                  Uploaded: {new Date(testimonial.uploadedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-3xl w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {activeMedia.type === 'video' && (
              (() => {
                const testimonial = testimonials.find(t => t.id === activeMedia.id);
                if (!testimonial || !testimonial.videoData) {
                  return <p className="text-red-600">Video not available.</p>;
                }
                console.log('Video Data:', testimonial.videoData);
                return (
                  <video controls className="w-full rounded-md">
                    <source src={testimonial.videoData} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                );
              })()
            )}
            {activeMedia.type === 'image' && (
              (() => {
                const testimonial = testimonials.find(t => t.id === activeMedia.id);
                if (!testimonial || !testimonial.newspaperData) {
                  return <p className="text-red-600">Image not available.</p>;
                }
                return (
                  <img
                    className="w-full rounded-md"
                    src={testimonial.newspaperData}
                    alt="Newspaper clipping"
                  />
                );
              })()
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTestimonials;