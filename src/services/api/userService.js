import handleApiErrors from "../../utils/handleApiErrors";

export const updateUserInfo = async (userData, axiosPrivate) => {
  try {
    const response = await axiosPrivate.put("user/update-info", userData);
    return response.data;
  } catch (error) {
    handleApiErrors(error);
  }
};

export const updateUsername = async (usernameData, axiosPrivate) => {
  const response = await axiosPrivate.put("user/update-username", usernameData);
  return response.data;
};

export const updateEmail = async (emailData, axiosPrivate) => {
  const response = await axiosPrivate.put("user/update-email", emailData);
  return response.data;
};

export const updatePassword = async (passwordData, axiosPrivate) => {
  const response = await axiosPrivate.put("user/update-password", passwordData);
  return response.data;
};

export const deleteUser = async (axiosPrivate) => {
  const response = await axiosPrivate.delete("user/delete");
  return response.data;
};
