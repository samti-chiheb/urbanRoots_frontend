import useAxiosPrivate from "../useAxiosPrivate";
import {
  createComment,
  updateComment,
  deleteComment,
  upvoteComment,
  downvoteComment,
} from "../../services/api/commentService";

const useCommentActions = () => {
  const axiosPrivate = useAxiosPrivate();

  const createNewComment = async (commentData) => {
    return await createComment(commentData, axiosPrivate);
  };

  const updateExistingComment = async (commentId, commentData) => {
    return await updateComment(commentId, commentData, axiosPrivate);
  };

  const deleteExistingComment = async (commentId) => {
    return await deleteComment(commentId, axiosPrivate);
  };

  const upvoteExistingComment = async (commentId) => {
    return await upvoteComment(commentId, axiosPrivate);
  };

  const downvoteExistingComment = async (commentId) => {
    return await downvoteComment(commentId, axiosPrivate);
  };

  return {
    createNewComment,
    updateExistingComment,
    deleteExistingComment,
    upvoteExistingComment,
    downvoteExistingComment,
  };
};

export default useCommentActions;