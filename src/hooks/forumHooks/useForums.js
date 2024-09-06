import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getForums,
  createForum,
  updateForum,
  deleteForum,
} from "../../services/api/forumService";
import useAxiosPrivate from "../useAxiosPrivate";
import handleApiErrors from "../../utils/handleApiErrors";
import { toast } from "react-toastify";

const useForums = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  // Hook pour récupérer tous les forums
  const {
    data: forums,
    isLoading: isLoadingForums,
    error: errorForums,
  } = useQuery({
    queryKey: ["forums"],
    queryFn: getForums,
  });

  // Mutation pour créer un forum
  const createForumMutation = useMutation({
    mutationFn: (forumData) => createForum(forumData, axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries(["forums"]);
      toast.success("Forum créé avec succès");
    },
    onError: handleApiErrors,
  });

  // Mutation pour mettre à jour un forum
  const updateForumMutation = useMutation({
    mutationFn: ({ forumId, forumData }) =>
      {
        return updateForum(forumId, forumData, axiosPrivate)},
    onSuccess: () => {
      queryClient.invalidateQueries(["forums"]);
       toast.success("Forum modifier avec succès");
    },
    onError: handleApiErrors,
  });

  // Mutation pour supprimer un forum
  const deleteForumMutation = useMutation({
    mutationFn: (forumId) => deleteForum(forumId, axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries(["forums"]),
        toast.success("Forum supprimer avec succès");
    },
    onError: handleApiErrors,
  });

  return {
    forums,
    isLoadingForums,
    errorForums,
    createForumMutation,
    updateForumMutation,
    deleteForumMutation,
  };
};

export default useForums;
