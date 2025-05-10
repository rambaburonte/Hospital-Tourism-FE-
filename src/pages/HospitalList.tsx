import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Hospital {
  id: string;
  name: string;
  location: string;
  image: string;
  mapEmbed: string;
}

const hospitals: Hospital[] = [
  {
    id: "1",
    name: "Fortis Memorial Research Institute",
    location: "Gurgaon, Haryana",
    image: "/h1.png",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14026.401501933553!2d77.080188!3d28.467387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18bdfc82b8e3%3A0x3369ed7b6cde00b0!2sFortis%20Memorial%20Research%20Institute!5e0!3m2!1sen!2sin!4v1715184267890!5m2!1sen!2sin",
  },
  {
    id: "2",
    name: "Kokilaben Dhirubhai Ambani Hospital",
    location: "Mumbai, Maharashtra",
    image: "/h1.png",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.2659397547496!2d72.8284159!3d19.1391479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b65595d1a957%3A0x6d127f0a24ae9d4!2sKokilaben%20Dhirubhai%20Ambani%20Hospital!5e0!3m2!1sen!2sin!4v1715184478895!5m2!1sen!2sin",
  },
  {
    id: "3",
    name: "Christian Medical College (CMC)",
    location: "Vellore, Tamil Nadu",
    image: "/h1.png",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.445264863255!2d79.1406324!3d12.870302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bad4c8c02e3e5b7%3A0x2675ab1f48b5df53!2sChristian%20Medical%20College%20(CMC)%20Hospital!5e0!3m2!1sen!2sin!4v1715184653149!5m2!1sen!2sin",
  },
  {
    id: "4",
    name: "Narayana Health City",
    location: "Bangalore, Karnataka",
    image: "/h1.png",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3891.428880773601!2d77.6967486!3d12.8380096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6c227a1c7f7d%3A0x5482f2e93a761bd8!2sNarayana%20Health%20City!5e0!3m2!1sen!2sin!4v1715184756884!5m2!1sen!2sin",
  },
  {
    id: "5",
    name: "Max Super Speciality Hospital",
    location: "Saket, New Delhi",
    image: "/h1.png",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1752.9835909517318!2d77.2123831!3d28.5280746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3d7a29164e1%3A0x6e41002a4fdcb823!2sMax%20Super%20Speciality%20Hospital!5e0!3m2!1sen!2sin!4v1715184881883!5m2!1sen!2sin",
  },
  {
    id: "6",
    name: "Manipal Hospital",
    location: "Bangalore, Karnataka",
    image: "/h1.png",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.777520832493!2d77.6480024!3d12.956069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13a51a8bc96b%3A0x858d0d7780fd4937!2sManipal%20Hospitals!5e0!3m2!1sen!2sin!4v1715184975780!5m2!1sen!2sin",
  },
  {
    id: "7",
    name: "Sir Ganga Ram Hospital",
    location: "New Delhi, India",
    image: "/h1.png",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.8647762499!2d77.0688995!3d28.6436844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d02c02ebda47f%3A0xdd9509a99c20cfaa!2sSir%20Ganga%20Ram%20Hospital!5e0!3m2!1sen!2sin!4v1715185054040!5m2!1sen!2sin",
  },
  {
    id: "8",
    name: "BLK-Max Super Speciality Hospital",
    location: "New Delhi, India",
    image: "/h1.png",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14010.535894748152!2d77.1591497!3d28.6518809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03114b0c4cb1%3A0x91ed83c5b1be5ab3!2sBLK%20Max%20Super%20Speciality%20Hospital!5e0!3m2!1sen!2sin!4v1715185121174!5m2!1sen!2sin",
  },
  {
    id: "9",
    name: "Artemis Hospital",
    location: "Gurgaon, Haryana",
    image: "/h1.png",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1754.1339449077072!2d77.0875196!3d28.4416309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18c3d6547001%3A0x37b9f741f20aa7e1!2sArtemis%20Hospital%2C%20Gurgaon!5e0!3m2!1sen!2sin!4v1715185193081!5m2!1sen!2sin",
  },
  {
    id: "10",
    name: "AIIMS Delhi",
    location: "New Delhi, India",
    image: "/h1.png",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14012.428573382767!2d77.2066458!3d28.5671997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3a3aeb6fd6b%3A0x8221d23448f1dc6a!2sAIIMS!5e0!3m2!1sen!2sin!4v1715185234683!5m2!1sen!2sin",
  },
];

const HospitalList: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">

      <main className="flex-grow p-6 sm:p-8 lg:p-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              Top Hospitals in India
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <img
                  src={hospital.image}
                  alt={`${hospital.name} location map`}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => window.open(hospital.mapEmbed.replace('/embed?', '/place?'), '_blank')}
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/300x200?text=Hospital+Image";
                  }}
                  role="link"
                  aria-label={`View ${hospital.name} on Google Maps`}
                />
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{hospital.name}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    <strong>Location:</strong> {hospital.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default HospitalList;