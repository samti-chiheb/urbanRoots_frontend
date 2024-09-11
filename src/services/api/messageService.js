import axios from "./axiosInstance";

// Envoyer un message
export const sendMessage = async (messageData, axiosPrivate) => {
  const response = await axiosPrivate.post("/messages", messageData);
  return response.data;
};

// Récupérer tous les messages liés à une annonce d'échange spécifique
export const getMessagesByExchange = async (exchangeId, axiosPrivate) => {
  const response = await axiosPrivate.get(`/messages/exchange/${exchangeId}`);
  return response.data;
};

// Récupérer toutes les conversations d'un utilisateur
export const getUserConversations = async (axiosPrivate) => {
  const response = await axiosPrivate.get("/messages/conversations");
  return response.data;
};