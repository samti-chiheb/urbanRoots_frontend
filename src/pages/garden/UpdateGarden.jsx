import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGarden from "../../hooks/useGarden";

const UpdateGarden = () => {
  const { gardenId } = useParams();
  const { gardenQuery, updateGardenMutation } = useGarden();
  const navigate = useNavigate();
  const { data: garden, isLoading, isError } = gardenQuery(gardenId);
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    postalCode: "",
    latitude: "",
    longitude: "",
    description: "",
  });

  useEffect(() => {
    if (garden) {
      setFormData({
        name: garden.name,
        street: garden.location.address.street,
        city: garden.location.address.city,
        postalCode: garden.location.address.postalCode,
        latitude: garden.location.coordinates.coordinates[0],
        longitude: garden.location.coordinates.coordinates[1],
        description: garden.description,
      });
    }
  }, [garden]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateGardenMutation.mutate(
      {
        gardenId,
        gardenData: formData,
      },
      {
        onSuccess: () => {
          navigate(`/gardens`);
        },
      }
    );
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (isError) {
    return <div>Erreur lors du chargement du jardin.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mettre à jour le Jardin</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nom
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="street"
            className="block text-sm font-medium text-gray-700"
          >
            Rue
          </label>
          <input
            type="text"
            name="street"
            id="street"
            value={formData.street}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            Ville
          </label>
          <input
            type="text"
            name="city"
            id="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="postalCode"
            className="block text-sm font-medium text-gray-700"
          >
            Code Postal
          </label>
          <input
            type="text"
            name="postalCode"
            id="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="latitude"
            className="block text-sm font-medium text-gray-700"
          >
            Latitude
          </label>
          <input
            type="text"
            name="latitude"
            id="latitude"
            value={formData.latitude}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="longitude"
            className="block text-sm font-medium text-gray-700"
          >
            Longitude
          </label>
          <input
            type="text"
            name="longitude"
            id="longitude"
            value={formData.longitude}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
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
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          disabled={updateGardenMutation.isLoading}
        >
          {updateGardenMutation.isLoading ? "Soumission..." : "Soumettre"}
        </button>
      </form>
    </div>
  );
};

export default UpdateGarden;
