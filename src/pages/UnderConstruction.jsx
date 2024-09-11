import React from "react";
import { Link } from "react-router-dom";
import { FiTool } from "react-icons/fi";

const UnderConstruction = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        {/* Icone d'outils */}
        <div className="animate-pulse text-yellow-500 mb-4">
          <FiTool size={50} />
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Section en cours de construction
        </h1>

        <p className="text-gray-600 mb-6">
          Nous travaillons dur pour améliorer cette section. Revenez bientôt
          pour découvrir les nouveautés !
        </p>

        {/* Bouton pour revenir à l'accueil */}
        <Link
          to="/"
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-600 transition duration-300"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default UnderConstruction;