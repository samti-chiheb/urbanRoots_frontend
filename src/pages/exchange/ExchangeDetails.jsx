import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useMessages from "../../hooks/useMessages";
import useExchanges from "../../hooks/useExchanges";
import { FiMail, FiCheckCircle, FiXCircle, FiClock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// Fonction pour retourner la couleur du statut
const getStatusColor = (status) => {
  switch (status) {
    case "actif":
      return "text-green-500"; // Vert pour actif
    case "annulé":
      return "text-red-500"; // Rouge pour annulé
    case "completé":
      return "text-gray-500"; // Gris pour complété
    case "réservé":
      return "text-yellow-500"; // Jaune pour réservé
    default:
      return "text-gray-300"; // Couleur par défaut si aucun statut ne correspond
  }
};

const ExchangeDetails = () => {
  const { id } = useParams(); // Récupère l'ID de l'annonce depuis l'URL
  const { exchanges, isLoading, error } = useExchanges();
  const { sendMessageMutation } = useMessages(); // Hook pour envoyer un message

  const [showMessageForm, setShowMessageForm] = useState(false); // État pour afficher ou masquer le formulaire
  const [messageContent, setMessageContent] = useState(""); // État pour le contenu du message
  const [imageError, setImageError] = useState(false); // État pour gérer l'erreur de chargement de l'image

  const navigate = useNavigate();
  // Recherche de l'annonce par ID
  const exchange = exchanges ? exchanges.find((ex) => ex._id === id) : null;

  if (isLoading) return <p>Chargement des détails de l'annonce...</p>;
  if (error)
    return <p>Erreur lors de la récupération des détails de l'annonce.</p>;
  if (!exchange) return <p>Annonce non trouvée.</p>;

  // Fonction pour gérer l'envoi du message
  const handleSendMessage = () => {
    navigate("/messages");

    if (!messageContent.trim()) return; // Ne pas envoyer de message vide

    // Mutation pour envoyer un message
    sendMessageMutation.mutate(
      {
        exchangeId: exchange._id,
        receiverId: exchange.createdBy._id, // ID du créateur de l'annonce
        content: messageContent,
      },
      {
        onSuccess: () => {
          setMessageContent(""); // Réinitialiser le champ
          setShowMessageForm(false); // Fermer le formulaire après l'envoi
          alert("Message envoyé avec succès !");
        },
        onError: (error) => {
          alert(`Erreur lors de l'envoi du message : ${error.message}`);
        },
      }
    );
  };

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Affichage de l'image uniquement si l'URL est présente et valide */}
        {exchange.imageUrl && !imageError && (
          <img
            src={exchange.imageUrl}
            alt={exchange.title}
            className="w-full h-64 object-cover"
            onError={() => setImageError(true)} // Cache l'image si elle est cassée
          />
        )}

        <div className="p-6">
          {/* Titre et statut */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">
              {exchange.title}
            </h1>
            <span className="flex items-center">
              <FiCheckCircle
                className={`w-5 h-5 ${getStatusColor(exchange.status)} mr-2`}
              />
              <span className={`text-sm ${getStatusColor(exchange.status)}`}>
                {exchange.status}
              </span>
            </span>
          </div>

          {/* Détails de l'annonce */}
          <p className="text-lg text-gray-700 mb-4">{exchange.description}</p>
          <div className="text-sm text-gray-500 mb-4">
            <p>Catégorie : {exchange.category}</p>
            <p>Lieu : {exchange.location}</p>
            <p>
              Créé par : {exchange.createdBy.firstname}{" "}
              {exchange.createdBy.lastname} ({exchange.createdBy.username})
            </p>
            <p>
              Date de création :{" "}
              {new Date(exchange.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Bouton pour contacter le créateur */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 flex items-center"
            onClick={() => setShowMessageForm(!showMessageForm)} // Afficher/Masquer le formulaire
          >
            <FiMail className="mr-2" />
            {showMessageForm ? "Annuler" : "Contacter le créateur"}
          </button>

          {/* Formulaire de message */}
          {showMessageForm && (
            <div className="mt-4 bg-gray-100 p-4 rounded-lg">
              <textarea
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Écrivez votre message..."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
              />
              <div className="flex justify-end mt-2">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
                  onClick={handleSendMessage}
                >
                  Envoyer
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={() => setShowMessageForm(false)} // Fermer le formulaire
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExchangeDetails;
