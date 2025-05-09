import React, { useState } from "react";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation
    if (!formData.name || !formData.email || !formData.message) {
      setError("All fields are required!");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate sending the form data (You can replace this with an actual API call)
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Contact Us</h2>

      {isSubmitted ? (
        <div className="bg-green-100 text-green-800 p-6 rounded-md text-center shadow-md">
          <h3 className="font-semibold text-xl">Thank you for reaching out to us! We will get back to you soon.</h3>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="text-red-600 text-center">{error}</div>}

          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="6"
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full p-4 bg-teal-600 text-white font-semibold rounded-lg shadow-lg hover:bg-teal-700 transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactUsPage;
