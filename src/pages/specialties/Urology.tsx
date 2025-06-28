





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

const Urology: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/hospitals/specialization/urology`);
        if (!response.ok) {
          throw new Error('Failed to fetch urology hospitals');
        }
        const data = await response.json();

        // Map API response to Hospital interface and filter for urology
        const urologyHospitals: Hospital[] = data
          .filter((hospital: any) => hospital.specialization.toLowerCase() === 'urology')
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
        const sortedHospitals = urologyHospitals.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setHospitals(sortedHospitals);
        setLoading(false);
      } catch (err) {
        setError('Error fetching urology hospital data. Please try again later.');
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  return (
    <div className="specialty-page min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Urology</h1>
        <p className="text-xl text-gray-700 mb-8 max-w-3xl leading-relaxed">
          The Urology Department provides expert care for disorders of the urinary tract and male reproductive system. Below is a list of our hospitals specializing in urology.
        </p>

        {/* Urology Hospitals List */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Urology Hospitals</h2>
          {loading ? (
            <p className="text-gray-600">Loading urology hospitals...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : hospitals.length === 0 ? (
            <p className="text-gray-600">No urology hospitals found.</p>
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

        {/* Understanding Urology */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Understanding Urology</h2>
          <p className="text-lg text-gray-600">
            Urology focuses on the diagnosis and treatment of conditions affecting the urinary tract (kidneys, ureters, bladder, urethra) and male reproductive organs. Our urologists manage conditions like urinary incontinence, prostate cancer, and erectile dysfunction with a combination of medical and surgical approaches.
          </p>
        </section>

        {/* Urology Services */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Urology Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Kidney Stone Treatment</h3>
              <p className="text-gray-600">Non-invasive and surgical options for kidney stone removal.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Prostate Care</h3>
              <p className="text-gray-600">Management of BPH and prostate cancer with medication or surgery.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Bladder Health</h3>
              <p className="text-gray-600">Treatment for incontinence, infections, and bladder cancer.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Urologic Surgery</h3>
              <p className="text-gray-600">Minimally invasive and robotic surgeries for urologic conditions.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Male Infertility</h3>
              <p className="text-gray-600">Evaluation and treatment for male reproductive issues.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Pediatric Urology</h3>
              <p className="text-gray-600">Care for congenital urologic conditions in children.</p>
            </div>
          </div>
        </section>

        {/* Common Urologic Conditions */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Conditions We Treat</h2>
          <ul className="list-disc ml-6 text-gray-600 space-y-2">
            <li><strong>Kidney Stones:</strong> Hard deposits in the kidneys causing pain and obstruction.</li>
            <li><strong>Prostate Cancer:</strong> Cancer of the prostate gland, common in older men.</li>
            <li><strong>Urinary Incontinence:</strong> Loss of bladder control, affecting quality of life.</li>
            <li><strong>BPH:</strong> Enlarged prostate causing urinary symptoms.</li>
            <li><strong>Bladder Infections:</strong> Recurrent infections requiring medical management.</li>
            <li><strong>Erectile Dysfunction:</strong> Inability to maintain an erection, treatable with medication or surgery.</li>
          </ul>
        </section>

        {/* Image Cards */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Visualizing Urology</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://www.niddk.nih.gov/-/media/images/urinary-system.jpg"
                alt="Urinary System"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">Urinary System</h3>
                <p className="text-gray-600 text-sm">An overview of the urinary tract and its functions.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2013/08/26/10/00/kidney-stone.jpg"
                alt="Kidney Stone"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">Kidney Stone</h3>
                <p className="text-gray-600 text-sm">Imaging of kidney stones for diagnosis and treatment planning.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://www.radiologyinfo.org/-/media/images/radiologyinfo/articles/cystoscopy.jpg"
                alt="Cystoscopy"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">Cystoscopy</h3>
                <p className="text-gray-600 text-sm">A procedure to examine the bladder and urethra.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Video Cards */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Learn More About Urology</h2>
          <p className="text-gray-600 mb-6">These videos provide insights into urologic health and treatments. [Note: Placeholder videos; replace with your hospital’s content.]</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/2Xz8A5vBWrU"
                  title="Understanding the Urinary System"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">Understanding the Urinary System</h3>
              <p className="text-gray-600 text-sm">An overview of the urinary tract and its role in health.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/5P5z0g7I8_w"
                  title="Managing Kidney Stones"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
             τί
              <h3 className="text-lg font-semibold text-gray-800 mt-4">Managing Kidney Stones</h3>
              <p className="text-gray-600 text-sm">Learn about kidney stone causes and treatments.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-blue-600 text-white py-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Take Charge of Your Urologic Health</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Our urology team is here to provide expert care. Schedule an appointment today.
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

export default Urology;