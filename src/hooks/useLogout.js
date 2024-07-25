import axiosInstance from "../services/api/axiosInstance";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth();
    try {
      const response = await axiosInstance.post("/user/logout", null, {
        withCredentials: true,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return logout;
};

export default useLogout;
