import axios from "./axiosInstance";

// Récupérer toutes les annonces d'échange
export const getExchanges = async () => {
  const response = await axios.get("/exchanges");
  return response.data;
};

// Récupérer une annonce spécifique par ID
export const getExchangeById = async (exchangeId) => {
  const response = await axios.get(`/exchanges/${exchangeId}`);
  return response.data;
};

// Créer une nouvelle annonce d'échange
export const createExchange = async (exchangeData, axiosPrivate) => {
  const response = await axiosPrivate.post("/exchanges", exchangeData);
  return response.data;
};

// Mettre à jour une annonce d'échange
export const updateExchange = async (
  exchangeId,
  exchangeData,
  axiosPrivate
) => {
  const response = await axiosPrivate.put(
    `/exchanges/${exchangeId}`,
    exchangeData
  );
  return response.data;
};

// Supprimer une annonce d'échange
export const deleteExchange = async (exchangeId, axiosPrivate) => {
  const response = await axiosPrivate.delete(`/exchanges/${exchangeId}`);
  return response.data;
};