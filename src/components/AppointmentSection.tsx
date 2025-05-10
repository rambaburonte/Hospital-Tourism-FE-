
// import React, { useState } from 'react';
// import { Calendar, MapPin, Search, User, Phone, Hotel, Plane, Clock, Pill } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';


// const AppointmentSection = () => {
//   // State for input fields
//   const [doctorSearch, setDoctorSearch] = useState('');
//   const [location, setLocation] = useState('');
//   // State to track the selected service
//   const [selectedService, setSelectedService] = useState<string | null>(null);

//   // Navigation hook
//   const navigate = useNavigate();

//   // Placeholder handler for booking an appointment
//   const handleBookAppointment = () => {
//     console.log('Booking appointment:', { doctorSearch, location });
//   };

//   // Sample data for each service category (6 items with images and descriptions)
//   const serviceData: Record<string, { name: string; details: string; image: string; description: string }[]> = {
//     "Find a Doctor": [
//       {
//         name: "Dr. Anjali Sharma",
//         details: "Cardiologist, 15+ years experience",
//         image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Specializes in heart conditions with a focus on preventive care.",
//       },
//       {
//         name: "Dr. Rohan Gupta",
//         details: "Neurologist, 12+ years experience",
//         image: "https://images.unsplash.com/photo-1612349317154-3c9b2e5b7d5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Expert in treating neurological disorders like epilepsy and migraines.",
//       },
//       {
//         name: "Dr. Priya Kapoor",
//         details: "Pediatrician, 10+ years experience",
//         image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Dedicated to child healthcare with a gentle approach.",
//       },
//       {
//         name: "Dr. Sameer Patil",
//         details: "Oncologist, 18+ years experience",
//         image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Leads advanced cancer treatments with a focus on patient care.",
//       },
//       {
//         name: "Dr. Neha Reddy",
//         details: "Dermatologist, 8+ years experience",
//         image: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Specializes in skin health, including acne and anti-aging treatments.",
//       },
//       {
//         name: "Dr. Vikram Singh",
//         details: "Orthopedist, 14+ years experience",
//         image: "https://images.unsplash.com/photo-1612349317154-3c9b2e5b7d5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Focuses on bone and joint issues, specializing in sports injuries.",
//       },
//     ],
//     "Book a Test": [
//       {
//         name: "Blood Test",
//         details: "Complete Blood Count (CBC)",
//         image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Comprehensive test to evaluate overall health and detect disorders.",
//       },
//       {
//         name: "MRI Scan",
//         details: "Brain and Spine Imaging",
//         image: "https://images.unsplash.com/photo-1580983561371-7f4b242d8e83?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Detailed imaging for diagnosing brain and spine conditions.",
//       },
//       {
//         name: "ECG",
//         details: "Electrocardiogram for Heart",
//         image: "https://images.unsplash.com/photo-1576765974102-b766b7cc8c67?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Measures heart activity to detect cardiac issues.",
//       },
//       {
//         name: "Ultrasound",
//         details: "Abdominal Ultrasound",
//         image: "https://images.unsplash.com/photo-1576089866232-0c7451e3e04c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Non-invasive imaging for abdominal organ evaluation.",
//       },
//       {
//         name: "Lipid Profile",
//         details: "Cholesterol and Triglycerides",
//         image: "https://images.unsplash.com/photo-1580281658626-ee379fecb6a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Assesses heart health by measuring cholesterol levels.",
//       },
//       {
//         name: "X-Ray",
//         details: "Chest X-Ray",
//         image: "https://images.unsplash.com/photo-1580281658626-ee379fecb6a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Imaging to diagnose conditions affecting the chest and lungs.",
//       },
//     ],
//     "Spa & Physiotherapy": [
//       {
//         name: "Therapeutic Massage",
//         details: "Relieves muscle tension",
//         image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Relaxing massage to ease stress and muscle pain.",
//       },
//       {
//         name: "Physiotherapy Session",
//         details: "Post-surgery recovery",
//         image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Tailored sessions to aid recovery and improve mobility.",
//       },
//       {
//         name: "Aromatherapy",
//         details: "Stress relief and relaxation",
//         image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Uses essential oils to promote mental and physical well-being.",
//       },
//       {
//         name: "Hydrotherapy",
//         details: "Joint pain relief",
//         image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Water-based therapy to alleviate joint discomfort.",
//       },
//       {
//         name: "Yoga Therapy",
//         details: "Improves flexibility and strength",
//         image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Guided yoga sessions for physical and mental health.",
//       },
//       {
//         name: "Acupuncture",
//         details: "Pain management",
//         image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Traditional therapy to relieve chronic pain and stress.",
//       },
//     ],
//     "Locate Hospital": [
//       {
//         name: "Max Super Speciality Hospital",
//         details: "Delhi NCR, 586 beds",
//         image: "https://images.unsplash.com/photo-1519494026892-80e0c3713da0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Leading hospital with advanced medical facilities in Delhi NCR.",
//       },
//       {
//         name: "Max Hospital Mumbai",
//         details: "Mumbai, Maharashtra, 450 beds",
//         image: "https://images.unsplash.com/photo-1519494026892-80e0c3713da0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "State-of-the-art healthcare services in Mumbai.",
//       },
//       {
//         name: "Max Hospital Pune",
//         details: "Pune, Maharashtra, 320 beds",
//         image: "https://images.unsplash.com/photo-1519494026892-80e0c3713da0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Comprehensive care with a focus on patient comfort in Pune.",
//       },
//       {
//         name: "Max Hospital Chennai",
//         details: "Chennai, Tamil Nadu, 280 beds",
//         image: "https://images.unsplash.com/photo-1519494026892-80e0c3713da0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Trusted hospital offering specialized treatments in Chennai.",
//       },
//       {
//         name: "Max Hospital Bangalore",
//         details: "Bangalore, Karnataka, 410 beds",
//         image: "https://images.unsplash.com/photo-1519494026892-80e0c3713da0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Modern healthcare facility serving Bangalore and beyond.",
//       },
//       {
//         name: "Max Hospital Hyderabad",
//         details: "Hyderabad, Telangana, 380 beds",
//         image: "https://images.unsplash.com/photo-1519494026892-80e0c3713da0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Advanced healthcare services in Hyderabad.",
//       },
//     ],
//     "Hotel Booking": [
//       {
//         name: "Taj Palace",
//         details: "Delhi NCR, 5-star luxury",
//         image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Luxury hotel with premium amenities near medical centers.",
//       },
//       {
//         name: "The Oberoi",
//         details: "Mumbai, Maharashtra, 5-star",
//         image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Elegant stay with sea views, close to Max Hospital Mumbai.",
//       },
//       {
//         name: "Hyatt Regency",
//         details: "Pune, Maharashtra, 4-star",
//         image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Comfortable stay with easy access to medical facilities.",
//       },
//       {
//         name: "ITC Grand Chola",
//         details: "Chennai, Tamil Nadu, 5-star",
//         image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Opulent hotel with wellness spa, near Max Hospital Chennai.",
//       },
//       {
//         name: "The Leela Palace",
//         details: "Bangalore, Karnataka, 5-star",
//         image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Luxurious stay with proximity to healthcare services.",
//       },
//       {
//         name: "Novotel",
//         details: "Hyderabad, Telangana, 4-star",
//         image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Modern hotel with excellent facilities for medical tourists.",
//       },
//     ],
//     "Travel Booking": [
//       {
//         name: "Flight to Delhi",
//         details: "Direct, 3 hours",
//         image: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Direct flight to Delhi for medical travel.",
//       },
//       {
//         name: "Flight to Mumbai",
//         details: "Direct, 2 hours",
//         image: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Convenient flight to Mumbai for healthcare visits.",
//       },
//       {
//         name: "Flight to Pune",
//         details: "Direct, 2.5 hours",
//         image: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Travel to Pune for medical consultations.",
//       },
//       {
//         name: "Flight to Chennai",
//         details: "Direct, 3.5 hours",
//         image: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Flight to Chennai for hospital visits.",
//       },
//       {
//         name: "Flight to Bangalore",
//         details: "Direct, 3 hours",
//         image: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Direct flight to Bangalore for medical tourism.",
//       },
//       {
//         name: "Flight to Hyderabad",
//         details: "Direct, 2.5 hours",
//         image: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Travel to Hyderabad for healthcare services.",
//       },
//     ],
//     "Translators": [
//       {
//         name: "Francis R. Jones",
//         details: "Poetry Translation, 30+ years experience",
//         image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Francis_R_Jones.jpg/220px-Francis_R_Jones.jpg",
//         description: "Expert in translating Dutch and South Slavic poetry.",
//       },
//       {
//         name: "Ineke Crezee",
//         details: "Healthcare & Legal Interpretation, 25+ years experience",
//         image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Ineke_Crezee.jpg/220px-Ineke_Crezee.jpg",
//         description: "Specialist in healthcare interpreting and translator education.",
//       },
//       {
//         name: "Maria Gonzalez",
//         details: "Legal & Business Translation, 15 years experience",
//         image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Provides certified translations for legal and business documents.",
//       },
//       {
//         name: "Kenji Tanaka",
//         details: "Technical & IT Translation, 10 years experience",
//         image: "https://images.unsplash.com/photo-1612349317154-3c9b2e5b7d5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Expert in translating technical manuals and IT documents.",
//       },
//       {
//         name: "Amina El-Sayed",
//         details: "Medical & Pharmaceutical Translation, 12 years experience",
//         image: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Specializes in medical translations for pharmaceutical companies.",
//       },
//       {

