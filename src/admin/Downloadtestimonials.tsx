// import React, { useState, useEffect } from 'react';

// interface Testimonial {
//   id: number;
//   title: string;
//   videoFileName: string | null;
//   newspaperFileName: string | null;
// }

// const DownloadTestimonials: React.FC = () => {
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

//   const handleDownload = async (id: number, fileType: 'video' | 'newspaper') => {
//     try {
//       const response = await fetch(`/api/testimonials/${id}/${fileType}`);
//       if (response.ok) {
//         const blob = await response.blob();
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = fileType === 'video' ? 'video' : 'newspaper';
//         document.body.appendChild(a);
//         a.click();
//         a.remove();
//         window.URL.revokeObjectURL(url);
//       } else {
//         setError(`Failed to download ${fileType}.`);
//       }
//     } catch (err) {
//       setError('An error occurred while downloading.');
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Download Testimonials</h1>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       {testimonials.length === 0 ? (
//         <p>No testimonials found.</p>
//       ) : (
//         <div className="space-y-4">
//           {testimonials.map((testimonial) => (
//             <div key={testimonial.id} className="border rounded-md p-4 bg-white shadow">
//               <h2 className="text-xl font-semibold">{testimonial.title}</h2>
//               <div className="flex space-x-4 mt-2">
//                 {testimonial.videoFileName && (
//                   <button
//                     onClick={() => handleDownload(testimonial.id, 'video')}
//                     className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
//                   >
//                     Download Video
//                   </button>
//                 )}
//                 {testimonial.newspaperFileName && (
//                   <button
//                     onClick={() => handleDownload(testimonial.id, 'newspaper')}
//                     className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
//                   >
//                     Download Newspaper
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DownloadTestimonials;










// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
// import { useToast } from '@/components/ui/use-toast';
// import AdminSidebar from '../components/admin/AdminSidebar';
// import { BASE_URL } from '@/config/config';

// interface Testimonial {
//   id: number;
//   title: string;
//   videoFileName: string | null;
//   newspaperFileName: string | null;
// }

// const DownloadTestimonials: React.FC = () => {
//   const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
//   const [selectedTestimonials, setSelectedTestimonials] = useState<number[]>([]);
//   const [loading, setLoading] = useState(false);
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
//   }, []);

//   const handleSelectTestimonial = (id: number) => {
//     setSelectedTestimonials((prev) =>
//       prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]
//     );
//   };

//   const handleSelectAll = () => {
//     if (selectedTestimonials.length === testimonials.length) {
//       setSelectedTestimonials([]);
//     } else {
//       setSelectedTestimonials(testimonials.map((t) => t.id));
//     }
//   };

//   const handleDownload = async (id: number, videoFileName: string | null) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${BASE_URL}/testimonials/video/${id}`, {
//         responseType: 'blob',
//       });
//       const blob = response.data;
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = videoFileName || `testimonial-video-${id}.mp4`; // Fallback filename
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       window.URL.revokeObjectURL(url);
//       toast({
//         title: 'Success',
//         description: `Downloaded ${videoFileName || 'video'}`,
//       });
//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: 'Failed to download video',
//         variant: 'destructive',
//       });
//       console.error('Error downloading video:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDownloadSelected = async () => {
//     if (selectedTestimonials.length === 0) {
//       toast({
//         title: 'Error',
//         description: 'Please select at least one testimonial',
//         variant: 'destructive',
//       });
//       return;
//     }

//     setLoading(true);
//     for (const id of selectedTestimonials) {
//       const testimonial = testimonials.find((t) => t.id === id);
//       if (testimonial && testimonial.videoFileName) {
//         await handleDownload(id, testimonial.videoFileName);
//       }
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="flex h-screen">
//       <AdminSidebar />
//       <div className="flex-1 p-8 ml-64 overflow-y-auto">
//         <h1 className="text-3xl font-bold mb-6 text-gray-800">Download Testimonials</h1>

//         {loading && <p className="text-gray-500">Loading testimonials...</p>}

//         {!loading && testimonials.length === 0 && (
//           <p className="text-gray-500 text-center py-8">No testimonials found.</p>
//         )}

//         {!loading && testimonials.length > 0 && (
//           <div className="space-y-6">
//             <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-lg">
//               <div className="flex items-center space-x-2">
//                 <Checkbox
//                   checked={selectedTestimonials.length === testimonials.length}
//                   onCheckedChange={handleSelectAll}
//                   id="select-all"
//                   className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor="select-all" className="text-sm font-medium text-gray-700">
//                   Select All
//                 </label>
//               </div>
//               <Button
//                 onClick={handleDownloadSelected}
//                 className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                 disabled={loading || selectedTestimonials.length === 0}
//               >
//                 {loading ? 'Downloading...' : 'Download Selected Videos'}
//               </Button>
//             </div>

//             <div className="grid grid-cols-1 gap-6">
//               {testimonials.map((testimonial) => (
//                 <div
//                   key={testimonial.id}
//                   className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 flex items-center justify-between border border-gray-200"
//                 >
//                   <div className="flex items-center space-x-4">
//                     <Checkbox
//                       checked={selectedTestimonials.includes(testimonial.id)}
//                       onCheckedChange={() => handleSelectTestimonial(testimonial.id)}
//                       id={`testimonial-${testimonial.id}`}
//                       className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
//                     />
//                     <div>
//                       <h2 className="text-xl font-semibold text-gray-800">{testimonial.title}</h2>
//                       {testimonial.videoFileName ? (
//                         <p className="text-sm text-gray-600">Video: {testimonial.videoFileName}</p>
//                       ) : (
//                         <p className="text-sm text-gray-600">No video available</p>
//                       )}
//                       {testimonial.newspaperFileName && (
//                         <p className="text-sm text-gray-600">Newspaper: {testimonial.newspaperFileName}</p>
//                       )}
//                     </div>
//                   </div>
//                   {testimonial.videoFileName && (
//                     <Button
//                       onClick={() => handleDownload(testimonial.id, testimonial.videoFileName)}
//                       className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                       disabled={loading}
//                     >
//                       Download Video
//                     </Button>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DownloadTestimonials;










import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import AdminSidebar from '../components/admin/AdminSidebar';
import { BASE_URL } from '@/config/config';

interface Testimonial {
  id: number;
  title: string;
  videoFileName: string | null;
  newspaperFileName: string | null;
}

const DownloadTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [selectedVideos, setSelectedVideos] = useState<number[]>([]);
  const [selectedNewspapers, setSelectedNewspapers] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [videoUrls, setVideoUrls] = useState<{ [key: number]: string }>({});
  const [newspaperUrls, setNewspaperUrls] = useState<{ [key: number]: string }>({});
  const { toast } = useToast();

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Testimonial[]>(`${BASE_URL}/testimonials/all`);
      setTestimonials(response.data);

      // Fetch video previews
      const videoPromises = response.data
        .filter((t) => t.videoFileName)
        .map(async (t) => {
          try {
            const res = await axios.get(`${BASE_URL}/testimonials/video/${t.id}`, {
              responseType: 'blob',
            });
            return { id: t.id, url: window.URL.createObjectURL(res.data) };
          } catch (error) {
            console.error(`Error fetching video for testimonial ${t.id}:`, error);
            return null;
          }
        });

      // Fetch newspaper previews
      const newspaperPromises = response.data
        .filter((t) => t.newspaperFileName)
        .map(async (t) => {
          try {
            const res = await axios.get(`${BASE_URL}/testimonials/newspaper/${t.id}`, {
              responseType: 'blob',
            });
            return { id: t.id, url: window.URL.createObjectURL(res.data) };
          } catch (error) {
            console.error(`Error fetching newspaper for testimonial ${t.id}:`, error);
            return null;
          }
        });

      const videoResults = (await Promise.all(videoPromises)).filter((r) => r !== null) as {
        id: number;
        url: string;
      }[];
      const newspaperResults = (await Promise.all(newspaperPromises)).filter((r) => r !== null) as {
        id: number;
        url: string;
      }[];

      setVideoUrls(
        videoResults.reduce((acc, { id, url }) => ({ ...acc, [id]: url }), {}),
      );
      setNewspaperUrls(
        newspaperResults.reduce((acc, { id, url }) => ({ ...acc, [id]: url }), {}),
      );
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
    return () => {
      // Clean up URLs to prevent memory leaks
      Object.values(videoUrls).forEach((url) => window.URL.revokeObjectURL(url));
      Object.values(newspaperUrls).forEach((url) => window.URL.revokeObjectURL(url));
    };
  }, []);

  const handleSelectVideo = (id: number) => {
    setSelectedVideos((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]
    );
  };

  const handleSelectNewspaper = (id: number) => {
    setSelectedNewspapers((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]
    );
  };

  const handleSelectAllVideos = () => {
    if (selectedVideos.length === testimonials.filter((t) => t.videoFileName).length) {
      setSelectedVideos([]);
    } else {
      setSelectedVideos(testimonials.filter((t) => t.videoFileName).map((t) => t.id));
    }
  };

  const handleSelectAllNewspapers = () => {
    if (selectedNewspapers.length === testimonials.filter((t) => t.newspaperFileName).length) {
      setSelectedNewspapers([]);
    } else {
      setSelectedNewspapers(testimonials.filter((t) => t.newspaperFileName).map((t) => t.id));
    }
  };

  const handleDownload = async (id: number, fileType: 'video' | 'newspaper', fileName: string | null) => {
    setLoading(true);
    try {
      const endpoint =
        fileType === 'video'
          ? `${BASE_URL}/testimonials/video/${id}`
          : `${BASE_URL}/testimonials/newspaper/${id}`;
      const response = await axios.get(endpoint, { responseType: 'blob' });
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download =
        fileType === 'video'
          ? fileName || `testimonial-video-${id}.mp4`
          : fileName || `testimonial-newspaper-${id}.jpg`; // Adjust extension if newspapers are PDFs
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast({
        title: 'Success',
        description: `Downloaded ${fileType}`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to download ${fileType}`,
        variant: 'destructive',
      });
      console.error(`Error downloading ${fileType}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadSelected = async () => {
    if (selectedVideos.length === 0 && selectedNewspapers.length === 0) {
      toast({
        title: 'Error',
        description: 'Please select at least one video or newspaper',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    for (const id of selectedVideos) {
      const testimonial = testimonials.find((t) => t.id === id);
      if (testimonial && testimonial.videoFileName) {
        await handleDownload(id, 'video', testimonial.videoFileName);
      }
    }
    for (const id of selectedNewspapers) {
      const testimonial = testimonials.find((t) => t.id === id);
      if (testimonial && testimonial.newspaperFileName) {
        await handleDownload(id, 'newspaper', testimonial.newspaperFileName);
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 ml-64 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Download Testimonials</h1>

        {loading && <p className="text-gray-500">Loading testimonials...</p>}

        {!loading && testimonials.length === 0 && (
          <p className="text-gray-500 text-center py-8">No testimonials found.</p>
        )}

        {!loading && testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Videos Section */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedVideos.length === testimonials.filter((t) => t.videoFileName).length}
                    onCheckedChange={handleSelectAllVideos}
                    id="select-all-videos"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="select-all-videos" className="text-sm font-medium text-gray-700">
                    Select All Videos
                  </label>
                </div>
                <Button
                  onClick={handleDownloadSelected}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading || (selectedVideos.length === 0 && selectedNewspapers.length === 0)}
                >
                  {loading ? 'Downloading...' : 'Download Selected Files'}
                </Button>
              </div>
              <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                {testimonials
                  .filter((t) => t.videoFileName)
                  .map((testimonial) => (
                    <div
                      key={`video-${testimonial.id}`}
                      className="flex items-center space-x-3 p-3 border rounded-md hover:bg-gray-50 transition-colors duration-200"
                    >
                      <Checkbox
                        checked={selectedVideos.includes(testimonial.id)}
                        onCheckedChange={() => handleSelectVideo(testimonial.id)}
                        id={`video-${testimonial.id}`}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      {videoUrls[testimonial.id] && (
                        <video
                          src={videoUrls[testimonial.id]}
                          controls
                          className="w-20 h-[50px] object-cover rounded-md"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-800 truncate">{testimonial.title}</h3>
                      </div>
                      <Button
                        onClick={() => handleDownload(testimonial.id, 'video', testimonial.videoFileName)}
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-1 px-2 text-sm rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                      >
                        Download
                      </Button>
                    </div>
                  ))}
                {testimonials.filter((t) => t.videoFileName).length === 0 && (
                  <p className="text-gray-500 text-center py-4">No videos available.</p>
                )}
              </div>
            </div>

            {/* Newspapers Section */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedNewspapers.length === testimonials.filter((t) => t.newspaperFileName).length}
                    onCheckedChange={handleSelectAllNewspapers}
                    id="select-all-newspapers"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="select-all-newspapers" className="text-sm font-medium text-gray-700">
                    Select All Newspapers
                  </label>
                </div>
              </div>
              <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                {testimonials
                  .filter((t) => t.newspaperFileName)
                  .map((testimonial) => (
                    <div
                      key={`newspaper-${testimonial.id}`}
                      className="flex items-center space-x-3 p-3 border rounded-md hover:bg-gray-50 transition-colors duration-200"
                    >
                      <Checkbox
                        checked={selectedNewspapers.includes(testimonial.id)}
                        onCheckedChange={() => handleSelectNewspaper(testimonial.id)}
                        id={`newspaper-${testimonial.id}`}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      {newspaperUrls[testimonial.id] && (
                        <img
                          src={newspaperUrls[testimonial.id]}
                          alt="Newspaper preview"
                          className="w-20 h-[50px] object-cover rounded-md"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-800 truncate">{testimonial.title}</h3>
                      </div>
                      <Button
                        onClick={() => handleDownload(testimonial.id, 'newspaper', testimonial.newspaperFileName)}
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-1 px-2 text-sm rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                      >
                        Download
                      </Button>
                    </div>
                  ))}
                {testimonials.filter((t) => t.newspaperFileName).length === 0 && (
                  <p className="text-gray-500 text-center py-4">No newspapers available.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadTestimonials;