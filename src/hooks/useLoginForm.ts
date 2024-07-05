import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import axiosInstance from "../services/api/axiosInstance";
import { loginSchema } from "../utils/validationSchema";
import { z } from "zod";

type LoginFormValues = z.infer<typeof loginSchema>;

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await axiosInstance.post("/user/login", {
        identifier: data.identifier,
        password: data.password,
      });
      console.log(response.data);
      toast.success("Connexion réussie!");
    } catch (error: any) {
      console.error("Erreur lors de la connexion", error);
      toast.error(
        "Erreur de connexion : " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
  };
};