//         name: "Liu Wei",
//         details: "Marketing & Advertising Translation, 8 years experience",
//         image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Translates marketing materials to appeal to Chinese audiences.",
//       },
//       {
//         name: "Orthopedic Consultation",
//         details: "Max Hospital Hyderabad",
//         image: "https://images.unsplash.com/photo-1580281658626-ee379fecb6a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Schedule a bone and joint checkup with an orthopedist.",
//       },
//     ],
//     "Pharmacy": [
//       {
//         name: "Max Pharmacy Delhi",
//         details: "Delhi NCR, 24/7 service",
//         image: "https://images.unsplash.com/photo-1580281658626-ee379fecb6a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Order medicines with home delivery in Delhi NCR.",
//       },
//       {
//         name: "Max Pharmacy Mumbai",
//         details: "Mumbai, Maharashtra",
//         image: "https://images.unsplash.com/photo-1580281658626-ee379fecb6a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Reliable pharmacy services in Mumbai.",
//       },
//       {
//         name: "Max Pharmacy Pune",
//         details: "Pune, Maharashtra",
//         image: "https://images.unsplash.com/photo-1580281658626-ee379fecb6a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Get your prescriptions delivered in Pune.",
//       },
//       {
//         name: "Personalcare & skincare",
//         details: "Chennai, Tamil Nadu",
//         image: "https://images.unsplash.com/photo-1580281658626-ee379fecb6a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Pharmacy services with quick delivery in Chennai.",
//       },
//       {
//         name: " healthfood&drinks",
//         details: "Taking care of ur health",
//         image: "https://images.unsplash.com/photo-1580281658626-ee379fecb6a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "Order medicines online in Bangalore.",
//       },
//       {
//         name: "General medicine",
//         details: "Medicine at ur hand",
//         image: "https://images.unsplash.com/photo-1580281658626-ee379fecb6a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//         description: "24/7 pharmacy support in Hyderabad.",

