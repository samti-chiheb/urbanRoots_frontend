import React from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import useGarden from "../../hooks/useGarden";
import useAuth from "../../hooks/useAuth";

const GardenDetails = ({ selectedGarden }) => {
  const navigate = useNavigate();
  const { deleteGardenMutation } = useGarden();
  const { auth } = useAuth();

  if (!selectedGarden) return null;

  const { name, description, location, author, createdAt } = selectedGarden;

  const handleDelete = () => {
    if (window.confirm("Voulez-vous vraiment supprimer ce jardin ?")) {
      deleteGardenMutation.mutate(selectedGarden._id);
    }
  };

  const isCreator = auth?.userInfo.id === author?._id;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{name}</h2>
        {isCreator && (
          <div className="flex space-x-2">
            <button
              onClick={() => navigate(`/update-garden/${selectedGarden._id}`)}
              className="text-blue-500 hover:text-blue-700"
            >
              <FiEdit size={20} />
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700"
            >
              <FiTrash2 size={20} />
            </button>
          </div>
        )}
      </div>
      <p className="mb-4">{description}</p>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Adresse</h3>
        <p>
          {location.address.street}, {location.address.city},{" "}
          {location.address.postalCode}
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Créé par</h3>
        <p>{author?.username}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Créé le</h3>
        <p>{new Date(createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default GardenDetails;
