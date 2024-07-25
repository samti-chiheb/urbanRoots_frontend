import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getGardens,
  getGardenById,
  createGarden,
  updateGarden,
  deleteGarden,
} from "../services/api/gardenService";
import useAxiosPrivate from "./useAxiosPrivate";
import { toast } from "react-toastify";
import handleApiErrors from "../utils/handleApiErrors";

/**
 * Hook pour les opérations CRUD sur les jardins urbains
 * @returns {Object} Les fonctions pour les opérations CRUD et les états de chargement et d'erreur
 */
const useGarden = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  // Requête pour récupérer tous les jardins urbains
  const gardensQuery = useQuery({
    queryKey: ["gardens"],
    queryFn: getGardens,
  });

  /**
   * Requête pour récupérer les détails d'un jardin urbain par ID
   * @param {string} gardenId L'ID du jardin urbain
   * @returns {Object} Les données du jardin et les états de chargement et d'erreur
   */
  const gardenQuery = (gardenId) => {
    return useQuery({
      queryKey: ["garden", gardenId],
      queryFn: () => getGardenById(gardenId),
      enabled: !!gardenId,
    });
  };

  // Mutation pour créer un nouveau jardin urbain
  const createGardenMutation = useMutation({
    mutationFn: async (gardenData) => {
      const response = await createGarden(gardenData, axiosPrivate);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["gardens"]);
      toast.success("Jardin créé avec succès !");
    },
    onError: handleApiErrors,
  });

  // Mutation pour mettre à jour un jardin urbain par ID
  const updateGardenMutation = useMutation({
    mutationFn: async ({ gardenId, gardenData }) => {
      const response = await updateGarden(gardenId, gardenData, axiosPrivate);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["gardens"]);
      queryClient.invalidateQueries(["garden"]);
      toast.success("Jardin mis à jour avec succès !");
    },
    onError: handleApiErrors,
  });

  // Mutation pour supprimer un jardin urbain par ID
  const deleteGardenMutation = useMutation({
    mutationFn: async (gardenId) => {
      const response = await deleteGarden(gardenId, axiosPrivate);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["gardens"]);
      toast.success("Jardin supprimé avec succès !");
    },
    onError: handleApiErrors,
  });

  return {
    gardensQuery,
    gardenQuery,
    createGardenMutation,
    updateGardenMutation,
    deleteGardenMutation,
  };
};

export default useGarden;