//       },
//     ],
//     // Pharmacy service data is replaced by pharmacyCategories below
//   };

//   // Pharmacy categories data
//   const pharmacyCategories = [
//     {
//       name: "Summer Essentials",
//       description: "Sunscreens, hydration supplements, and cooling products for summer.",
//       image: "https://images.unsplash.com/photo-1620916566398-51f495e90a35?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//       route: "/pharmacy/summer-essentials",
//     },
//     {
//       name: "Vitamins & Supplements",
//       description: "Multivitamins, immunity boosters, and dietary supplements.",
//       image: "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//       route: "/pharmacy/vitamins-supplements",
//     },
//     {
//       name: "Sports Nutrition",
//       description: "Protein powders, energy bars, and recovery supplements.",
//       image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//       route: "/pharmacy/sports-nutrition",
//     },
//     {
//       name: "Personal Care & Skincare",
//       description: "Moisturizers, cleansers, and specialized skincare products.",
//       image: "https://images.unsplash.com/photo-1556227709-3d3f91f54604?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//       route: "/pharmacy/personal-care-skincare",
//     },
//     {
//       name: "Health Food & Drinks",
//       description: "Nutritional shakes, herbal teas, and healthy snacks.",
//       image: "https://images.unsplash.com/photo-1496412705862-e0088f16f791?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
//       route: "/pharmacy/health-food-drinks",
//     },
//   ];

//   // Map services to their respective routes
//   const serviceRoutes: Record<string, string> = {
//     "Find a Doctor": "/doctors",
//     "Book a Test": "/tests",
//     "Spa & Physiotherapy": "/ServiceListingPage",
//     "Locate Hospital": "/OurHospitals",
//     "Hotel Booking": "/hotels",
//     "Travel Booking": "/travel",
//     "Appointment Booking": "/translatorList",
//     "Pharmacy": "/pharmacy",
//   };

//   // Handle service card click
//   const handleServiceClick = (service: string) => {
//     setSelectedService(selectedService === service ? null : service);
//   };

//  const handleCategoryClick = (categoryName: string) => {
//   navigate(`/PharmacyCategoryPage?category=${encodeURIComponent(categoryName)}`);
// };



//   return (
//     <section className="bg-slate-50 py-12">
//       <div className="container mx-auto px-4 md:px-6">
//         <div className="max-w-5xl mx-auto">
//           <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
//             Schedule Your Appointment Online
//           </h2>

//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
//                 <input
//                   type="text"
//                   placeholder="Search for Doctor"
//                   value={doctorSearch}
//                   onChange={(e) => setDoctorSearch(e.target.value)}
//                   className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
//                   aria-label="Search for a doctor"
//                 />
//               </div>
//               <div className="relative">
//                 <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
//                 <select
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                   className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
//                   aria-label="Choose a location"
//                 >
//                   <option value="">Choose Location</option>
//                   <option value="Delhi NCR">Delhi NCR</option>
//                   <option value="Mumbai, Maharashtra">Mumbai, Maharashtra</option>
//                   <option value="Pune, Maharashtra">Pune, Maharashtra</option>
//                   <option value="Chennai, Tamil Nadu">Chennai, Tamil Nadu</option>
//                   <option value="Bangalore, Karnataka">Bangalore, Karnataka</option>
//                   <option value="Hyderabad, Telangana">Hyderabad, Telangana</option>
//                 </select>
//               </div>
//               <div className="flex justify-end">
//                 <button
//                   onClick={handleBookAppointment}
//                   className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg w-full shadow-md transition-all duration-300"
//                   aria-label="Book an appointment"
//                 >
//                   Book an Appointment
//                 </button>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mt-8">
//               <div
//                 onClick={() => handleServiceClick("Find a Doctor")}
//                 className={`border border-gray-200 text-center rounded-xl bg-gradient-to-b from-gray-50 to-white shadow-md hover:shadow-xl hover:border-indigo-500 transition-all duration-300 cursor-pointer ${
//                   selectedService === "Find a Doctor" ? "border-indigo-500 bg-indigo-50" : ""
//                 }`}
//               >
//                 <div className="p-4 flex flex-col items-center justify-center">
//                   <div className="mb-2 bg-slate-100 p-3 rounded-full shadow-sm">
//                     <User className="h-6 w-6 text-indigo-600" />
//                   </div>
//                   <p className="text-sm font-medium text-gray-800">Find a Doctor</p>
//                 </div>
//               </div>

