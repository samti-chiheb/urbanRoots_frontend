import React from "react";
import { useNavigate } from "react-router-dom";

const MissingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-5">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <p className="text-2xl font-bold text-gray-800 mt-4">
          Oups! Page introuvable
        </p>
        <p className="text-gray-500 mt-2">
          La page que vous recherchez n'existe pas.
        </p>
        <button
          onClick={() => navigate(-2)}
          className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Retourner à la page précédente
        </button>
      </div>
    </div>
  );
};

export default MissingPage;
