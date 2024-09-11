import React from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi"; // Utilisation d'icônes pour modifier et supprimer
import useExchanges from "../hooks/useExchanges";

// Fonction pour retourner la couleur du statut
const getStatusColor = (status) => {
  switch (status) {
    case "actif":
      return "bg-green-500"; // Vert pour actif
    case "annulé":
      return "bg-red-500"; // Rouge pour annulé
    case "completé":
      return "bg-gray-500"; // Gris pour complété
    case "réservé":
      return "bg-yellow-500"; // Jaune pour réservé
    default:
      return "bg-gray-300"; // Couleur par défaut si aucun statut ne correspond
  }
};

const ExchangeItem = ({ exchange }) => {
  const { deleteExchangeMutation } = useExchanges();

  const handleDelete = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?")) {
      deleteExchangeMutation.mutate(exchange._id);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">{exchange.title}</h2>
      <p>{exchange.description}</p>
      <p className="text-sm text-gray-500">Catégorie : {exchange.category}</p>

      {/* Affichage du statut avec cercle coloré */}
      <div className="flex items-center mt-2">
        <div
          className={`w-3 h-3 rounded-full ${getStatusColor(
            exchange.status
          )} mr-2`}
        ></div>
        <span className="text-sm text-gray-600">
          Statut : {exchange.status}
        </span>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <Link
          to={`/exchange/${exchange._id}`}
          className="text-blue-500 inline-block"
        >
          Voir les détails
        </Link>

        <div className="flex space-x-2">
          {/* Bouton pour modifier l'annonce */}
          <Link
            to={`/edit-exchange/${exchange._id}`}
            className="text-green-500 hover:text-green-700"
            title="Modifier"
          >
            <FiEdit size={20} />
          </Link>

          {/* Bouton pour supprimer l'annonce */}
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
            title="Supprimer"
          >
            <FiTrash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExchangeItem;