//               <div
//                 onClick={() => handleServiceClick("Book a Test")}
//                 className={`border border-gray-200 text-center rounded-xl bg-gradient-to-b from-gray-50 to-white shadow-md hover:shadow-xl hover:border-indigo-500 transition-all duration-300 cursor-pointer ${
//                   selectedService === "Book a Test" ? "border-indigo-500 bg-indigo-50" : ""
//                 }`}
//               >
//                 <div className="p-4 flex flex-col items-center justify-center">
//                   <div className="mb-2 bg-slate-100 p-3 rounded-full shadow-sm">
//                     <Calendar className="h-6 w-6 text-indigo-600" />
//                   </div>
//                   <p className="text-sm font-medium text-gray-800">Book a Test</p>
//                 </div>
//               </div>

//               <div
//                 onClick={() => handleServiceClick("Spa & Physiotherapy")}
//                 className={`border border-gray-200 text-center rounded-xl bg-gradient-to-b from-gray-50 to-white shadow-md hover:shadow-xl hover:border-indigo-500 transition-all duration-300 cursor-pointer ${
//                   selectedService === "Spa & Physiotherapy" ? "border-indigo-500 bg-indigo-50" : ""
//                 }`}
//               >
//                 <div className="p-4 flex flex-col items-center justify-center">
//                   <div className="mb-2 bg-slate-100 p-3 rounded-full shadow-sm">
//                     <Phone className="h-6 w-6 text-indigo-600" />
//                   </div>
//                   <p className="text-sm font-medium text-gray-800">Spa & Physiotherapy</p>
//                 </div>
//               </div>

//               <div
//                 onClick={() => handleServiceClick("Locate Hospital")}
//                 className={`border border-gray-200 text-center rounded-xl bg-gradient-to-b from-gray-50 to-white shadow-md hover:shadow-xl hover:border-indigo-500 transition-all duration-300 cursor-pointer ${
//                   selectedService === "Locate Hospital" ? "border-indigo-500 bg-indigo-50" : ""
//                 }`}
//               >
//                 <div className="p-4 flex flex-col items-center justify-center">
//                   <div className="mb-2 bg-slate-100 p-3 rounded-full shadow-sm">
//                     <MapPin className="h-6 w-6 text-indigo-600" />
//                   </div>
//                   <p className="text-sm font-medium text-gray-800">Locate Hospital</p>
//                 </div>
//               </div>

//               <div
//                 onClick={() => handleServiceClick("Hotel Booking")}
//                 className={`border border-gray-200 text-center rounded-xl bg-gradient-to-b from-gray-50 to-white shadow-md hover:shadow-xl hover:border-indigo-500 transition-all duration-300 cursor-pointer ${
//                   selectedService === "Hotel Booking" ? "border-indigo-500 bg-indigo-50" : ""
//                 }`}
//               >
//                 <div className="p-4 flex flex-col items-center justify-center">
//                   <div className="mb-2 bg-slate-100 p-3 rounded-full shadow-sm">
//                     <Hotel className="h-6 w-6 text-indigo-600" />
//                   </div>
//                   <p className="text-sm font-medium text-gray-800">Hotel Booking</p>
//                 </div>
//               </div>

//               <div
//                 onClick={() => handleServiceClick("Travel Booking")}
//                 className={`border border-gray-200 text-center rounded-xl bg-gradient-to-b from-gray-50 to-white shadow-md hover:shadow-xl hover:border-indigo-500 transition-all duration-300 cursor-pointer ${
//                   selectedService === "Travel Booking" ? "border-indigo-500 bg-indigo-50" : ""
//                 }`}
//               >
//                 <div className="p-4 flex flex-col items-center justify-center">
//                   <div className="mb-2 bg-slate-100 p-3 rounded-full shadow-sm">
//                     <Plane className="h-6 w-6 text-indigo-600" />
//                   </div>
//                   <p className="text-sm font-medium text-gray-800">Travel Booking</p>
//                 </div>
//               </div>

//               <div
//                 onClick={() => handleServiceClick("Translators")}
//                 className={`border border-gray-200 text-center rounded-xl bg-gradient-to-b from-gray-50 to-white shadow-md hover:shadow-xl hover:border-indigo-500 transition-all duration-300 cursor-pointer ${
//                   selectedService === "Appointment Booking" ? "border-indigo-500 bg-indigo-50" : ""
//                 }`}
//               >
//                 <div className="p-4 flex flex-col items-center justify-center">
//                   <div className="mb-2 bg-slate-100 p-3 rounded-full shadow-sm">
//                     <Clock className="h-6 w-6 text-indigo-600" />
//                   </div>
//                   <p className="text-sm font-medium text-gray-800">Translators</p>
//                 </div>
//               </div>

//               <div
//                 onClick={() => handleServiceClick("Pharmacy")}
//                 className={`border border-gray-200 text-center rounded-xl bg-gradient-to-b from-gray-50 to-white shadow-md hover:shadow-xl hover:border-indigo-500 transition-all duration-300 cursor-pointer ${
//                   selectedService === "Pharmacy" ? "border-indigo-500 bg-indigo-50" : ""
//                 }`}
//               >
//                 <div className="p-4 flex flex-col items-center justify-center">
//                   <div className="mb-2 bg-slate-100 p-3 rounded-full shadow-sm">
//                     <Pill className="h-6 w-6 text-indigo-600" />
//                   </div>
//                   <p className="text-sm font-medium text-gray-800">Pharmacy</p>
//                 </div>
//               </div>
//             </div>

