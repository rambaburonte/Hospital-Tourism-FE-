


import React, { useEffect, useState } from 'react';
import { BASE_URL } from '@/config/config'; // Adjust the import path as necessary
interface Hospital {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: string;
  address: string;
  specialization: string;
}

const Neurology: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/hospitals/specialization/Neurology`);
        if (!response.ok) {
          throw new Error('Failed to fetch neurology hospitals');
        }
        const data = await response.json();

        // Map API response to Hospital interface and filter for neurology
        const neurologyHospitals: Hospital[] = data
          .filter((hospital: any) => hospital.specialization.toLowerCase() === 'neurology')
          .map((hospital: any) => ({
            id: hospital.hospitalId.toString(),
            name: hospital.hospitalName,
            description: hospital.hospitalDescription,
            image: hospital.hospitalImage,
            rating: hospital.rating,
            address: hospital.address,
            specialization: hospital.specialization,
          }));

        // Sort hospitals alphabetically by name
        const sortedHospitals = neurologyHospitals.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setHospitals(sortedHospitals);
        setLoading(false);
      } catch (err) {
        setError('Error fetching neurology hospital data. Please try again later.');
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  return (
    <div className="specialty-page min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Neurology</h1>
        <p className="text-xl text-gray-700 mb-8 max-w-3xl leading-relaxed">
          The Neurology Department provides comprehensive care for disorders of the brain, spine, and nervous system. Below is a list of our hospitals specializing in neurology.
        </p>

        {/* Neurology Hospitals List */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Neurology Hospitals</h2>
          {loading ? (
            <p className="text-gray-600">Loading neurology hospitals...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : hospitals.length === 0 ? (
            <p className="text-gray-600">No neurology hospitals found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hospitals.map(hospital => (
                <div key={hospital.id} className="bg-white p-6 rounded-lg shadow-md overflow-hidden">
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-full h-48 object-cover mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{hospital.name}</h3>
                  <p className="text-gray-600 mb-1"><strong>Description:</strong> {hospital.description}</p>
                  <p className="text-gray-600 mb-1"><strong>Location:</strong> {hospital.address}</p>
                  <p className="text-gray-600 mb-1"><strong>Rating:</strong> {hospital.rating}</p>
                  <p className="text-gray-600"><strong>Specialization:</strong> {hospital.specialization}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Understanding Neurology */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Understanding Neurology</h2>
          <p className="text-lg text-gray-600">
            Neurology is the medical specialty focused on diagnosing and treating disorders of the nervous system, including the brain, spinal cord, nerves, and muscles. Our neurologists address conditions such as epilepsy, stroke, Parkinson’s disease, and multiple sclerosis, emphasizing early diagnosis and innovative therapies.
          </p>
        </section>

        {/* Neurology Services */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Neurology Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Diagnostic Testing</h3>
              <p className="text-gray-600">Advanced imaging like MRI, CT, EEG, and EMG to diagnose neurological conditions accurately.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Stroke Care</h3>
              <p className="text-gray-600">Rapid intervention, thrombolytic therapy, and rehabilitation for stroke patients.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Epilepsy Management</h3>
              <p className="text-gray-600">Medication, ketogenic diet, and surgical options for seizure control.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Neurosurgery</h3>
              <p className="text-gray-600">Minimally invasive and complex surgeries for brain and spine disorders.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Neurorehabilitation</h3>
              <p className="text-gray-600">Physical, occupational, and speech therapy to support recovery.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Movement Disorders Clinic</h3>
              <p className="text-gray-600">Specialized care for Parkinson’s disease, tremors, and dystonia.</p>
            </div>
          </div>
        </section>

        {/* Common Neurological Conditions */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Conditions We Treat</h2>
          <ul className="list-disc ml-6 text-gray-600 space-y-2">
            <li><strong>Stroke:</strong> Sudden loss of brain function due to interrupted blood flow.</li>
            <li><strong>Epilepsy:</strong> Recurrent seizures caused by abnormal brain activity.</li>
            <li><strong>Parkinson’s Disease:</strong> A progressive disorder affecting movement and coordination.</li>
            <li><strong>Multiple Sclerosis:</strong> An autoimmune condition damaging nerve fibers.</li>
            <li><strong>Migraines:</strong> Severe headaches often accompanied by nausea and sensitivity to light.</li>
            <li><strong>Neuropathy:</strong> Nerve damage causing numbness, tingling, or weakness.</li>
          </ul>
        </section>

        {/* Image Cards */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Visualizing Neurology</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://www.ninds.nih.gov/sites/default/files/2020-06/brain-anatomy.jpg"
                alt="Brain Anatomy"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">Brain Anatomy</h3>
                <p className="text-gray-600 text-sm">A detailed view of the human brain, showcasing its regions and functions.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2013/08/26/10/00/mri-brain.jpg"
                alt="Brain MRI"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">Brain MRI</h3>
                <p className="text-gray-600 text-sm">MRI scans provide detailed images of brain structures to diagnose neurological conditions.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://www.radiologyinfo.org/-/media/images/radiologyinfo/articles/eeg.jpg"
                alt="EEG"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">Electroencephalogram (EEG)</h3>
                <p className="text-gray-600 text-sm">EEG records brain electrical activity to diagnose seizures and other disorders.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Video Cards */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Learn More About Neurology</h2>
          <p className="text-gray-600 mb-6">These videos provide insights into neurological health and treatments. [Note: Placeholder videos; replace with your hospital’s content.]</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/Jes_uhdjqY0"
                  title="Understanding the Nervous System"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">Understanding the Nervous System</h3>
              <p className="text-gray-600 text-sm">An overview of the nervous system and its role in body functions.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/7Osw89gfCjg"
                  title="What is a Stroke?"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">What is a Stroke?</h3>
              <p className="text-gray-600 text-sm">Learn about stroke symptoms, causes, and treatment options.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-blue-600 text-white py-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Take Control of Your Neurological Health</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Our neurology team is here to support you. Schedule an appointment today to address your neurological concerns.
          </p>
          <a
            href="/contact-us"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition"
          >
            Book an Appointment
          </a>
        </section>
      </div>
    </div>
  );
};

export default Neurology;