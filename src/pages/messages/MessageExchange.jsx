import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useMessages from "../../hooks/useMessages";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";

const MessageExchange = () => {
  const { exchangeId } = useParams();
  const { getMessagesByExchangeQuery, sendMessageMutation } = useMessages();
  const axiosPrivate = useAxiosPrivate();
  const {
    data: messages,
    isLoading,
    error,
  } = getMessagesByExchangeQuery(exchangeId);

  const [messageContent, setMessageContent] = useState("");

  // Fonction pour envoyer un nouveau message
  const handleSendMessage = () => {
    if (!messageContent.trim()) return;

    sendMessageMutation.mutate(
      {
        exchangeId,
        content: messageContent,
        receiverId: messages[0].receiver._id,
      },
      {
        onSuccess: () => {
          setMessageContent("");
          toast.success("Message envoyé avec succès !");
        },
        onError: (error) => {
          toast.error(`Erreur lors de l'envoi du message : ${error.message}`);
        },
      }
    );
  };

  if (isLoading) return <p>Chargement des messages...</p>;
  if (error) return <p>Erreur lors de la récupération des messages.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Messages pour l'annonce</h1>
      <div className="mb-4">
        {messages && messages.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 p-2 rounded-lg ${
                message.sender._id === axiosPrivate.userId
                  ? "bg-blue-100"
                  : "bg-gray-100"
              }`}
            >
              <p>{message.content}</p>
              <p className="text-xs text-gray-500">
                {message.sender.username} -{" "}
                {new Date(message.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>Aucun message pour cette annonce.</p>
        )}
      </div>

      {/* Formulaire pour envoyer un message */}
      <div className="flex items-center">
        <input
          type="text"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Écrivez un message..."
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-indigo-600 text-white px-4 py-2 rounded-md"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default MessageExchange;
