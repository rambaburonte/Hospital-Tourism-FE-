// import { useState } from "react";
// import { FaPlayCircle, FaExternalLinkAlt } from "react-icons/fa";

// const playlist = [
//   { id: "1", title: "Zynlogic – Medical Travel & Patient Experience", doctor: "Zynlogic Healthcare Team", location: "India", date: "May 10, 2025", videoId: "_wAvp9E73Ac", thumbnail: "https://img.youtube.com/vi/_wAvp9E73Ac/hqdefault.jpg" },
//   { id: "2", title: "Mrs. Lakshmi's Recovery From High CO2 Levels", doctor: "Dr. Vivek Kumar Verma", location: "Dehradun", date: "May 1, 2025", videoId: "UOIgF9VPy8Y", thumbnail: "https://img.youtube.com/vi/UOIgF9VPy8Y/hqdefault.jpg" },
//   { id: "3", title: "Surgery for Ewing Sarcoma of Humerus", doctor: "Dr. Neeraj Godara", location: "Dwarka", date: "Apr 30, 2025", videoId: "NRCXdk-1pZg", thumbnail: "https://img.youtube.com/vi/NRCXdk-1pZg/hqdefault.jpg" },
//   { id: "4", title: "Advanced Spine Surgery Patient Testimonial", doctor: "Dr. Priya Sharma", location: "Hyderabad", date: "Apr 28, 2025", videoId: "jQIqmrvm_qo", thumbnail: "https://img.youtube.com/vi/jQIqmrvm_qo/hqdefault.jpg" },
//   { id: "5", title: "Knee Replacement Success Story", doctor: "Dr. Anil Mehta", location: "Mumbai", date: "Apr 26, 2025", videoId: "jvLea1g0NvU", thumbnail: "https://img.youtube.com/vi/jvLea1g0NvU/hqdefault.jpg" },
//   { id: "6", title: "Heart Valve Replacement – International Patient Review", doctor: "Dr. Ramesh Kumar", location: "Chennai", date: "Apr 24, 2025", videoId: "dQw4w9WgXcQ", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg" },
//   { id: "7", title: "Pediatric Liver Transplant Recovery Story", doctor: "Dr. Sneha Patil", location: "Pune", date: "Apr 22, 2025", videoId: "z8r92htR6I4", thumbnail: "https://img.youtube.com/vi/z8r92htR6I4/hqdefault.jpg" },
//   { id: "8", title: "Medical Travel from Kenya – Patient Experience", doctor: "Global Coordination Team", location: "Delhi NCR", date: "Apr 20, 2025", videoId: "6hc5bTzIvCM", thumbnail: "https://img.youtube.com/vi/6hc5bTzIvCM/hqdefault.jpg" },
//   { id: "9", title: "Hip Surgery Testimonial by Elderly Patient", doctor: "Dr. Manish Bajaj", location: "Bangalore", date: "Apr 18, 2025", videoId: "vlDzYIIOYmM", thumbnail: "https://img.youtube.com/vi/vlDzYIIOYmM/hqdefault.jpg" },
//   { id: "10", title: "International Patient – Breast Cancer Treatment Journey", doctor: "Dr. Nandita Iyer", location: "Kolkata", date: "Apr 15, 2025", videoId: "tgbNymZ7vqY", thumbnail: "https://img.youtube.com/vi/tgbNymZ7vqY/hqdefault.jpg" },
// ];

// const VideoSection = () => {
//   const [selectedVideo, setSelectedVideo] = useState(playlist[0]);

