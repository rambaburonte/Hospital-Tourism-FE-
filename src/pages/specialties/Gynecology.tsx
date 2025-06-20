import React from 'react';

const Gynecology: React.FC = () => (
  <div className="specialty-page min-h-screen bg-gray-50 pt-20">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Gynecology</h1>
      <p className="text-xl text-gray-700 mb-8 max-w-3xl leading-relaxed">
        The Gynecology Department provides comprehensive care for women’s reproductive health. Our team of experienced gynecologists, obstetricians, and women’s health specialists offers personalized care for conditions affecting the female reproductive system, from adolescence through menopause.
      </p>

      {/* Understanding Gynecology */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Understanding Gynecology</h2>
        <p className="text-lg text-gray-600">
          Gynecology focuses on the health of the female reproductive system, including the uterus, ovaries, and vagina. Our gynecologists address conditions like menstrual disorders, infertility, and gynecologic cancers, with a focus on prevention, early detection, and advanced treatments.
        </p>
      </section>

      {/* Gynecology Services */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Gynecology Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Well-Woman Exams</h3>
            <p className="text-gray-600">Annual screenings, Pap smears, and breast exams for preventive care.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Obstetrics</h3>
            <p className="text-gray-600">Comprehensive prenatal, delivery, and postpartum care.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Minimally Invasive Surgery</h3>
            <p className="text-gray-600">Laparoscopic and robotic surgeries for fibroids and endometriosis.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Infertility Treatment</h3>
            <p className="text-gray-600">Fertility assessments and assisted reproductive technologies.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Menopause Management</h3>
            <p className="text-gray-600">Hormone therapy and lifestyle counseling for menopausal symptoms.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Gynecologic Oncology</h3>
            <p className="text-gray-600">Specialized care for ovarian, uterine, and cervical cancers.</p>
          </div>
        </div>
      </section>

      {/* Common Gynecologic Conditions */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Conditions We Treat</h2>
        <ul className="list-disc ml-6 text-gray-600 space-y-2">
          <li><strong>Fibroids:</strong> Non-cancerous growths in the uterus causing pain or bleeding.</li>
          <li><strong>Endometriosis:</strong> Tissue growth outside the uterus causing pelvic pain.</li>
          <li><strong>PCOS:</strong> Hormonal disorder affecting ovulation and menstrual cycles.</li>
          <li><strong>Urinary Incontinence:</strong> Loss of bladder control, common in women.</li>
          <li><strong>Cervical Cancer:</strong> Cancer of the cervix, often preventable with screening.</li>
          <li><strong>Menstrual Disorders:</strong> Irregular or painful periods requiring management.</li>
        </ul>
      </section>

      {/* Image Cards */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Visualizing Gynecology</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://www.womenshealth.gov/-/media/images/female-reproductive-system.jpg"
              alt="Female Reproductive System"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Female Reproductive System</h3>
              <p className="text-gray-600 text-sm">An overview of the female reproductive organs.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2013/08/26/10/00/ultrasound-pregnancy.jpg"
              alt="Ultrasound"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Ultrasound</h3>
              <p className="text-gray-600 text-sm">Ultrasound imaging for pregnancy and gynecologic conditions.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://www.radiologyinfo.org/-/media/images/radiologyinfo/articles/hysterosalpingography.jpg"
              alt="Hysterosalpingography"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Hysterosalpingography</h3>
              <p className="text-gray-600 text-sm">Imaging to assess the uterus and fallopian tubes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Cards */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Learn More About Gynecology</h2>
        <p className="text-gray-600 mb-6">These videos provide insights into women’s health and treatments. [Note: Placeholder videos; replace with your hospital’s content.]</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="relative pb-56.25 h-0">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/8x6C3rWn2Xs"
                title="Women’s Reproductive Health"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mt-4">Women’s Reproductive Health</h3>
            <p className="text-gray-600 text-sm">An overview of gynecologic health and care.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="relative pb-56.25 h-0">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/6t6x6r5Fds0"
                title="Understanding Endometriosis"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mt-4">Understanding Endometriosis</h3>
            <p className="text-gray-600 text-sm">Learn about endometriosis symptoms and treatments.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-blue-600 text-white py-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Empowering Women’s Health</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Our gynecology team is here to support your health. Schedule an appointment today.
        </p>
        <a
          href="[Insert appointment link]"
          className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition"
        >
          Book an Appointment
        </a>
      </section>
    </div>
  </div>
);

export default Gynecology;