import axios from "./axiosInstance";

export const getGardens = async () => {
  const response = await axios.get("/gardens");
  return response.data;
};

export const getGardenById = async (gardenId) => {
  const response = await axios.get(`/gardens/${gardenId}`);
  return response.data;
};

export const createGarden = async (gardenData, axiosPrivate) => {
  const response = await axiosPrivate.post("/gardens", gardenData);
  return response.data;
};

export const updateGarden = async (gardenId, gardenData, axiosPrivate) => {
  const response = await axiosPrivate.put(`/gardens/${gardenId}`, gardenData);
  return response.data;
};

export const deleteGarden = async (gardenId, axiosPrivate) => {
  const response = await axiosPrivate.delete(`/gardens/${gardenId}`);
  return response.data;
};