//             {/* Display Content for the Selected Service */}
//             {selectedService && (
//               <div className="mt-12">
//                 <h3 className="text-2xl font-bold text-gray-900 mb-6">
//                   {selectedService}
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {selectedService === "Pharmacy" ? (
//                     // Display Pharmacy Categories
//                     pharmacyCategories.map((category, index) => (
//                       <div
//   key={index}
//   onClick={() => handleCategoryClick(category.name)}
//   className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
// >
//                         <img
//                           src={category.image}
//                           alt={category.name}
//                           className="w-full h-40 object-cover rounded-lg mb-4"
//                         />
//                         <h4 className="text-lg font-semibold text-gray-800 mb-2">{category.name}</h4>
//                         <p className="text-gray-500 text-sm">{category.description}</p>
//                       </div>
//                     ))
//                   ) : (
//                     // Display Other Service Items
//                     serviceData[selectedService].slice(0, 6).map((item, index) => (
//                       <div
//                         key={index}
//                         className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
//                       >
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-full h-40 object-cover rounded-lg mb-4"
//                         />
//                         <h4 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h4>
//                         <p className="text-gray-600 text-sm mb-2">{item.details}</p>
//                         <p className="text-gray-500 text-sm italic">{item.description}</p>
//                       </div>
//                     ))
//                   )}
//                 </div>
//                 {/* Explore More Link */}
//                 <div className="mt-8 text-center">
//                   <Link
//                     to={serviceRoutes[selectedService]}
//                     className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300"
//                   >
//                     Explore More
//                   </Link>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AppointmentSection;




import React, { useState } from 'react';
import { Calendar, MapPin, Search, User, Phone, Hotel, Plane, Clock, Pill } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';






const AppointmentSection = () => {
  // State for input fields
  const [doctorSearch, setDoctorSearch] = useState('');
  const [location, setLocation] = useState('');
  // State to track the selected service
  const [selectedService, setSelectedService] = useState<string | null>(null);

  // Navigation hook
  const navigate = useNavigate();

  // Placeholder handler for booking an appointment
  const handleBookAppointment = () => {
    console.log('Booking appointment:', { doctorSearch, location });
  };

  // Sample data for each service category (6 items with images and descriptions)
  const serviceData: Record<string, { name: string; details: string; image: string; description: string }[]> = {
    "Find a Doctor": [
      {
        name: "Dr. Anjali Sharma",
        details: "Cardiologist, 15+ years experience",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Specializes in heart conditions with a focus on preventive care.",
      },
      {
        name: "Dr. Rohan Gupta",
        details: "Neurologist, 12+ years experience",
        image: "https://images.unsplash.com/photo-1612349317154-3c9b2e5b7d5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Expert in treating neurological disorders like epilepsy and migraines.",
      },
      {
        name: "Dr. Priya Kapoor",
        details: "Pediatrician, 10+ years experience",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Dedicated to child healthcare with a gentle approach.",
      },
      {
        name: "Dr. Sameer Patil",
        details: "Oncologist, 18+ years experience",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Leads advanced cancer treatments with a focus on patient care.",
      },
      {
        name: "Dr. Neha Reddy",
        details: "Dermatologist, 8+ years experience",
        image: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Specializes in skin health, including acne and anti-aging treatments.",
      },
      {
        name: "Dr. Vikram Singh",
        details: "Orthopedist, 14+ years experience",
        image: "https://images.unsplash.com/photo-1612349317154-3c9b2e5b7d5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Focuses on bone and joint issues, specializing in sports injuries.",
      },
    ],
    "Book a Test": [
      {
        name: "Blood Test",
        details: "Complete Blood Count (CBC)",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Comprehensive test to evaluate overall health and detect disorders.",
      },
      {
        name: "MRI Scan",
        details: "Brain and Spine Imaging",
        image: "https://images.unsplash.com/photo-1580983561371-7f4b242d8e83?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Detailed imaging for diagnosing brain and spine conditions.",
      },
      {
        name: "ECG",
        details: "Electrocardiogram for Heart",
        image: "https://images.unsplash.com/photo-1576765974102-b766b7cc8c67?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Measures heart activity to detect cardiac issues.",
      },
      {
        name: "Ultrasound",
        details: "Abdominal Ultrasound",
        image: "https://images.unsplash.com/photo-1576089866232-0c7451e3e04c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Non-invasive imaging for abdominal organ evaluation.",
      },
      {
        name: "Lipid Profile",
        details: "Cholesterol and Triglycerides",
        image: "https://images.unsplash.com/photo-1580281658626-ee379fecb6a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Assesses heart health by measuring cholesterol levels.",
      },
      {
        name: "X-Ray",
        details: "Chest X-Ray",
        image: "https://images.unsplash.com/photo-1580281658626-ee379fecb6a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Imaging to diagnose conditions affecting the chest and lungs.",
      },
    ],
    "Spa & Physiotherapy": [
      {
        name: "Therapeutic Massage",
        details: "Relieves muscle tension",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Relaxing massage to ease stress and muscle pain.",
      },
      {
        name: "Physiotherapy Session",
        details: "Post-surgery recovery",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Tailored sessions to aid recovery and improve mobility.",
      },
      {
        name: "Aromatherapy",
        details: "Stress relief and relaxation",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Uses essential oils to promote mental and physical well-being.",
      },
      {
        name: "Hydrotherapy",
        details: "Joint pain relief",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Water-based therapy to alleviate joint discomfort.",
      },
      {
        name: "Yoga Therapy",
        details: "Improves flexibility and strength",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Guided yoga sessions for physical and mental health.",
      },
      {
        name: "Acupuncture",
        details: "Pain management",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Traditional therapy to relieve chronic pain and stress.",
      },
    ],
    "Locate Hospital": [
      {
        name: "Max Super Speciality Hospital",
        details: "Delhi NCR, 586 beds",
        image: "https://images.unsplash.com/photo-1519494026892-80e0c3713da0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Leading hospital with advanced medical facilities in Delhi NCR.",
      },
      {
        name: "Max Hospital Mumbai",
        details: "Mumbai, Maharashtra, 450 beds",
        image: "https://images.unsplash.com/photo-1519494026892-80e0c3713da0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "State-of-the-art healthcare services in Mumbai.",
      },
      {
        name: "Max Hospital Pune",
        details: "Pune, Maharashtra, 320 beds",
        image: "https://images.unsplash.com/photo-1519494026892-80e0c3713da0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Comprehensive care with a focus on patient comfort in Pune.",
      },
      {
        name: "Max Hospital Chennai",
        details: "Chennai, Tamil Nadu, 280 beds",
        image: "https://images.unsplash.com/photo-1519494026892-80e0c3713da0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Trusted hospital offering specialized treatments in Chennai.",
      },
      {
        name: "Max Hospital Bangalore",
        details: "Bangalore, Karnataka, 410 beds",
        image: "https://images.unsplash.com/photo-1519494026892-80e0c3713da0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Modern healthcare facility serving Bangalore and beyond.",
      },
      {
        name: "Max Hospital Hyderabad",
        details: "Hyderabad, Telangana, 380 beds",
        image: "https://images.unsplash.com/photo-1519494026892-80e0c3713da0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Advanced healthcare services in Hyderabad.",
      },
    ],
    "Hotel Booking": [
      {
        name: "Taj Palace",
        details: "Delhi NCR, 5-star luxury",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Luxury hotel with premium amenities near medical centers.",
      },
      {
        name: "The Oberoi",
        details: "Mumbai, Maharashtra, 5-star",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Elegant stay with sea views, close to Max Hospital Mumbai.",
      },
      {
        name: "Hyatt Regency",
        details: "Pune, Maharashtra, 4-star",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Comfortable stay with easy access to medical facilities.",
      },
      {
        name: "ITC Grand Chola",
        details: "Chennai, Tamil Nadu, 5-star",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Opulent hotel with wellness spa, near Max Hospital Chennai.",
      },
      {
        name: "The Leela Palace",
        details: "Bangalore, Karnataka, 5-star",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Luxurious stay with proximity to healthcare services.",
      },
      {
        name: "Novotel",
        details: "Hyderabad, Telangana, 4-star",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Modern hotel with excellent facilities for medical tourists.",
      },
    ],
    "Travel Booking": [
      {
        name: "Flight to Delhi",
        details: "Direct, 3 hours",
        image: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Direct flight to Delhi for medical travel.",
      },
      {
        name: "Flight to Mumbai",
        details: "Direct, 2 hours",
        image: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Convenient flight to Mumbai for healthcare visits.",
      },
      {
        name: "Flight to Pune",
        details: "Direct, 2.5 hours",
        image: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Travel to Pune for medical consultations.",
      },
      {
        name: "Flight to Chennai",
        details: "Direct, 3.5 hours",
        image: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Flight to Chennai for hospital visits.",
      },
      {
        name: "Flight to Bangalore",
        details: "Direct, 3 hours",
        image: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Direct flight to Bangalore for medical tourism.",
      },
      {
        name: "Flight to Hyderabad",
        details: "Direct, 2.5 hours",
        image: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Travel to Hyderabad for healthcare services.",
      },
    ],
    "Translators": [
      {
        name: "Francis R. Jones",
        details: "Poetry Translation, 30+ years experience",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Francis_R_Jones.jpg/220px-Francis_R_Jones.jpg",
        description: "Expert in translating Dutch and South Slav poetry.",
      },
      {
        name: "Ineke Crezee",
        details: "Healthcare & Legal Interpretation, 25+ years experience",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Ineke_Crezee.jpg/220px-Ineke_Crezee.jpg",
        description: "Specialist in healthcare interpreting and translator education.",
      },
      {
        name: "Maria Gonzalez",
        details: "Legal & Business Translation, 15 years experience",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Provides certified translations for legal and business documents.",
      },
      {
        name: "Kenji Tanaka",
        details: "Technical & IT Translation, 10 years experience",
        image: "https://images.unsplash.com/photo-1612349317154-3c9b2e5b7d5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Expert in translating technical manuals and IT documents.",
      },
      {
        name: "Amina El-Sayed",
        details: "Medical & Pharmaceutical Translation, 12 years experience",
        image: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Specializes in medical translations for pharmaceutical companies.",
      },
      {
        name: "Liu Wei",
        details: "Marketing & Advertising Translation, 8 years experience",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Translates marketing materials to appeal to Chinese audiences.",
      },
    ],
    "Pharmacy": [
      {
        name: "Max Pharmacy Delhi",
        details: "Delhi NCR, 24/7 service",
        image: "https://images.unsplash.com/photo-1580281658626-ee379fecb6a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Order medicines with home delivery in Delhi NCR.",
      },
      {
        name: "Max Pharmacy Mumbai",
        details: "Mumbai, Maharashtra",
        image: "https://images.unsplash.com/photo-1580281658626-ee379fecb6a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Reliable pharmacy services in Mumbai.",
      },
      {
        name: "Max Pharmacy Pune",
        details: "Pune, Maharashtra",
        image: "https://images.unsplash.com/photo-1580281658626-ee379fecb6a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Get your prescriptions delivered in Pune.",
      },
      {
        name: "Personalcare & skincare",
        details: "Chennai, Tamil Nadu",
        image: "https://images.unsplash.com/photo-1580281658626-ee379fecb6a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Pharmacy services with quick delivery in Chennai.",
      },
      {
        name: "Healthfood & drinks",
        details: "Taking care of ur health",
        image: "https://images.unsplash.com/photo-1580281658626-ee379fecb6a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "Order medicines online in Bangalore.",
      },
      {
        name: "General medicine",
        details: "Medicine at ur hand",
        image: "https://images.unsplash.com/photo-1580281658626-ee379fecb6a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        description: "24/7 pharmacy support in Hyderabad.",
      },
    ],
  };

  // Pharmacy categories data
  const pharmacyCategories = [
    {
      name: "Summer Essentials",
      description: "Sunscreens, hydration supplements, and cooling products for summer.",
      image: "https://images.unsplash.com/photo-1620916566398-51f495e90a35?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      route: "/pharmacy/summer-essentials",
    },
    {
      name: "Vitamins & Supplements",
      description: "Multivitamins, immunity boosters, and dietary supplements.",
      image: "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      route: "/pharmacy/vitamins-supplements",
    },
    {
      name: "Sports Nutrition",
      description: "Protein powders, energy bars, and recovery supplements.",
      image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      route: "/pharmacy/sports-nutrition",
    },
    {
      name: "Personal Care & Skincare",
      description: "Moisturizers, cleansers, and specialized skincare products.",
      image: "https://images.unsplash.com/photo-1556227709-3d3f91f54604?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      route: "/pharmacy/personal-care-skincare",
    },
    {
      name: "Health Food & Drinks",
      description: "Nutritional shakes, herbal teas, and healthy snacks.",
      image: "https://images.unsplash.com/photo-1496412705862-e0088f16f791?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      route: "/pharmacy/health-food-drinks",
    },
    {
  name: "General Medicines",
  description: "Over-the-counter and prescription medications for common ailments.",
  image: "https://images.unsplash.com/photo-1580281658626-ee379fecb6a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  route: "/pharmacy/general-medicines",
}

  ];

  // Map services to their respective routes
  const serviceRoutes: Record<string, string> = {
    "Find a Doctor": "/doctors",
    "Book a Test": "/tests",
    "Spa & Physiotherapy": "/ServiceListingPage",
    "Locate Hospital": "/OurHospitals",
    "Hotel Booking": "/hotels",
    "Travel Booking": "/travel",
    "Translators": "/translatorList", // Updated to reflect Translators
    "Pharmacy": "/pharmacy",
  };

  // Handle service card click
  const handleServiceClick = (service: string) => {
    setSelectedService(selectedService === service ? null : service);
  };

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/pharmacy?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="bg-slate-50 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
            Schedule Your Appointment Online
          </h2>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search for Doctor"
                  value={doctorSearch}
                  onChange={(e) => setDoctorSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  aria-label="Search for a doctor"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  aria-label="Choose a location"
                >
                  <option value="">Choose Location</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Mumbai, Maharashtra">Mumbai, Maharashtra</option>
                  <option value="Pune, Maharashtra">Pune, Maharashtra</option>
                  <option value="Chennai, Tamil Nadu">Chennai, Tamil Nadu</option>
                  <option value="Bangalore, Karnataka">Bangalore, Karnataka</option>
                  <option value="Hyderabad, Telangana">Hyderabad, Telangana</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleBookAppointment}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg w-full shadow-md transition-all duration-300"
                  aria-label="Book an appointment or translator"
                >
                  Book an Appointment
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mt-8">
              <div
                onClick={() => handleServiceClick("Find a Doctor")}
                className={`border border-gray-200 text-center rounded-xl bg-gradient-to-b from-gray-50 to-white shadow-md hover:shadow-xl hover:border-indigo-500 transition-all duration-300 cursor-pointer ${
                  selectedService === "Find a Doctor" ? "border-indigo-500 bg-indigo-50" : ""
                }`}
              >
                <div className="p-4 flex flex-col items-center justify-center">
                  <div className="mb-2 bg-slate-100 p-3 rounded-full shadow-sm">
                    <User className="h-6 w-6 text-indigo-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-800">Find a Doctor</p>
                </div>
              </div>

              <div
                onClick={() => handleServiceClick("Book a Test")}
                className={`border border-gray-200 text-center rounded-xl bg-gradient-to-b from-gray-50 to-white shadow-md hover:shadow-xl hover:border-indigo-500 transition-all duration-300 cursor-pointer ${
                  selectedService === "Book a Test" ? "border-indigo-500 bg-indigo-50" : ""
                }`}
              >
                <div className="p-4 flex flex-col items-center justify-center">
                  <div className="mb-2 bg-slate-100 p-3 rounded-full shadow-sm">
                    <Calendar className="h-6 w-6 text-indigo-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-800">Book a Test</p>
                </div>
              </div>


                 <div
                onClick={() => handleServiceClick("Spa & Physiotherapy")}
                className={`border border-gray-200 text-center rounded-xl bg-gradient-to-b from-gray-50 to-white shadow-md hover:shadow-xl hover:border-indigo-500 transition-all duration-300 cursor-pointer ${
                  selectedService === "Spa & Physiotherapy" ? "border-indigo-500 bg-indigo-50" : ""
                }`}
              >
                <div className="p-4 flex flex-col items-center justify-center">
                  <div className="mb-2 bg-slate-100 p-3 rounded-full shadow-sm">
                    <MapPin className="h-6 w-6 text-indigo-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-800">Spa & Physiotherapy</p>
                </div>
              </div>
              

              <div
                onClick={() => handleServiceClick("Locate Hospital")}
                className={`border border-gray-200 text-center rounded-xl bg-gradient-to-b from-gray-50 to-white shadow-md hover:shadow-xl hover:border-indigo-500 transition-all duration-300 cursor-pointer ${
                  selectedService === "Locate Hospital" ? "border-indigo-500 bg-indigo-50" : ""
                }`}
              >
                <div className="p-4 flex flex-col items-center justify-center">
                  <div className="mb-2 bg-slate-100 p-3 rounded-full shadow-sm">
                    <MapPin className="h-6 w-6 text-indigo-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-800">Locate Hospital</p>
                </div>
              </div>

              <div
                onClick={() => handleServiceClick("Hotel Booking")}
                className={`border border-gray-200 text-center rounded-xl bg-gradient-to-b from-gray-50 to-white shadow-md hover:shadow-xl hover:border-indigo-500 transition-all duration-300 cursor-pointer ${
                  selectedService === "Hotel Booking" ? "border-indigo-500 bg-indigo-50" : ""
                }`}
              >
                <div className="p-4 flex flex-col items-center justify-center">
                  <div className="mb-2 bg-slate-100 p-3 rounded-full shadow-sm">
                    <Hotel className="h-6 w-6 text-indigo-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-800">Hotel Booking</p>
                </div>
              </div>

              <div
                onClick={() => handleServiceClick("Travel Booking")}
                className={`border border-gray-200 text-center rounded-xl bg-gradient-to-b from-gray-50 to-white shadow-md hover:shadow-xl hover:border-indigo-500 transition-all duration-300 cursor-pointer ${
                  selectedService === "Travel Booking" ? "border-indigo-500 bg-indigo-50" : ""
                }`}
              >
                <div className="p-4 flex flex-col items-center justify-center">
                  <div className="mb-2 bg-slate-100 p-3 rounded-full shadow-sm">
                    <Plane className="h-6 w-6 text-indigo-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-800">Travel Booking</p>
                </div>
              </div>

              <div
                onClick={() => handleServiceClick("Translators")}
                className={`border border-gray-200 text-center rounded-xl bg-gradient-to-b from-gray-50 to-white shadow-md hover:shadow-xl hover:border-indigo-500 transition-all duration-300 cursor-pointer ${
                  selectedService === "Translators" ? "border-indigo-500 bg-indigo-50" : ""
                }`}
              >
                <div className="p-4 flex flex-col items-center justify-center">
                  <div className="mb-2 bg-slate-100 p-3 rounded-full shadow-sm">
                    <PaperAirplaneIcon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-800">Translators</p>
                </div>
              </div>

              <div
                onClick={() => handleServiceClick("Pharmacy")}
                className={`border border-gray-200 text-center rounded-xl bg-gradient-to-b from-gray-50 to-white shadow-md hover:shadow-xl hover:border-indigo-500 transition-all duration-300 cursor-pointer ${
                  selectedService === "Pharmacy" ? "border-indigo-500 bg-indigo-50" : ""
                }`}
              >
                <div className="p-4 flex flex-col items-center justify-center">
                  <div className="mb-2 bg-slate-100 p-3 rounded-full shadow-sm">
                    <Pill className="h-6 w-6 text-indigo-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-800">Pharmacy</p>
                </div>
              </div>
            </div>

            {/* Display Content for the Selected Service */}
            {selectedService && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{selectedService}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedService === "Pharmacy" ? (
                    // Display Pharmacy Categories
                    pharmacyCategories.map((category, index) => (
                      <div
                        key={index}
                        onClick={() => handleCategoryClick(category.name)}
                        className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                      >
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">{category.name}</h4>
                        <p className="text-gray-500 text-sm">{category.description}</p>
                      </div>
                    ))
                  ) : (
                    // Display Other Service Items
                    serviceData[selectedService].slice(0, 6).map((item, index) => (
                      <div
                        key={index}
                        className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h4>
                        <p className="text-gray-600 text-sm mb-2">{item.details}</p>
                        <p className="text-gray-500 text-sm italic">{item.description}</p>
                      </div>
                    ))
                  )}
                </div>
                {/* Explore More Link */}
                <div className="mt-8 text-center">
                  <Link
                    to={serviceRoutes[selectedService]}
                    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300"
                  >
                    Explore More
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;