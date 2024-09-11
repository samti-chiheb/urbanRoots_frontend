import React from "react";
import useMessages from "../../hooks/useMessages";
import { Link } from "react-router-dom";

const Conversations = () => {
  const { conversations, isLoadingConversations, conversationsError } =
    useMessages();

  if (isLoadingConversations) return <p>Chargement des conversations...</p>;
  if (conversationsError)
    return <p>Erreur lors de la récupération des conversations.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mes Conversations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {conversations && conversations.length > 0 ? (
          conversations.map((conversation, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">
                Conversation avec {conversation.otherUser.username}
              </h2>
              <p className="text-gray-600">
                Annonce : {conversation.exchange.title}
              </p>
              <p className="text-gray-500">
                Dernier message : {conversation.lastMessage}
              </p>
              <Link
                to={`/messages/exchange/${conversation.exchange._id}`}
                className="text-blue-500 mt-2 inline-block"
              >
                Voir la conversation
              </Link>
            </div>
          ))
        ) : (
          <p>Aucune conversation disponible.</p>
        )}
      </div>
    </div>
  );
};

export default Conversations;
