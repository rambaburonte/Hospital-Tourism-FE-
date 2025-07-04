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
    <div className="bg-gradient-to-b from-[#f0f8e8] to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#3a7e10] mb-8 text-center relative">
          Patient Success Stories
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-1 w-16 bg-[#499E14] rounded"></span>
        </h2>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Video Player */}
          <div className="flex-1 w-full">
            <div className="rounded-xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-300 animate-fade-in">
              <div className="aspect-video bg-black">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}?rel=0`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-[#3a7e10] leading-tight line-clamp-2">
                {selectedVideo.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-3 text-sm text-[#499E14]">
                <span>{selectedVideo.doctor}</span>
                <span className="text-[#7bc74a]">•</span>
                <span>{selectedVideo.location}</span>
                <span className="text-[#7bc74a]">•</span>
                <span>{selectedVideo.date}</span>
              </div>
              <div className="mt-4">
                <a
                  href={`https://www.youtube.com/watch?v=${selectedVideo.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#e8f5df] text-[#3a7e10] hover:bg-[#d5ebc3] rounded-lg font-medium text-sm transition-colors"
                  aria-label={`Watch ${selectedVideo.title} on YouTube`}
                >
                  Watch on YouTube <FaExternalLinkAlt size={12} />
                </a>
              </div>
            </div>
          </div>

          {/* Playlist Sidebar */}
          <div className="w-full lg:w-96 bg-white rounded-xl shadow-lg flex flex-col">
            <div className="flex justify-between items-center sticky top-0 bg-gradient-to-r from-[#499E14] to-[#3a7e10] z-10 px-4 py-3 rounded-t-xl">
              <h3 className="text-lg font-semibold text-white">More Patient Stories</h3>
              <a
                href="/success-stories"
                className="text-white hover:text-[#e8f5df] text-sm flex items-center gap-1"
                aria-label="View all success stories"
              >
                View all <FaExternalLinkAlt size={10} />
              </a>
            </div>
            <div className="overflow-y-auto custom-scroll" style={{ maxHeight: 'calc(100vh - 300px)' }}>
              {playlist.map((video, index) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedVideo(video)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Select video: ${video.title}`}
                  aria-selected={selectedVideo.id === video.id}
                  className={`flex gap-4 p-4 cursor-pointer transition-all duration-200 hover:bg-[#f0f8e8] ${
                    selectedVideo.id === video.id ? "bg-[#e8f5df] border-l-4 border-[#499E14]" : ""
                  } animate-fade-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative flex-shrink-0 w-24 h-14 rounded-md overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-opacity hover:bg-opacity-20">
                      <FaPlayCircle
                        className="text-white opacity-90 hover:opacity-100 transition-opacity"
                        size={18}
                      />
                    </div>
                    {selectedVideo.id === video.id && (
                      <div className="absolute top-1 left-1 bg-[#499E14] text-white text-xs font-semibold px-1.5 py-0.5 rounded">
                        Playing
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm leading-tight line-clamp-2 text-gray-800 hover:text-[#499E14] transition-colors">
                      {video.title}
                    </h4>
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
      <style>{`
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
          background: #a3e635;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #84cc16;
        }
      `}</style>
    </div>
  );
};

export default VideoSection;