//   return (
//     <div className="bg-gradient-to-b from-[#f0f8e8] to-white py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl md:text-4xl font-bold text-[#3a7e10] mb-8 text-center relative">
//           Patient Success Stories
//           <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-1 w-16 bg-[#499E14] rounded"></span>
//         </h2>
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Main Video Player */}
//           <div className="flex-1 w-full">
//             <div className="rounded-xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-300 animate-fade-in">
//               <div className="aspect-video bg-black">
//                 <iframe
//                   className="w-full h-full"
//                   src={`https://www.youtube.com/embed/${selectedVideo.videoId}?rel=0`}
//                   title={selectedVideo.title}
//                   frameBorder="0"
//                   allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 />
//               </div>
//             </div>
//             <div className="mt-6">
//               <h3 className="text-2xl font-bold text-[#3a7e10] leading-tight line-clamp-2">
//                 {selectedVideo.title}
//               </h3>
//               <div className="flex flex-wrap items-center gap-2 mt-3 text-sm text-[#499E14]">
//                 <span>{selectedVideo.doctor}</span>
//                 <span className="text-[#7bc74a]">•</span>
//                 <span>{selectedVideo.location}</span>
//                 <span className="text-[#7bc74a]">•</span>
//                 <span>{selectedVideo.date}</span>
//               </div>
//               <div className="mt-4">
//                 <a
//                   href={`https://www.youtube.com/watch?v=${selectedVideo.videoId}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center gap-2 px-4 py-2 bg-[#e8f5df] text-[#3a7e10] hover:bg-[#d5ebc3] rounded-lg font-medium text-sm transition-colors"
//                   aria-label={`Watch ${selectedVideo.title} on YouTube`}
//                 >
//                   Watch on YouTube <FaExternalLinkAlt size={12} />
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* Playlist Sidebar */}
//           <div className="w-full lg:w-96 bg-white rounded-xl shadow-lg flex flex-col">
//             <div className="flex justify-between items-center sticky top-0 bg-gradient-to-r from-[#499E14] to-[#3a7e10] z-10 px-4 py-3 rounded-t-xl">
//               <h3 className="text-lg font-semibold text-white">More Patient Stories</h3>
//               <a
//                 href="/success-stories"
//                 className="text-white hover:text-[#e8f5df] text-sm flex items-center gap-1"
//                 aria-label="View all success stories"
//               >
//                 View all <FaExternalLinkAlt size={10} />
//               </a>
//             </div>
//             <div className="overflow-y-auto custom-scroll" style={{ maxHeight: 'calc(100vh - 300px)' }}>
//               {playlist.map((video, index) => (
//                 <div
//                   key={video.id}
//                   onClick={() => setSelectedVideo(video)}
//                   onKeyDown={(e) => e.key === "Enter" && setSelectedVideo(video)}
//                   tabIndex={0}
//                   role="button"
//                   aria-label={`Select video: ${video.title}`}
//                   aria-selected={selectedVideo.id === video.id}
//                   className={`flex gap-4 p-4 cursor-pointer transition-all duration-200 hover:bg-[#f0f8e8] ${
//                     selectedVideo.id === video.id ? "bg-[#e8f5df] border-l-4 border-[#499E14]" : ""
//                   } animate-fade-in`}
//                   style={{ animationDelay: `${index * 100}ms` }}
//                 >
//                   <div className="relative flex-shrink-0 w-24 h-14 rounded-md overflow-hidden">
//                     <img
//                       src={video.thumbnail}
//                       alt={video.title}
//                       className="w-full h-full object-cover"
//                     />
//                     <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-opacity hover:bg-opacity-20">
//                       <FaPlayCircle
//                         className="text-white opacity-90 hover:opacity-100 transition-opacity"
//                         size={18}
//                       />
//                     </div>
//                     {selectedVideo.id === video.id && (
//                       <div className="absolute top-1 left-1 bg-[#499E14] text-white text-xs font-semibold px-1.5 py-0.5 rounded">
//                         Playing
//                       </div>
//                     )}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h4 className="font-semibold text-sm leading-tight line-clamp-2 text-gray-800 hover:text-[#499E14] transition-colors">
//                       {video.title}
//                     </h4>
//                     <p className="text-xs text-gray-600 mt-1 truncate">
//                       {video.doctor}, {video.location}
//                     </p>
//                     <p className="text-xs text-gray-400 mt-1">{video.date}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       <style>{`
//         .custom-scroll {
//           scroll-behavior: smooth;
//         }
//         .custom-scroll::-webkit-scrollbar {
//           width: 6px;
//           height: 6px;
//         }
//         .custom-scroll::-webkit-scrollbar-track {
//           background: #f1f1f1;
//           border-radius: 10px;
//         }
//         .custom-scroll::-webkit-scrollbar-thumb {
//           background: #a3e635;
//           border-radius: 10px;
//         }
//         .custom-scroll::-webkit-scrollbar-thumb:hover {
//           background: #84cc16;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default VideoSection;













