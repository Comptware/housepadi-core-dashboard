/**
 * Advanced example demonstrating all core MobX constructs.
 */

import { makeAutoObservable } from "mobx";
import apis from "services/common";
import { successToast } from "components/general/toast/toast";
import { saveUserInfoToStorage } from "utils/storage";

class CommonStore {
  // ====================================================
  // State
  // ====================================================
  me = null;
  error = null;
  loading = false;
  loadingFetchMe = false;
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
  getMe = async () => {
    this.loadingFetchMe = true;
    try {
      const res = await apis.getMe();
      this.me = res;
      saveUserInfoToStorage(res);
      return res;
    } catch (error) {
      this.error = error;
    } finally {
      this.loadingFetchMe = false;
    }
  };

  updateMe = async ({ data, navigate, route }) => {
    this.loading = true;
    try {
      await apis.updateMe(data);
      const message = "You have successfully updated your profile";
      successToast(`Operation successful!`, message);
      this.getMe();
      navigate(route);
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  };
}

export default new CommonStore();
