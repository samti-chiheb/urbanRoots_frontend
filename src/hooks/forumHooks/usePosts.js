import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPostsByForum,
  likePost,
  dislikePost,
} from "../../services/api/postService";
import useAxiosPrivate from "../useAxiosPrivate";
import handleApiErrors from "../../utils/handleApiErrors";

const usePosts = (forumId) => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  // Hook pour récupérer les posts
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", forumId],
    queryFn: () => getPostsByForum(forumId),
  });

  // Mutation pour liker un post
  const likeMutation = useMutation({
    mutationFn: (postId) => likePost(postId, axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", forumId]);
    },
    onError: handleApiErrors,
  });

  // Mutation pour disliker un post
  const dislikeMutation = useMutation({
    mutationFn: (postId) => dislikePost(postId, axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", forumId]);
    },
    onError: handleApiErrors,
  });

  return { posts, isLoading, error, likeMutation, dislikeMutation };
};

export default usePosts;
