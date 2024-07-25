import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "../services/api/axiosInstance";
import { toast } from "react-toastify";
import { registerSchema } from "../utils/validationSchema";

export const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...userData } = data;
      const response = await axiosInstance.post("/user/register", userData);
      toast.success(`Utilisateur ${userData.username} créé avec succès !`);
      //toDo : add a login and redirect to welcome page
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'utilisateur", error);
      toast.error(`Erreur : ${error.response?.data?.message || error.message}`);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
  };
};
