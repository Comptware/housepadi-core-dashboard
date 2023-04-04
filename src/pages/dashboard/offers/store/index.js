/**
 * Advanced example demonstrating all core MobX constructs.
 */
import { makeAutoObservable } from "mobx";
import { successToast } from "components/general/toast/toast";
import apis from "services/offer";

class OffersStore {
  // ====================================================
  // State
  // ====================================================

  // offers
  activeOffer = null;
  offers = [];
  offersCount = 0;
  getOffersLoading = false;
  createOffersLoading = false;
  updateOffersLoading = false;
  deleteOffersLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  // ====================================================
  // Actions
  // ====================================================

  // offers

  setActiveOffer = (payload) => {
    this.activeOffer = payload;
  };

  setOffers = (payload) => {
    this.offers = payload;
  };

  // offers

  getOffers = async (pageNumber) => {
    this.getOffersLoading = true;
    try {
      const res = await apis.getOffers(pageNumber || "1");
      this.offers = res?.results || [];
      this.offersCount = res?.total || 0;
      return res;
    } finally {
      this.getOffersLoading = false;
    }
  };

  createOffer = async ({ data, pageNumber, callbackFunc }) => {
    this.createOffersLoading = true;
    try {
      await apis.createOffer(data);
      successToast(`Operation successful!`, "Offer created successfully.");
      callbackFunc && callbackFunc();
      this.activeOffer = null;
      this.getOffers(pageNumber);
    } finally {
      this.createOffersLoading = false;
    }
  };

  updateOffer = async ({ data, pageNumber, callbackFunc }) => {
    this.updateOffersLoading = true;
    try {
      await apis.updateOffer(data);
      successToast(`Operation successful!`, "Offer updated successfully.");
      callbackFunc && callbackFunc();
      this.activeOffer = null;
      this.getOffers(pageNumber);
    } finally {
      this.updateOffersLoading = false;
    }
  };

  deleteOffer = async ({ pageNumber, callbackFunc }) => {
    this.deleteOffersLoading = true;
    try {
      await apis.deleteOffer(this.activeOffer?.id);
      successToast(`Operation successful!`, "Offer deleted successfully.");
      callbackFunc && callbackFunc();
      this.activeOffer = null;
      this.getOffers(pageNumber);
    } finally {
      this.deleteOffersLoading = false;
    }
  };
}

export default new OffersStore();
