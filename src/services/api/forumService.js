import axios from "./axiosInstance";
import handleApiErrors from "../../utils/handleApiErrors";

export const getForums = async () => {
  try {
    const response = await axios.get("/forums");
    return response.data;
  } catch (error) {
    handleApiErrors(error);
  }
};

export const getForumByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`/forums/category/${categoryId}`);
    return response.data;
  } catch (error) {
    handleApiErrors(error);
  }
};

export const getOneForumById = async (forumId) => {
  try {
    const response = await axios.get(`/forums/${forumId}`);
    return response.data;
  } catch (error) {
    handleApiErrors(error);
  }
};

export const createForum = async (forumData, axiosPrivate) => {
  try {
    const response = await axiosPrivate.post("/forums", forumData);
    return response.data;
  } catch (error) {
    handleApiErrors(error);
  }
};

export const updateForum = async (id, forumData, axiosPrivate) => {
  try {
    const response = await axiosPrivate.put(`/forums/${id}`, forumData);
    return response.data;
  } catch (error) {
    handleApiErrors(error);
  }
};

export const deleteForum = async (id, axiosPrivate) => {
  try {
    const response = await axiosPrivate.delete(`/forums/${id}`);
    return response.data;
  } catch (error) {
    handleApiErrors(error);
  }
};
