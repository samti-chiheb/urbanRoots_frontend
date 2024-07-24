import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPostById,
  updatePost,
  deletePost,
} from "../../services/api/postService";
import useAxiosPrivate from "../useAxiosPrivate";

import handleApiErrors from "../../utils/handleApiErrors";

const usePost = (postId) => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  // Hook pour récupérer un seul post
  const {
    data: post,
    isLoading: postLoading,
    error: postError,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
  });

  // Mutation pour mettre à jour un post
  const updatePostMutation = useMutation({
    mutationFn: ({ postId, postData }) =>
      updatePost(postId, postData, axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries(["post", postId]);
      queryClient.invalidateQueries("posts"); // Si vous avez une liste de posts à invalider
    },
    onError: handleApiErrors,
  });

  // Mutation pour supprimer un post
  const deletePostMutation = useMutation({
    mutationFn: (postId) => deletePost(postId, axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
    onError: handleApiErrors,
  });

  return {
    post,
    postLoading,
    postError,
    updatePostMutation,
    deletePostMutation,
  };
};

export default usePost;