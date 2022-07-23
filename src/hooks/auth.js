import AuthStore from "store/auth";
import {
  clearUserDetails,
  getToken,
  getUserInfoFromStorage,
} from "utils/storage";
import { setToken } from "../utils/apiInstance";

function useAuth() {
  const currentUser = AuthStore.user;
  const userData = getUserInfoFromStorage();
  const token = getToken();

  function checkSessionValidity() {
    try {
      return !!token;
    } catch (err) {
      return false;
    }
  }

  async function logout() {
    try {
      AuthStore.logout();
      await clearUserDetails();
    } catch (error) {
      return error;
    }
  }

  function setAuthenticatedUser(result) {
    AuthStore.setCurrentUser(result);
  }

  function initUserSession() {
    if (checkSessionValidity()) {
      setAuthenticatedUser({ ...userData, token });
      setToken(token);
      return;
    }
    setAuthenticatedUser({});
  }

  return {
    currentUser,
    checkSessionValidity,
    initUserSession,
    setAuthenticatedUser,
    isAuthenticated: checkSessionValidity(),
    logout,
  };
}

export { useAuth };
