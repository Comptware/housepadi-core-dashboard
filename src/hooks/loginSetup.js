import { useNavigate } from "react-router-dom";
import {
  saveToken,
  saveUserInfoToStorage,
  clearAccountCreation,
} from "utils/storage";
import { setToken } from "utils/apiInstance";
import { useAuth } from "./auth";

function useLoginSetup() {
  const navigate = useNavigate();
  const { setAuthenticatedUser } = useAuth();

  const logUserIn = (user, route) => {
    if (user) {
      const { accessToken, ...rest } = user;
      saveToken(accessToken);
      setToken(accessToken);
      saveUserInfoToStorage(rest);
      setAuthenticatedUser(user);
      clearAccountCreation();
      navigate(route || "/dashboard/home", { replace: true });
    }
  };

  return {
    logUserIn,
  };
}

export default useLoginSetup;
