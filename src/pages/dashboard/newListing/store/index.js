/**
 * Advanced example demonstrating all core MobX constructs.
 */
import { makeAutoObservable } from "mobx";

class HomeStore {
  // ====================================================
  // State
  // ====================================================
  user = null;
  count = 0;
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

  setCount = (data) => {
    this.count++;
    this.error = data;
  };
}

export default new HomeStore();
