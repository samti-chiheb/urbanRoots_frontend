import axios from "./axiosInstance";

export const getPosts = async () => {
  const response = await axios.get("/posts");
  return response.data;
};

export const getPostsByForum = async (forumId) => {
  const response = await axios.get(`/posts/${forumId}/posts`);
  return response.data;
};

export const getPostById = async (postId) => {
  const response = await axios.get(`/posts/${postId}`);
  return response.data;
};

export const createPost = async (postData, axiosPrivate) => {
  const response = await axiosPrivate.post("/posts", postData);
  return response.data;
};

export const updatePost = async (postId, postData, axiosPrivate) => {
  const response = await axiosPrivate.put(`/posts/${postId}`, postData);
  return response.data;
};

export const deletePost = async (postId, axiosPrivate) => {
  const response = await axiosPrivate.delete(`/posts/${postId}`);
  return response.data;
};

export const likePost = async (postId, axiosPrivate) => {
  const response = await axiosPrivate.patch(`/posts/${postId}/like`);
  return response.data;
};

export const dislikePost = async (postId, axiosPrivate) => {
  const response = await axiosPrivate.patch(`/posts/${postId}/dislike`);
  return response.data;
};
