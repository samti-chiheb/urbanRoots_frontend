import useAxiosPrivate from "../useAxiosPrivate";
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

  const likeExistingPost = async (postId) => {
    return await likePost(postId, axiosPrivate);
  };

  const dislikeExistingPost = async (postId) => {
    return await dislikePost(postId, axiosPrivate);
  };

  return {
    createNewPost,
    updateExistingPost,
    deleteExistingPost,
    likeExistingPost,
    dislikeExistingPost,
  };
};

export default usePostActions;