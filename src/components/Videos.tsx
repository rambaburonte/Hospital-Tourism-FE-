import { useState } from "react";
import { FaPlayCircle, FaExternalLinkAlt } from "react-icons/fa";

const playlist = [
  { id: "1", title: "Zynlogic – Medical Travel & Patient Experience", doctor: "Zynlogic Healthcare Team", location: "India", date: "May 10, 2025", videoId: "_wAvp9E73Ac", thumbnail: "https://img.youtube.com/vi/_wAvp9E73Ac/hqdefault.jpg" },
  { id: "2", title: "Mrs. Lakshmi's Recovery From High CO2 Levels", doctor: "Dr. Vivek Kumar Verma", location: "Dehradun", date: "May 1, 2025", videoId: "UOIgF9VPy8Y", thumbnail: "https://img.youtube.com/vi/UOIgF9VPy8Y/hqdefault.jpg" },
  { id: "3", title: "Surgery for Ewing Sarcoma of Humerus", doctor: "Dr. Neeraj Godara", location: "Dwarka", date: "Apr 30, 2025", videoId: "NRCXdk-1pZg", thumbnail: "https://img.youtube.com/vi/NRCXdk-1pZg/hqdefault.jpg" },
  { id: "4", title: "Advanced Spine Surgery Patient Testimonial", doctor: "Dr. Priya Sharma", location: "Hyderabad", date: "Apr 28, 2025", videoId: "jQIqmrvm_qo", thumbnail: "https://img.youtube.com/vi/jQIqmrvm_qo/hqdefault.jpg" },
  { id: "5", title: "Knee Replacement Success Story", doctor: "Dr. Anil Mehta", location: "Mumbai", date: "Apr 26, 2025", videoId: "jvLea1g0NvU", thumbnail: "https://img.youtube.com/vi/jvLea1g0NvU/hqdefault.jpg" },
  { id: "6", title: "Heart Valve Replacement – International Patient Review", doctor: "Dr. Ramesh Kumar", location: "Chennai", date: "Apr 24, 2025", videoId: "dQw4w9WgXcQ", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg" },
  { id: "7", title: "Pediatric Liver Transplant Recovery Story", doctor: "Dr. Sneha Patil", location: "Pune", date: "Apr 22, 2025", videoId: "z8r92htR6I4", thumbnail: "https://img.youtube.com/vi/z8r92htR6I4/hqdefault.jpg" },
  { id: "8", title: "Medical Travel from Kenya – Patient Experience", doctor: "Global Coordination Team", location: "Delhi NCR", date: "Apr 20, 2025", videoId: "6hc5bTzIvCM", thumbnail: "https://img.youtube.com/vi/6hc5bTzIvCM/hqdefault.jpg" },
  { id: "9", title: "Hip Surgery Testimonial by Elderly Patient", doctor: "Dr. Manish Bajaj", location: "Bangalore", date: "Apr 18, 2025", videoId: "vlDzYIIOYmM", thumbnail: "https://img.youtube.com/vi/vlDzYIIOYmM/hqdefault.jpg" },
  { id: "10", title: "International Patient – Breast Cancer Treatment Journey", doctor: "Dr. Nandita Iyer", location: "Kolkata", date: "Apr 15, 2025", videoId: "tgbNymZ7vqY", thumbnail: "https://img.youtube.com/vi/tgbNymZ7vqY/hqdefault.jpg" },
];

const VideoSection = () => {
  const [selectedVideo, setSelectedVideo] = useState(playlist[0]);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 text-center">Patient Success Stories</h2>
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Main Video Player */}
          <div className="flex-1 w-full">
            <div className="rounded-lg overflow-hidden shadow-xl aspect-video bg-black">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?rel=0`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-bold text-blue-900 leading-tight">{selectedVideo.title}</h2>
              <div className="flex items-center gap-2 mt-2 text-sm text-blue-600">
                <span>{selectedVideo.doctor}</span>
                <span className="text-blue-300">•</span>
                <span>{selectedVideo.location}</span>
                <span className="text-blue-300">•</span>
                <span>{selectedVideo.date}</span>
              </div>
              <div className="mt-4">
                {/* <a 
                  href={`https://www.youtube.com/watch?v=${selectedVideo.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  Watch on YouTube <FaExternalLinkAlt size={12} />
                </a> */}
              </div>
            </div>
          </div>

          {/* Playlist Sidebar - Now aligned with video height */}
          <div className="w-full lg:w-96 bg-white rounded-lg shadow-lg flex flex-col" style={{ height: 'fit-content' }}>
            <div className="flex justify-between items-center sticky top-0 bg-gradient-to-r from-blue-600 to-blue-500 z-10 px-4 py-3">
              <h2 className="text-lg font-semibold text-white">More Patient Stories</h2>
              <a 
                href="/success-stories" 
                className="text-white hover:text-blue-100 text-sm flex items-center gap-1"
              >
                View all <FaExternalLinkAlt size={10} />
              </a>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
              {playlist.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedVideo(video)}
                  tabIndex={0}
                  aria-label={`Select video: ${video.title}`}
                  className={`flex gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-50 ${
                    selectedVideo.id === video.id ? "bg-blue-100 border-l-4 border-blue-500" : ""
                  }`}
                >
                  <div className="relative flex-shrink-0 w-24 h-14 rounded-md overflow-hidden">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <FaPlayCircle
                        className="text-white opacity-90 hover:opacity-100 transition-opacity"
                        size={16}
                      />
                    </div>
                    {selectedVideo.id === video.id && (
                      <div className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-1 rounded">
                        Playing
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm leading-tight line-clamp-2 text-gray-800">
                      {video.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1 truncate">
                      {video.doctor}, {video.location}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{video.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .custom-scroll {
          scroll-behavior: smooth;
        }
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #93c5fd;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #60a5fa;
        }
      `}</style>
    </div>
  );
};

export default VideoSection;