import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  sendMessage,
  getMessagesByExchange,
  getUserConversations,
} from "../services/api/messageService";
import useAxiosPrivate from "./useAxiosPrivate";
import handleApiErrors from "../utils/handleApiErrors";

const useMessages = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  // Hook pour récupérer toutes les conversations de l'utilisateur
  const {
    data: conversations,
    isLoading: isLoadingConversations,
    error: conversationsError,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => getUserConversations(axiosPrivate),
  });

  // Hook pour récupérer les messages d'une annonce spécifique
  const getMessagesByExchangeQuery = (exchangeId) =>
    useQuery({
      queryKey: ["messages", exchangeId],
      queryFn: () => getMessagesByExchange(exchangeId, axiosPrivate),
    });

  // Mutation pour envoyer un message
  const sendMessageMutation = useMutation({
    mutationFn: (messageData) => sendMessage(messageData, axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
    onError: handleApiErrors,
  });

  return {
    conversations,
    isLoadingConversations,
    conversationsError,
    getMessagesByExchangeQuery,
    sendMessageMutation,
  };
};

export default useMessages;
