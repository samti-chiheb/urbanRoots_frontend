import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressForm from "../../components/garden/AddressForm";
import Map from "../../components/garden/Map";
import useGarden from "../../hooks/useGarden";

const AddGarden = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    street: "",
    city: "",
    postalCode: "",
    lat: null,
    lng: null,
  });

  const { createGardenMutation } = useGarden();
  const navigate = useNavigate();

  const handleLocationSelect = (location) => {
    setFormData({ ...formData, ...location });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const gardenData = {
      name: formData.name,
      street: formData.street,
      city: formData.city,
      postalCode: formData.postalCode,
      type: "Point",
      latitude: formData.lat, // Utiliser lat comme latitude
      longitude: formData.lng, // Utiliser lng comme longitude
      description: formData.description,
    };
    createGardenMutation.mutate(gardenData, {
      onSuccess: () => {
        // Reset the form after successful submission
        setFormData({
          name: "",
          description: "",
          street: "",
          city: "",
          postalCode: "",
          lat: null,
          lng: null,
        });
        navigate("/map");
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ajouter un Nouveau Jardin</h1>
      <div className="flex space-x-4">
        <div className="w-1/2">
          <AddressForm formData={formData} setFormData={setFormData} />
          <div className="mt-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              rows="4"
            />
          </div>
        </div>
        <div className="w-1/2">
          <Map formData={formData} onSelectLocation={handleLocationSelect} />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        disabled={createGardenMutation.isLoading}
      >
        {createGardenMutation.isLoading ? "Soumission..." : "Soumettre"}
      </button>
    </div>
  );
};

export default AddGarden;
