import axios from "./axiosInstance";

export const getAllCategories = async () => {
  const response = await axios.get(`/forum-categories`);
  return response.data;
};

export const getCategoryById = async (categoryId) => {
  const response = await axios.get(`/forum-categories/${categoryId}`);
  return response.data;
};

export const createCategory = async (axiosPrivate, categoryData) => {
  const response = await axiosPrivate.post("forum-categories", categoryData);
  return response.data;
};

export const updateCategory = async (
  axiosPrivate,
  categoryId,
  categoryData
) => {
  const response = await axiosPrivate.put(
    `/forum-categories/${categoryId}`,
    categoryData
  );
  return response.data;
};

export const deleteCategory = async (axiosPrivate, categoryId) => {
  const response = await axiosPrivate.delete(`/forum-categories/${categoryId}`);
  return response.data;
};
