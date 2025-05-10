import { useState } from "react";
import { FaPlayCircle } from "react-icons/fa";

const playlist = [
  { id: "1", title: "Zynlogic – Medical Travel & Patient Experience", doctor: "Zynlogic Healthcare Team", location: "India", date: "May 10, 2025", videoId: "_wAvp9E73Ac", thumbnail: "https://img.youtube.com/vi/_wAvp9E73Ac/hqdefault.jpg" },
  { id: "2", title: "Mrs. Lakshmi’s Recovery From High CO2 Levels", doctor: "Dr. Vivek Kumar Verma", location: "Dehradun", date: "May 1, 2025", videoId: "UOIgF9VPy8Y", thumbnail: "https://img.youtube.com/vi/UOIgF9VPy8Y/hqdefault.jpg" },
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
    <div className="bg-blue-50 py-6 px-3 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900 mb-4">
          Real Patients, Real Stories
        </h1>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Main Video */}
          <div className="flex-1 lg:max-w-[calc(100%-20rem)]">
            <div className="rounded-lg overflow-hidden shadow-md aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?rel=0`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="mt-2">
              <h2 className="text-lg font-bold text-blue-900 leading-tight">{selectedVideo.title}</h2>
              <p className="text-[0.65rem] text-blue-600 mt-0.5">
                {selectedVideo.doctor}, {selectedVideo.location} • {selectedVideo.date}
              </p>
            </div>
          </div>

          {/* Playlist */}
          <div className="w-full lg:w-80 aspect-video bg-white rounded-lg shadow-md overflow-hidden flex flex-col mt-3 lg:mt-0">
            <div className="flex justify-between items-center sticky top-0 bg-blue-50 z-10 px-2 py-1.5 border-b border-blue-100">
              <h2 className="text-sm font-semibold text-blue-900">More Stories</h2>
              <a href="/success-stories" className="text-blue-600 hover:underline text-[0.65rem]">
                View all
              </a>
            </div>
            <div className="flex-1 overflow-y-auto custom-scroll px-2 py-0.5">
              {playlist.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedVideo(video)}
                  tabIndex={0}
                  aria-label={`Select video: ${video.title}`}
                  className={`flex gap-1.5 p-1.5 rounded-md cursor-pointer transition-all duration-100 hover:bg-blue-100 hover:scale-[1.02] ${
                    selectedVideo.id === video.id ? "bg-blue-200" : ""
                  }`}
                >
                  <div className="relative w-20 h-11.25 rounded-md overflow-hidden border border-gray-200">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                    <FaPlayCircle
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white opacity-80 hover:opacity-100 transition-opacity drop-shadow-md"
                      size={20}
                    />
                  </div>
                  <div className="text-[0.65rem] flex-1">
                    <h3 className="font-semibold leading-tight line-clamp-2">{video.title}</h3>
                    <p className="text-gray-600 mt-0.5">{video.doctor}, {video.location}</p>
                    <p className="text-gray-400">{video.date}</p>
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
          width: 4px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #e5e7eb;
          border-radius: 6px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 6px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }
      `}</style>
    </div>
  );
};

export default VideoSection;