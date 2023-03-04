/**
 * Advanced example demonstrating all core MobX constructs.
 */

import { makeAutoObservable } from "mobx";
import apis from "services/auth";

import { successToast } from "components/general/toast/toast";

class AuthStore {
  // ====================================================
  // State
  // ====================================================
  user = null;
  otp_value = "";
  error = null;
  loading = false;
  constructor() {
    makeAutoObservable(this);
  }

  // ====================================================
  // Computed views
  // ====================================================
  // While MobX promotes OOP, we can still benefit from using FP where it's appropriate
  get token() {
    return this.user.token;
  }

  // ====================================================
  // Actions
  // ====================================================

  login = async (data, logUserIn) => {
    this.loading = true;
    try {
      const res = await apis.login(data);
      this.setCurrentUser(res);
      logUserIn(res);
      const message = "You have successfully logged into zusco admin dashboard";
      successToast(`Successfully logged in`, message);
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  };

  setCurrentUser = (data) => {
    this.user = data;
  };

  logout = () => {
    this.user = null;
    this.setCurrentUser(null);
  };
}

export default new AuthStore();
