import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { BASE_URL } from '@/config/config';
interface Location {
  locationId: number;
  city: string;
  state: string;
  country: string;
}

const UploadPhysio: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    physioName: "",
    physioDescription: "",
    rating: "",
    address: "",
    price: "",
    locationId: "",
  });

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/locations`)
      .then((response) => setLocations(response.data))
      .catch((error) => console.error("Error fetching locations", error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = new FormData();
    submitData.append('physioName', formData.physioName);
    submitData.append('physioDescription', formData.physioDescription);
    submitData.append('rating', formData.rating);
    submitData.append('address', formData.address);
    submitData.append('price', formData.price);
    submitData.append('locationId', formData.locationId);
    
    if (imageFile) {
      submitData.append('physioImage', imageFile);
    }

    axios
      .post(`${BASE_URL}/physio/save-Physio`, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        alert("Physio uploaded successfully!");
        setFormData({
          physioName: "",
          physioDescription: "",
          rating: "",
          address: "",
          price: "",
          locationId: "",
        });
        setImageFile(null);
      })
      .catch((error) => {
        console.error("Upload failed:", error);
        alert("Failed to upload physio");
      });
  };

  return (
    <>
    <AdminSidebar/>
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
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
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
