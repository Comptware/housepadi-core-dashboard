/**
 * Advanced example demonstrating all core MobX constructs.
 */
import { makeAutoObservable } from "mobx";
import apis from "services/home";

class HomeStore {
  // ====================================================
  // State
  // ====================================================

  stats = null;
  getStatsLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  // ====================================================
  // Actions
  // ====================================================

  getStats = async (payload) => {
    this.getStatsLoading = true;
    try {
      const res = await apis.getStats(payload);
      this.stats = res || null;
    } finally {
      this.getStatsLoading = false;
    }
  };
}

export default new HomeStore();
