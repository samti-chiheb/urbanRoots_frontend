import axios from "./axiosInstance";
import handleApiErrors from "../../utils/handleApiErrors";

export const getCommentsByPost = async (postId) => {
  try {
    const response = await axios.get(`comments/${postId}`);
    return response.data;
  } catch (error) {
    handleApiErrors(error);
  }
};

export const createComment = async (commentData, axiosPrivate) => {
  try {
    const response = await axiosPrivate.post("/comments", commentData);
    return response.data;
  } catch (error) {
    handleApiErrors(error);
  }
};

export const updateComment = async (commentId, commentData, axiosPrivate) => {
  try {
    const response = await axiosPrivate.put(
      `/comments/${commentId}`,
      commentData
    );
    return response.data;
  } catch (error) {
    handleApiErrors(error);
  }
};

export const deleteComment = async (commentId, axiosPrivate) => {
  try {
    const response = await axiosPrivate.delete(`/comments/${commentId}`);
    return response.data;
  } catch (error) {
    handleApiErrors(error);
  }
};

export const upvoteComment = async (commentId, axiosPrivate) => {
  try {
    const response = await axiosPrivate.patch(`/comments/${commentId}/upvote`);
    return response.data;
  } catch (error) {
    handleApiErrors(error);
  }
};

export const downvoteComment = async (commentId, axiosPrivate) => {
  try {
    const response = await axiosPrivate.patch(
      `/comments/${commentId}/downvote`
    );
    return response.data;
  } catch (error) {
    handleApiErrors(error);
  }
};