// import { useState, useRef } from "react";
// import { FaPlayCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// // Define interfaces for type safety
// interface Video {
//   id: string;
//   title: string;
//   doctor: string;
//   location: string;
//   videoId: string;
//   thumbnail: string;
// }

// interface NewsItem {
//   id: string;
//   title: string;
//   description: string;
//   thumbnail: string;
// }

// // Sample data
// const playlist: Video[] = [
//   { id: "1", title: "Hearing Aids", doctor: "Dr. Sandeep Dachuru", location: "Hyderabad", videoId: "_wAvp9E73Ac", thumbnail: "https://img.youtube.com/vi/_wAvp9E73Ac/hqdefault.jpg" },
//   { id: "2", title: "Advanced Spine Surgery", doctor: "Dr. Priya Sharma", location: "Hyderabad", videoId: "jQIqmrvm_qo", thumbnail: "https://img.youtube.com/vi/jQIqmrvm_qo/hqdefault.jpg" },
//   { id: "3", title: "Knee Replacement", doctor: "Dr. Anil Mehta", location: "Mumbai", videoId: "jvLea1g0NvU", thumbnail: "https://img.youtube.com/vi/jvLea1g0NvU/hqdefault.jpg" },
//   { id: "4", title: "Heart Valve Replacement", doctor: "Dr. Ramesh Kumar", location: "Chennai", videoId: "dQw4w9WgXcQ", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg" },
// ];

// const newsItems: NewsItem[] = [
//   { id: "1", title: "Free GI Cancer Camp", description: "Free GI Cancer Camp organized by KIMS-SUNSHINE Hospitals & Team Vidyartha Foundation", thumbnail: "https://via.placeholder.com/300x150?text=News+1" },
//   { id: "2", title: "Successful Spine Surgery", description: "Successful Spine Surgery performed at KIMS-SUNSHINE Hospitals", thumbnail: "https://via.placeholder.com/300x150?text=News+2" },
//   { id: "3", title: "Cardiac Care Workshop", description: "KIMS-SUNSHINE hosts workshop on advanced cardiac care techniques", thumbnail: "https://via.placeholder.com/300x150?text=News+3" },
//   { id: "4", title: "Orthopedic Health Camp", description: "Free orthopedic health camp for senior citizens at KIMS-SUNSHINE", thumbnail: "https://via.placeholder.com/300x150?text=News+4" },
// ];

// const VideoSection: React.FC = () => {
//   const [selectedVideo, setSelectedVideo] = useState<Video>(playlist[0]);
//   const [isPlaying, setIsPlaying] = useState<boolean>(false);
//   const [selectedNews, setSelectedNews] = useState<NewsItem>(newsItems[0]);
//   const videoCarouselRef = useRef<HTMLDivElement>(null);
//   const newsCarouselRef = useRef<HTMLDivElement>(null);

//   const handlePlay = () => {
//     setIsPlaying(true);
//     const iframe = document.querySelector<HTMLIFrameElement>(`#video-iframe-${selectedVideo.id}`);
//     if (iframe) {
//       iframe.src = `https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0`;
//     }
//   };

//   const handleVideoSelect = (video: Video) => {
//     setSelectedVideo(video);
//     setIsPlaying(false);
//     const iframe = document.querySelector<HTMLIFrameElement>(`#video-iframe-${video.id}`);
//     if (iframe) {
//       iframe.src = `https://www.youtube.com/embed/${video.videoId}?rel=0`;
//     }
//   };

//   const handleNewsSelect = (news: NewsItem) => {
//     setSelectedNews(news);
//   };

//   const scrollCarousel = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
//     if (ref.current) {
//       const scrollAmount = direction === "left" ? -180 : 180;
//       ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
//     }
//   };

//   const navigateMainVideo = (direction: "left" | "right") => {
//     const currentIndex = playlist.findIndex((video) => video.id === selectedVideo.id);
//     const newIndex = direction === "left" 
//       ? (currentIndex - 1 + playlist.length) % playlist.length 
//       : (currentIndex + 1) % playlist.length;
//     handleVideoSelect(playlist[newIndex]);
//   };

