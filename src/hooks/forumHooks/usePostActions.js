import useAxiosPrivate from "../useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";
import {
  createPost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
} from "../../services/api/postService";

const usePostActions = () => {
  const axiosPrivate = useAxiosPrivate();

  const createNewPost = async (postData) => {
    return await createPost(postData, axiosPrivate);
  };

  const updateExistingPost = async (postId, postData) => {
    return await updatePost(postId, postData, axiosPrivate);
  };

  const deleteExistingPost = async (postId) => {
    return await deletePost(postId, axiosPrivate);
  };

  const likeMutation = useMutation((postId) => likePost(postId));
  const dislikeMutation = useMutation((postId) => dislikePost(postId));

  return {
    createNewPost,
    updateExistingPost,
    deleteExistingPost,
    likeMutation,
    dislikeMutation,
  };
};

export default usePostActions;
