import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPostById,
  likePost,
  dislikePost,
} from "../../services/api/postService";
import useAxiosPrivate from "../useAxiosPrivate";

const usePost = (postId) => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  // Hook pour récupérer un post
  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
  });

  // Mutation pour liker un post
  const likeMutation = useMutation({
    mutationFn: () => likePost(postId, axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries(["post", postId]);
    },
  });

  // Mutation pour disliker un post
  const dislikeMutation = useMutation({
    mutationFn: () => dislikePost(postId, axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries(["post", postId]);
    },
  });

  return { post, isLoading, error, likeMutation, dislikeMutation };
};

export default usePost;
