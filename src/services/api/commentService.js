import axios from "./axiosInstance";

export const getCommentsByPost = async (postId) => {
  const response = await axios.get(`comments/${postId}`);
  return response.data;
};

export const createComment = async (commentData, axiosPrivate) => {
  const response = await axiosPrivate.post("/comments", commentData);
  return response.data;
};

export const updateComment = async (commentId, commentData, axiosPrivate) => {
  const response = await axiosPrivate.put(
    `/comments/${commentId}`,
    commentData
  );
  return response.data;
};

export const deleteComment = async (commentId, axiosPrivate) => {
  const response = await axiosPrivate.delete(`/comments/${commentId}`);
  return response.data;
};

export const upvoteComment = async (commentId, axiosPrivate) => {
  const response = await axiosPrivate.patch(`/comments/${commentId}/upvote`);
  return response.data;
};

export const downvoteComment = async (commentId, axiosPrivate) => {
  const response = await axiosPrivate.patch(`/comments/${commentId}/downvote`);
  return response.data;
};
