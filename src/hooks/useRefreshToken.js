import axiosInstance from "../services/api/axiosInstance";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axiosInstance.get("/user/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      return {
        ...prev,
        userInfo: response.data.userInfo,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
