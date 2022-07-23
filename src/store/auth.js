/**
 * Advanced example demonstrating all core MobX constructs.
 */

import { makeAutoObservable } from "mobx";
import apis from "services/auth";

import { successToast } from "components/general/toast/toast";
import { saveToStorage } from "utils/storage";

class AuthStore {
  // ====================================================
  // State
  // ====================================================
  user = null;
  otp_value = "";
  error = null;
  loading = false;
  loadingVerify = false;
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
  sendOtp = async (data, phone_number, navigate) => {
    this.loading = true;
    try {
      const res = await apis.sendOtp(data);
      this.otp_value = res?.otp_value;
      phone_number && saveToStorage("otp_phone_number", phone_number);
      navigate && navigate("/otp/verify", { replace: false });
      const message = "Veification code successfully sent to your number";
      successToast(`Veification code sent`, message);
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  };

  verifyOtp = async (data, logUserIn) => {
    this.loadingVerify = true;
    try {
      const res = await apis.verifyOtp(data);
      this.setCurrentUser(res);
      logUserIn(res);
      const message =
        "You have successfully logged into your zusco agent dashboard";
      successToast(`Successfully logged in`, message);
    } catch (error) {
      this.error = error;
    } finally {
      this.loadingVerify = false;
    }
  };
  setCurrentUser = (data) => {
    this.user = data;
  };

  logout = () => {
    this.user = null;
  };
}

export default new AuthStore();
