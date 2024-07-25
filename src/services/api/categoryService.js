import axios from "./axiosInstance";
import handleApiErrors from "../../utils/handleApiErrors";

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`/forum-categories`);
    return response.data;
  } catch (error) {
    handleApiErrors(error);
  }
};

export const getOneCategory = async (categoryId) => {
  try {
    const response = await axios.get(`/forum-categories/${categoryId}`);
    return response.data;
  } catch (error) {
    handleApiErrors(error);
  }
};

export const createCategory = async (axiosPrivate) => {
  try {
    const response = await axiosPrivate.post("forum-categories", categoryData);
    return response.data;
  } catch (error) {
    handleApiErrors(error);
  }
};

export const updateCategory = async (
  categoryId,
  axiosPrivate,
  categoryData
) => {
  try {
    const response = await axiosPrivate.put(
      `/forum-categories/${categoryId}`,
      categoryData
    );
    return response.data;
  } catch (error) {
    handleApiErrors(error);
  }
};

export const deleteCategory = async (categoryId, axiosPrivate) => {
  try {
    const response = await axiosPrivate.delete(
      `/forum-categories/${categoryId}`
    );
    return response.data;
  } catch (error) {
    handleApiErrors(error);
  }
};
