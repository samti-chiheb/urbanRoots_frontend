import axios from "./axiosInstance";
import handleApiErrors from "../../utils/handleApiErrors";

export const getPosts = async () => {
  try {
    const response = await axios.get("/posts");
    return response.data;
  } catch (error) {
    handleApiErrors(error);
  }
};

export const getPostsByForum = async (forumId) => {
  try {
    const response = await axios.get(`/posts/${forumId}/posts`);
    return response.data;
  } catch (error) {
    handleApiErrors(error);
  }
};

export const getPostById = async (postId) => {
  try {
    const response = await axios.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    handleApiErrors(error);
  }
};

export const createPost = async (postData, axiosPrivate) => {
  try {
    const response = await axiosPrivate.post("/posts", postData);
    return response.data;
  } catch (error) {
    handleApiErrors(error);
  }
};

export const updatePost = async (postId, postData, axiosPrivate) => {
  try {
    const response = await axiosPrivate.put(`/posts/${postId}`, postData);
    return response.data;
  } catch (error) {
    handleApiErrors(error);
  }
};

export const deletePost = async (postId, axiosPrivate) => {
  try {
    const response = await axiosPrivate.delete(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    handleApiErrors(error);
  }
};

export const likePost = async (postId, axiosPrivate) => {
  try {
    const response = await axiosPrivate.patch(`/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    handleApiErrors(error);
  }
};

export const dislikePost = async (postId, axiosPrivate) => {
  try {
    const response = await axiosPrivate.patch(`/posts/${postId}/dislike`);
    return response.data;
  } catch (error) {
    handleApiErrors(error);
  }
};
