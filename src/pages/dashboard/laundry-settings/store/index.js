/**
 * Advanced example demonstrating all core MobX constructs.
 */
import { makeAutoObservable } from "mobx";
import { successToast } from "components/general/toast/toast";
import apis from "services/settings/laundry";

class SettingsStore {
  // ====================================================
  // State
  // ====================================================

  // laundries
  activeLaundry = null;
  laundries = [];
  laundriesCount = 0;
  getLaundriesLoading = false;
  createLaundriesLoading = false;
  updateLaundriesLoading = false;
  deleteLaundriesLoading = false;

  // laundryTypes
  activeLaundryType = null;
  laundryTypes = [];
  laundryTypesCount = 0;
  getLaundryTypesLoading = false;
  createLaundryTypesLoading = false;
  updateLaundryTypesLoading = false;
  deleteLaundryTypesLoading = false;

  // laundryCategories
  activeMeaCategory = null;
  laundryCategories = [];
  laundryCategoriesCount = 0;
  getLaundryCategoriesLoading = false;
  createLaundryCategoriesLoading = false;
  updateLaundryCategoriesLoading = false;
  deleteLaundryCategoriesLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  // ====================================================
  // Actions
  // ====================================================

  // laundries

  setActiveLaundry = (payload) => {
    this.activeLaundry = payload;
  };

  setLaundries = (payload) => {
    this.laundries = payload;
  };

  // laundryTypes

  setActiveLaundryType = (payload) => {
    this.activeLaundryType = payload;
  };

  setLaundryTypes = (payload) => {
    this.laundryTypes = payload;
  };

  // laundries

  getLaundries = async (pageNumber) => {
    this.getLaundriesLoading = true;
    try {
      const res = await apis.getLaundries(pageNumber || "1");
      this.laundries = res?.results || [];
      this.laundriesCount = res?.total || 0;
      return res;
    } finally {
      this.getLaundriesLoading = false;
    }
  };

  createLaundry = async ({ data, pageNumber, callbackFunc }) => {
    this.createLaundriesLoading = true;
    try {
      await apis.createLaundry(data);
      successToast(
        `Operation successful!`,
        "Laundry item created successfully."
      );
      callbackFunc && callbackFunc();
      this.activeLaundry = null;
      this.getLaundries(pageNumber);
    } finally {
      this.createLaundriesLoading = false;
    }
  };

  updateLaundry = async ({ data, pageNumber, callbackFunc }) => {
    this.updateLaundriesLoading = true;
    try {
      await apis.updateLaundry(data);
      successToast(
        `Operation successful!`,
        "Laundry item updated successfully."
      );
      callbackFunc && callbackFunc();
      this.activeLaundry = null;
      this.getLaundries(pageNumber);
    } finally {
      this.updateLaundriesLoading = false;
    }
  };

  deleteLaundry = async ({ pageNumber, callbackFunc }) => {
    this.deleteLaundriesLoading = true;
    try {
      await apis.deleteLaundry(this.activeLaundry?.id);
      successToast(
        `Operation successful!`,
        "Laundry item deleted successfully."
      );
      callbackFunc && callbackFunc();
      this.activeLaundry = null;
      this.getLaundries(pageNumber);
    } finally {
      this.deleteLaundriesLoading = false;
    }
  };

  // laundryTypes

  getLaundryTypes = async (pageNumber) => {
    this.getLaundryTypesLoading = true;
    try {
      const res = await apis.getLaundryTypes(pageNumber || "1");
      this.laundryTypes =
        res?.results?.map((item) => {
          return { ...item, label: item?.name, value: item?.id };
        }) || [];
      this.laundryTypesCount = res?.total || 0;
      return res;
    } finally {
      this.getLaundryTypesLoading = false;
    }
  };

  createLaundryType = async ({ data, pageNumber, callbackFunc }) => {
    this.createLaundryTypesLoading = true;
    try {
      await apis.createLaundryType(data);
      successToast(
        `Operation successful!`,
        "Laundry type created successfully."
      );
      callbackFunc && callbackFunc();
      this.activeLaundryType = null;
      this.getLaundryTypes(pageNumber);
    } finally {
      this.createLaundryTypesLoading = false;
    }
  };

  updateLaundryType = async ({ data, pageNumber, callbackFunc }) => {
    this.updateLaundryTypesLoading = true;
    try {
      await apis.updateLaundryType(data);
      successToast(
        `Operation successful!`,
        "Laundry type updated successfully."
      );
      callbackFunc && callbackFunc();
      this.activeLaundryType = null;
      this.getLaundryTypes(pageNumber);
    } finally {
      this.updateLaundryTypesLoading = false;
    }
  };

  deleteLaundryType = async ({ pageNumber, callbackFunc }) => {
    this.deleteLaundryTypesLoading = true;
    try {
      await apis.deleteLaundryType(this.activeLaundryType?.id);
      successToast(
        `Operation successful!`,
        "Laundry type deleted successfully."
      );
      callbackFunc && callbackFunc();
      this.activeLaundryType = null;
      this.getLaundryTypes(pageNumber);
    } finally {
      this.deleteLaundryTypesLoading = false;
    }
  };
}

export default new SettingsStore();