//   const navigateMainNews = (direction: "left" | "right") => {
//     const currentIndex = newsItems.findIndex((news) => news.id === selectedNews.id);
//     const newIndex = direction === "left" 
//       ? (currentIndex - 1 + newsItems.length) % newsItems.length 
//       : (currentIndex + 1) % newsItems.length;
//     handleNewsSelect(newsItems[newIndex]);
//   };

//   return (
//     <div className="py-8 px-4 w-full box-border overflow-x-hidden">
//       <div className="max-w-7xl mx-auto w-full box-border">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Video Section */}
//           <div className="lg:w-1/2 w-full">
//             <h2 className="text-xl font-bold mb-4 text-white">Videos</h2>
//             <div className="relative rounded-lg overflow-visible w-full bg-white/20 backdrop-blur-md border border-white/30">
//               <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
//                 <button
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-black p-3 rounded-full z-20 shadow-lg hover:bg-white"
//                   onClick={() => navigateMainVideo("left")}
//                   aria-label="Previous video"
//                 >
//                   <FaChevronLeft size={20} />
//                 </button>
//                 {!isPlaying && (
//                   <>
//                     <img
//                       src={selectedVideo.thumbnail}
//                       alt={selectedVideo.title}
//                       className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
//                     />
//                     <FaPlayCircle
//                       size={60}
//                       className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-600 cursor-pointer z-20"
//                       onClick={handlePlay}
//                     />
//                   </>
//                 )}
//                 <iframe
//                   id={`video-iframe-${selectedVideo.id}`}
//                   className="absolute top-0 left-0 w-full h-full"
//                   src={`https://www.youtube.com/embed/${selectedVideo.videoId}?rel=0`}
//                   title={selectedVideo.title}
//                   frameBorder="0"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 />
//                 <button
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-black p-3 rounded-full z-20 shadow-lg hover:bg-white"
//                   onClick={() => navigateMainVideo("right")}
//                   aria-label="Next video"
//                 >
//                   <FaChevronRight size={20} />
//                 </button>
//               </div>
//               <div className="relative mt-4 w-full px-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg">
//                 <button
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-black p-3 rounded-full z-20 shadow-lg hover:bg-white"
//                   onClick={() => scrollCarousel(videoCarouselRef, "left")}
//                   aria-label="Previous videos"
//                 >
//                   <FaChevronLeft size={20} />
//                 </button>
//                 <div
//                   ref={videoCarouselRef}
//                   className="flex space-x-4 overflow-x-auto p-4 overscroll-x-contain scrollbar-hide w-full touch-action-pan-x"
//                   style={{ 
//                     scrollBehavior: "smooth", 
//                     WebkitOverflowScrolling: "touch", 
//                     touchAction: "pan-x",
//                     scrollbarWidth: "none", /* Firefox */
//                     msOverflowStyle: "none" /* IE/Edge */
//                   }}
//                 >
//                   {playlist.map((video) => (
//                     <div
//                       key={video.id}
//                       onClick={() => handleVideoSelect(video)}
//                       onKeyDown={(e) => e.key === "Enter" && handleVideoSelect(video)}
//                       tabIndex={0}
//                       role="button"
//                       aria-label={`Select video: ${video.title}`}
//                       aria-selected={selectedVideo.id === video.id}
//                       className="min-w-[180px] bg-white/20 backdrop-blur-md border border-white/30 rounded-lg p-2 cursor-pointer"
//                     >
//                       <img src={video.thumbnail} alt={video.title} className="w-full h-24 object-cover rounded" />
//                       <div className="text-center mt-2 space-y-1">
//                         <p className="text-sm font-bold truncate text-white">{video.title}</p>
//                         <p className="text-xs truncate text-white/80">{video.doctor}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <button
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-black p-3 rounded-full z-20 shadow-lg hover:bg-white"
//                   onClick={() => scrollCarousel(videoCarouselRef, "right")}
//                   aria-label="Next videos"
//                 >
//                   <FaChevronRight size={20} />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* News Section */}
//           <div className="lg:w-1/2 w-full">
//             <h2 className="text-xl font-bold mb-4 text-white">Media / News</h2>
//             <div className="relative rounded-lg overflow-visible w-full bg-white/20 backdrop-blur-md border border-white/30">
//               <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
//                 <button
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-black p-3 rounded-full z-20 shadow-lg hover:bg-white"
//                   onClick={() => navigateMainNews("left")}
//                   aria-label="Previous news"
//                 >
//                   <FaChevronLeft size={20} />
//                 </button>
//                 <img
//                   src={selectedNews.thumbnail}
//                   alt={selectedNews.title}
//                   className="absolute top-0 left-0 w-full h-full object-cover"
//                 />
//                 <div className="absolute bottom-0 left-0 w-full bg-black/50 backdrop-blur-md p-4">
//                   <p className="text-white text-sm font-bold truncate">{selectedNews.title}</p>
//                   <p className="text-white text-xs truncate">{selectedNews.description}</p>
//                 </div>
//                 <button
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-black p-3 rounded-full z-20 shadow-lg hover:bg-white"
//                   onClick={() => navigateMainNews("right")}
//                   aria-label="Next news"
//                 >
//                   <FaChevronRight size={20} />
//                 </button>
//               </div>
//               <div className="relative mt-4 w-full px-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg">
//                 <button
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-black p-3 rounded-full z-20 shadow-lg hover:bg-white"
//                   onClick={() => scrollCarousel(newsCarouselRef, "left")}
//                   aria-label="Previous news items"
//                 >
//                   <FaChevronLeft size={20} />
//                 </button>
//                 <div
//                   ref={newsCarouselRef}
//                   className="flex space-x-4 overflow-x-auto p-4 overscroll-x-contain scrollbar-hide w-full touch-action-pan-x"
//                   style={{ 
//                     scrollBehavior: "smooth", 
//                     WebkitOverflowScrolling: "touch", 
//                     touchAction: "pan-x",
//                     scrollbarWidth: "none", /* Firefox */
//                     msOverflowStyle: "none" /* IE/Edge */
//                   }}
//                 >
//                   {newsItems.map((news) => (
//                     <div
//                       key={news.id}
//                       onClick={() => handleNewsSelect(news)}
//                       onKeyDown={(e) => e.key === "Enter" && handleNewsSelect(news)}
//                       tabIndex={0}
//                       role="button"
//                       aria-label={`Select news: ${news.title}`}
//                       aria-selected={selectedNews.id === news.id}
//                       className="min-w-[180px] bg-white/20 backdrop-blur-md border border-white/30 rounded-lg p-2 cursor-pointer"
//                     >
//                       <img
//                         src={news.thumbnail}
//                         alt={news.title}
//                         className="w-full h-24 object-cover rounded"
//                       />
//                       <div className="text-center mt-2 space-y-1">
//                         <p className="text-sm font-bold truncate text-white">{news.title}</p>
//                         <p className="text-xs truncate text-white/80">{news.description}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <button
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-black p-3 rounded-full z-20 shadow-lg hover:bg-white"
//                   onClick={() => scrollCarousel(newsCarouselRef, "right")}
//                   aria-label="Next news items"
//                 >
//                   <FaChevronRight size={20} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoSection;











