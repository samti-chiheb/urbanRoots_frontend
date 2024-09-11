import React from "react";
import useExchanges from "../../hooks/useExchanges";
import { Link } from "react-router-dom";
import ExchangeItem from "../../components/ExchangeItem"; // Importation du composant ExchangeItem

const ExchangeList = () => {
  const { exchanges, isLoading, error } = useExchanges();

  if (isLoading) return <p>Chargement des annonces...</p>;
  if (error) return <p>Erreur lors de la récupération des annonces.</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Liste des annonces d'échange</h1>
        {/* Bouton de création d'une nouvelle annonce */}
        <Link
          to="/create-exchange"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Créer une annonce
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exchanges && exchanges.length > 0 ? (
          exchanges.map((exchange) => (
            <ExchangeItem key={exchange._id} exchange={exchange} />
          ))
        ) : (
          <p>Aucune annonce disponible.</p>
        )}
      </div>
    </div>
  );
};

export default ExchangeList;
