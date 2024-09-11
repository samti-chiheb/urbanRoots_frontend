import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getExchanges,
  createExchange,
  updateExchange,
  deleteExchange,
} from "../services/api/exchangeService";
import useAxiosPrivate from "./useAxiosPrivate";
import handleApiErrors from "../utils/handleApiErrors";
import { toast } from "react-toastify";

const useExchanges = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  // Hook pour récupérer toutes les annonces d'échange
  const {
    data: exchanges,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["exchanges"],
    queryFn: getExchanges,
  });

  // Mutation pour créer une annonce d'échange
  const createExchangeMutation = useMutation({
    mutationFn: (exchangeData) => createExchange(exchangeData, axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries(["exchanges"]);
      toast.success("Annonce créée avec succès !");
    },
    onError: handleApiErrors,
  });

  // Mutation pour mettre à jour une annonce d'échange
  const updateExchangeMutation = useMutation({
    mutationFn: ({ exchangeId, exchangeData }) =>
      updateExchange(exchangeId, exchangeData, axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries(["exchanges"]);
      toast.success("Annonce mise à jour avec succès !");
    },
    onError: handleApiErrors,
  });

  // Mutation pour supprimer une annonce d'échange
  const deleteExchangeMutation = useMutation({
    mutationFn: (exchangeId) => deleteExchange(exchangeId, axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries(["exchanges"]);
      toast.success("annance supprimer avec succès");
    },
    onError: handleApiErrors,
  });

  return {
    exchanges,
    isLoading,
    error,
    createExchangeMutation,
    updateExchangeMutation,
    deleteExchangeMutation,
  };
};

export default useExchanges;
