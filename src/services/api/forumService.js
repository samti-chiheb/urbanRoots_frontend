import axios from "./axiosInstance";

export const getForums = async () => {
  const response = await axios.get("/forums");
  return response.data;
};

export const getForumByCategory = async (categoryId) => {
  const response = await axios.get(`/forums/category/${categoryId}`);
  return response.data;
};

export const getOneForumById = async (forumId) => {
  const response = await axios.get(`/forums/${forumId}`);
  return response.data;
};

export const createForum = async (forumData, axiosPrivate) => {
  const response = await axiosPrivate.post("/forums", forumData);
  return response.data;
};

export const updateForum = async (id, forumData, axiosPrivate) => {
  const response = await axiosPrivate.put(`/forums/${id}`, forumData);
  return response.data;
};

export const deleteForum = async (id, axiosPrivate) => {
  const response = await axiosPrivate.delete(`/forums/${id}`);
  return response.data;
};
