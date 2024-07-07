import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import axiosInstance from "../services/api/axiosInstance";
import { loginSchema } from "../utils/validationSchema";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

export const useLoginForm = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(
        "/user/login",
        {
          identifier: data.identifier,
          password: data.password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      const { accessToken, roles, userInfo } = response.data;
      setAuth({ accessToken, roles, userInfo });
      toast.success("Connexion réussie!");

      // navigate after success login
      navigate(from, { replace: true });
    } catch (error) {
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
