import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "../services/api/axiosInstance";
import { toast } from "react-toastify";
import { registerSchema } from "../utils/validationSchema";

type RegisterFormValues = z.infer<typeof registerSchema>;

export const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const { confirmPassword, ...userData } = data;
      const response = await axiosInstance.post("user/register", userData);
      console.log(response.data);
      toast.success(`Utilisateur ${userData.username} créé avec succès !`);
      //toDo : add a login and redirect to welcome page
    } catch (error: any) {
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