import { useState, useRef } from "react";
import { FaPlayCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Define interfaces for type safety
interface Video {
  id: string;
  title: string;
  doctor: string;
  location: string;
  videoId: string;
  thumbnail: string;
}

interface NewsItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

// Sample data
const playlist: Video[] = [
  { id: "1", title: "Hearing Aids", doctor: "Dr. Sandeep Dachuru", location: "Hyderabad", videoId: "_wAvp9E73Ac", thumbnail: "https://img.youtube.com/vi/_wAvp9E73Ac/hqdefault.jpg" },
  { id: "2", title: "Advanced Spine Surgery", doctor: "Dr. Priya Sharma", location: "Hyderabad", videoId: "jQIqmrvm_qo", thumbnail: "https://img.youtube.com/vi/jQIqmrvm_qo/hqdefault.jpg" },
  { id: "3", title: "Knee Replacement", doctor: "Dr. Anil Mehta", location: "Mumbai", videoId: "jvLea1g0NvU", thumbnail: "https://img.youtube.com/vi/jvLea1g0NvU/hqdefault.jpg" },
  { id: "4", title: "Heart Valve Replacement", doctor: "Dr. Ramesh Kumar", location: "Chennai", videoId: "dQw4w9WgXcQ", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg" },
];

const newsItems: NewsItem[] = [
  { id: "1", title: "Free GI Cancer Camp", description: "Free GI Cancer Camp organized by KIMS-SUNSHINE Hospitals & Team Vidyartha Foundation", thumbnail: "https://via.placeholder.com/300x150?text=News+1" },
  { id: "2", title: "Successful Spine Surgery", description: "Successful Spine Surgery performed at KIMS-SUNSHINE Hospitals", thumbnail: "https://via.placeholder.com/300x150?text=News+2" },
  { id: "3", title: "Cardiac Care Workshop", description: "KIMS-SUNSHINE hosts workshop on advanced cardiac care techniques", thumbnail: "https://via.placeholder.com/300x150?text=News+3" },
  { id: "4", title: "Orthopedic Health Camp", description: "Free orthopedic health camp for senior citizens at KIMS-SUNSHINE", thumbnail: "https://via.placeholder.com/300x150?text=News+4" },
];

const VideoSection: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video>(playlist[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem>(newsItems[0]);
  const videoCarouselRef = useRef<HTMLDivElement>(null);
  const newsCarouselRef = useRef<HTMLDivElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    const iframe = document.querySelector<HTMLIFrameElement>(`#video-iframe-${selectedVideo.id}`);
    if (iframe) {
      iframe.src = `https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0`;
    }
  };

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
    setIsPlaying(false);
    const iframe = document.querySelector<HTMLIFrameElement>(`#video-iframe-${video.id}`);
    if (iframe) {
      iframe.src = `https://www.youtube.com/embed/${video.videoId}?rel=0`;
    }
  };

  const handleNewsSelect = (news: NewsItem) => {
    setSelectedNews(news);
  };

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -180 : 180;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const navigateMainVideo = (direction: "left" | "right") => {
    const currentIndex = playlist.findIndex((video) => video.id === selectedVideo.id);
    const newIndex = direction === "left" 
      ? (currentIndex - 1 + playlist.length) % playlist. length 
      : (currentIndex + 1) % playlist.length;
    handleVideoSelect(playlist[newIndex]);
  };

  const navigateMainNews = (direction: "left" | "right") => {
    const currentIndex = newsItems.findIndex((news) => news.id === selectedNews.id);
    const newIndex = direction === "left" 
      ? (currentIndex - 1 + newsItems.length) % newsItems.length 
      : (currentIndex + 1) % newsItems.length;
    handleNewsSelect(newsItems[newIndex]);
  };

  return (
    <div className="py-8 px-4 w-full box-border overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full box-border">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Video Section */}
          <div className="lg:w-1/2 w-full">
            <h2 className="text-xl font-bold mb-4 text-white">Videos</h2>
            <div className="relative rounded-lg overflow-visible w-full bg-white/20 backdrop-blur-md border border-white/30">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-black p-3 rounded-full z-20 shadow-lg hover:bg-white"
                  onClick={() => navigateMainVideo("left")}
                  aria-label="Previous video"
                >
                  <FaChevronLeft size={20} />
                </button>
                {!isPlaying && (
                  <>
                    <img
                      src={selectedVideo.thumbnail}
                      alt={selectedVideo.title}
                      className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
                    />
                    <FaPlayCircle
                      size={60}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-600 cursor-pointer z-20"
                      onClick={handlePlay}
                    />
                  </>
                )}
                <iframe
                  id={`video-iframe-${selectedVideo.id}`}
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}?rel=0`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-black p-3 rounded-full z-20 shadow-lg hover:bg-white"
                  onClick={() => navigateMainVideo("right")}
                  aria-label="Next video"
                >
                  <FaChevronRight size={20} />
                </button>
              </div>
              <div className="relative mt-4 w-full px-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg">
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-black p-3 rounded-full z-20 shadow-lg hover:bg-white"
                  onClick={() => scrollCarousel(videoCarouselRef, "left")}
                  aria-label="Previous videos"
                >
                  <FaChevronLeft size={20} />
                </button>
                <div
                  ref={videoCarouselRef}
                  className="flex space-x-4 overflow-x-auto p-4 overscroll-x-contain scrollbar-hide w-full touch-action-pan-x"
                  style={{ 
                    scrollBehavior: "smooth", 
                    WebkitOverflowScrolling: "touch", 
                    touchAction: "pan-x",
                    scrollbarWidth: "none", /* Firefox */
                    msOverflowStyle: "none" /* IE/Edge */
                  }}
                >
                  {playlist.map((video) => (
                    <div
                      key={video.id}
                      onClick={() => handleVideoSelect(video)}
                      onKeyDown={(e) => e.key === "Enter" && handleVideoSelect(video)}
                      tabIndex={0}
                      role="button"
                      aria-label={`Select video: ${video.title}`}
                      aria-selected={selectedVideo.id === video.id}
                      className="min-w-[180px] bg-white/20 backdrop-blur-md border border-white/30 rounded-lg p-2 cursor-pointer"
                    >
                      <img src={video.thumbnail} alt={video.title} className="w-full h-24 object-cover rounded" />
                      <div className="text-center mt-2 space-y-1">
                        <p className="text-sm font-bold truncate text-white">{video.title}</p>
                        <p className="text-xs truncate text-white/80">{video.doctor}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-black p-3 rounded-full z-20 shadow-lg hover:bg-white"
                  onClick={() => scrollCarousel(videoCarouselRef, "right")}
                  aria-label="Next videos"
                >
                  <FaChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* News Section */}
          <div className="lg:w-1/2 w-full pr-8">
            <h2 className="text-xl font-bold mb-4 text-white">Media / News</h2>
            <div className="relative rounded-lg overflow-visible w-full bg-white/20 backdrop-blur-md border border-white/30">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-black p-3 rounded-full z-20 shadow-lg hover:bg-white"
                  onClick={() => navigateMainNews("left")}
                  aria-label="Previous news"
                >
                  <FaChevronLeft size={20} />
                </button>
                <img
                  src={selectedNews.thumbnail}
                  alt={selectedNews.title}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full bg-black/50 backdrop-blur-md p-4">
                  <p className="text-white text-sm font-bold truncate">{selectedNews.title}</p>
                  <p className="text-white text-xs truncate">{selectedNews.description}</p>
                </div>
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-black p-3 rounded-full z-20 shadow-lg hover:bg-white"
                  onClick={() => navigateMainNews("right")}
                  aria-label="Next news"
                >
                  <FaChevronRight size={20} />
                </button>
              </div>
              <div className="relative mt-4 w-full px-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg">
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-black p-3 rounded-full z-20 shadow-lg hover:bg-white"
                  onClick={() => scrollCarousel(newsCarouselRef, "left")}
                  aria-label="Previous news items"
                >
                  <FaChevronLeft size={20} />
                </button>
                <div
                  ref={newsCarouselRef}
                  className="flex space-x-4 overflow-x-auto p-4 overscroll-x-contain scrollbar-hide w-full touch-action-pan-x"
                  style={{ 
                    scrollBehavior: "smooth", 
                    WebkitOverflowScrolling: "touch", 
                    touchAction: "pan-x",
                    scrollbarWidth: "none", /* Firefox */
                    msOverflowStyle: "none" /* IE/Edge */
                  }}
                >
                  {newsItems.map((news) => (
                    <div
                      key={news.id}
                      onClick={() => handleNewsSelect(news)}
                      onKeyDown={(e) => e.key === "Enter" && handleNewsSelect(news)}
                      tabIndex={0}
                      role="button"
                      aria-label={`Select news: ${news.title}`}
                      aria-selected={selectedNews.id === news.id}
                      className="min-w-[180px] bg-white/20 backdrop-blur-md border border-white/30 rounded-lg p-2 cursor-pointer"
                    >
                      <img
                        src={news.thumbnail}
                        alt={news.title}
                        className="w-full h-24 object-cover rounded"
                      />
                      <div className="text-center mt-2 space-y-1">
                        <p className="text-sm font-bold truncate text-white">{news.title}</p>
                        <p className="text-xs truncate text-white/80">{news.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-black p-3 rounded-full z-20 shadow-lg hover:bg-white"
                  onClick={() => scrollCarousel(newsCarouselRef, "right")}
                  aria-label="Next news items"
                >
                  <FaChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;