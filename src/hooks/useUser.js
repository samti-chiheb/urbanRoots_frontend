import { useMutation } from "@tanstack/react-query";
import {
  updateUserInfo,
  updateUsername,
  updateEmail,
  updatePassword,
  deleteUser,
} from "../services/api/userService";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";
import { toast } from "react-toastify";
import handleApiErrors from "../utils/handleApiErrors";

const useUser = () => {
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const updateUser = useMutation({
    mutationFn: async (userData) => {
      const updatedData = await updateUserInfo(userData, axiosPrivate);
      return updatedData;
    },
    onSuccess: (data) => {
      setAuth((prev) => ({
        ...prev,
        userInfo: { ...prev.userInfo, ...data },
      }));
      toast.success("Informations utilisateur mises à jour avec succès !");
    },
    onError: handleApiErrors,
  });

  const updateUserUsername = useMutation({
    mutationFn: async (usernameData) => {
      const updatedData = await updateUsername(usernameData, axiosPrivate);
      return updatedData;
    },
    onSuccess: (data) => {
      setAuth((prev) => ({
        ...prev,
        userInfo: { ...prev.userInfo, ...data },
      }));
      toast.success("Nom d'utilisateur mis à jour avec succès !");
    },
    onError: handleApiErrors,
  });

  const updateUserEmail = useMutation({
    mutationFn: async (emailData) => {
      const updatedData = await updateEmail(emailData, axiosPrivate);
      return updatedData;
    },
    onSuccess: (data) => {
      setAuth((prev) => ({
        ...prev,
        userInfo: { ...prev.userInfo, ...data },
      }));
      toast.success("Email mis à jour avec succès !");
    },
    onError: handleApiErrors,
  });

  const updateUserPassword = useMutation({
    mutationFn: async (passwordData) => {
      const updatedData = await updatePassword(passwordData, axiosPrivate);
      return updatedData;
    },
    onSuccess: () => {
      toast.success("Mot de passe mis à jour avec succès !");
    },
    onError: handleApiErrors,
  });

  const deleteUserAccount = useMutation({
    mutationFn: async () => {
      const response = await deleteUser(axiosPrivate);
      return response;
    },
    onSuccess: () => {
      setAuth(null);
      toast.success("Utilisateur supprimé avec succès !");
    },
    onError: handleApiErrors,
  });

  return {
    updateUser,
    updateUserUsername,
    updateUserEmail,
    updateUserPassword,
    deleteUserAccount,
  };
};

export default useUser;
