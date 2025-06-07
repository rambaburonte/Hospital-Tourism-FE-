import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from './sidebar';

interface Location {
  locationId: number;
  city: string;
  state: string;
  country: string;
}

const UploadPhysio: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [formData, setFormData] = useState({
    physioName: "",
    physioDescription: "",
    physioImage: "",
    rating: "",
    address: "",
    price: "",
    locationId: "",
  });
const base_url="https://healthtourism-5.onrender.com"
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/locations")
      .then((response) => setLocations(response.data))
      .catch((error) => console.error("Error fetching locations", error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      locationId: parseInt(formData.locationId, 10),
    };

    axios
      .post("http://localhost:8080/physio/save-Physio", payload)
      .then(() => {
        alert("Physio uploaded successfully!");
        setFormData({
          physioName: "",
          physioDescription: "",
          physioImage: "",
          rating: "",
          address: "",
          price: "",
          locationId: "",
        });
      })
      .catch((error) => {
        console.error("Upload failed:", error);
        alert("Failed to upload physio");
      });
  };

  return (
    <>
    <Sidebar/>
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Upload Physio</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

          <select
          name="locationId"
          value={formData.locationId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Location</option>
          {locations.map((loc) => (
            <option key={loc.locationId} value={loc.locationId}>
              {loc.city}, {loc.state}, {loc.country}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="physioName"
          placeholder="Physio Name"
          value={formData.physioName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="physioDescription"
          placeholder="Description"
          value={formData.physioDescription}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="physioImage"
          placeholder="Image URL"
          value={formData.physioImage}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="rating"
          placeholder="Rating (e.g. 4.5)"
          value={formData.rating}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Price (e.g. 50 USD)"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Upload Physio
        </button>
      </form>
    </div>
    </>
  );
};

export default UploadPhysio;
