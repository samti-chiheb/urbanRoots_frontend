import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCommentsByPost,
  createComment,
  updateComment,
  deleteComment,
  upvoteComment,
  downvoteComment,
} from "../../services/api/commentService";
import useAxiosPrivate from "../useAxiosPrivate";

const useComments = (postId) => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  // Hook pour récupérer les commentaires
  const {
    data: comments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getCommentsByPost(postId),
  });

  // Mutation pour créer un commentaire
  const createCommentMutation = useMutation({
    mutationFn: (commentData) => createComment(commentData, axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId]);
    },
  });

  // Mutation pour mettre à jour un commentaire
  const updateCommentMutation = useMutation({
    mutationFn: ({ commentId, commentData }) =>
      updateComment(commentId, commentData, axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId]);
    },
  });

  // Mutation pour supprimer un commentaire
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId) => deleteComment(commentId, axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId]);
    },
  });

  // Mutation pour upvoter un commentaire
  const upvoteCommentMutation = useMutation({
    mutationFn: (commentId) => upvoteComment(commentId, axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId]);
    },
  });

  // Mutation pour downvoter un commentaire
  const downvoteCommentMutation = useMutation({
    mutationFn: (commentId) => downvoteComment(commentId, axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId]);
    },
  });

  return {
    comments,
    isLoading,
    error,
    createCommentMutation,
    updateCommentMutation,
    deleteCommentMutation,
    upvoteCommentMutation,
    downvoteCommentMutation,
  };
};

export default useComments;
