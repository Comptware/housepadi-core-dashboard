/**
 * Advanced example demonstrating all core MobX constructs.
 */
import { makeAutoObservable } from "mobx";
import { successToast } from "components/general/toast/toast";
import apis from "services/settings/meals";

class SettingsStore {
  // ====================================================
  // State
  // ====================================================

  // meals
  activeMeal = null;
  meals = [];
  mealsCount = 0;
  getMealsLoading = false;
  createMealsLoading = false;
  updateMealsLoading = false;
  deleteMealsLoading = false;

  // mealTypes
  activeMealType = null;
  mealTypes = [];
  mealTypesCount = 0;
  getMealTypesLoading = false;
  createMealTypesLoading = false;
  updateMealTypesLoading = false;
  deleteMealTypesLoading = false;

  // mealCategories
  activeMeaCategory = null;
  mealCategories = [];
  mealCategoriesCount = 0;
  getMealCategoriesLoading = false;
  createMealCategoriesLoading = false;
  updateMealCategoriesLoading = false;
  deleteMealCategoriesLoading = false;

  // discounts
  activeDiscount = null;
  discounts = [];
  discountsCount = 0;
  getDiscountsLoading = false;
  createDiscountsLoading = false;
  updateDiscountsLoading = false;
  deleteDiscountsLoading = false;
  checkDiscountsLoading = false;
  discountCodeisValid = false;

  constructor() {
    makeAutoObservable(this);
  }

  // ====================================================
  // Actions
  // ====================================================

  // meals

  setActiveMeal = (payload) => {
    this.activeMeal = payload;
  };

  setMeals = (payload) => {
    this.meals = payload;
  };

  // mealTypes

  setActiveMealType = (payload) => {
    this.activeMealType = payload;
  };

  setMealTypes = (payload) => {
    this.mealTypes = payload;
  };

  // mealCategories

  setActiveMealCategory = (payload) => {
    this.activeMealCategory = payload;
  };

  setMealCategories = (payload) => {
    this.mealCategories = payload;
  };

  // discounts

  setActiveDiscount = (payload) => {
    this.activeDiscount = payload;
  };

  setDiscounts = (payload) => {
    this.discounts = payload;
  };

  // meals

  getMeals = async (pageNumber) => {
    this.getMealsLoading = true;
    try {
      const res = await apis.getMeals(pageNumber || "1");
      this.meals = res?.results || [];
      this.mealsCount = res?.total || 0;
      return res;
    } finally {
      this.getMealsLoading = false;
    }
  };

  createMeal = async ({ data, pageNumber, callbackFunc }) => {
    this.createMealsLoading = true;
    try {
      await apis.createMeal(data);
      successToast(`Operation successful!`, "Meal created successfully.");
      callbackFunc && callbackFunc();
      this.activeMeal = null;
      this.getMeals(pageNumber);
    } finally {
      this.createMealsLoading = false;
    }
  };

  updateMeal = async ({ data, pageNumber, callbackFunc }) => {
    this.updateMealsLoading = true;
    try {
      await apis.updateMeal(data);
      successToast(`Operation successful!`, "Meal updated successfully.");
      callbackFunc && callbackFunc();
      this.activeMeal = null;
      this.getMeals(pageNumber);
    } finally {
      this.updateMealsLoading = false;
    }
  };

  deleteMeal = async ({ pageNumber, callbackFunc }) => {
    this.deleteMealsLoading = true;
    try {
      await apis.deleteMeal(this.activeMeal?.id);
      successToast(`Operation successful!`, "Meal deleted successfully.");
      callbackFunc && callbackFunc();
      this.activeMeal = null;
      this.getMeals(pageNumber);
    } finally {
      this.deleteMealsLoading = false;
    }
  };

  // mealTypes

  getMealTypes = async (pageNumber) => {
    this.getMealTypesLoading = true;
    try {
      const res = await apis.getMealTypes(pageNumber || "1");
      this.mealTypes =
        res?.results?.map((item) => {
          return { ...item, label: item?.name, value: item?.id };
        }) || [];
      this.mealTypesCount = res?.total || 0;
      return res;
    } finally {
      this.getMealTypesLoading = false;
    }
  };

  createMealType = async ({ data, pageNumber, callbackFunc }) => {
    this.createMealTypesLoading = true;
    try {
      await apis.createMealType(data);
      successToast(`Operation successful!`, "Meal type created successfully.");
      callbackFunc && callbackFunc();
      this.activeMealType = null;
      this.getMealTypes(pageNumber);
    } finally {
      this.createMealTypesLoading = false;
    }
  };

  updateMealType = async ({ data, pageNumber, callbackFunc }) => {
    this.updateMealTypesLoading = true;
    try {
      await apis.updateMealType(data);
      successToast(`Operation successful!`, "Meal type updated successfully.");
      callbackFunc && callbackFunc();
      this.activeMealType = null;
      this.getMealTypes(pageNumber);
    } finally {
      this.updateMealTypesLoading = false;
    }
  };

  deleteMealType = async ({ pageNumber, callbackFunc }) => {
    this.deleteMealTypesLoading = true;
    try {
      await apis.deleteMealType(this.activeMealType?.id);
      successToast(`Operation successful!`, "Meal type deleted successfully.");
      callbackFunc && callbackFunc();
      this.activeMealType = null;
      this.getMealTypes(pageNumber);
    } finally {
      this.deleteMealTypesLoading = false;
    }
  };

  // mealCategories

  getMealCategories = async (pageNumber) => {
    this.getMealCategoriesLoading = true;
    try {
      const res = await apis.getMealCategories(pageNumber || "1");
      this.mealCategories =
        res?.results?.map((item) => {
          return { ...item, label: item?.name, value: item?.id };
        }) || [];
      this.mealCategoriesCount = res?.total || 0;
      return res;
    } finally {
      this.getMealCategoriesLoading = false;
    }
  };

  createMealCategory = async ({ data, pageNumber, callbackFunc }) => {
    this.createMealCategoriesLoading = true;
    try {
      await apis.createMealCategory(data);
      successToast(
        `Operation successful!`,
        "Meal category created successfully."
      );
      callbackFunc && callbackFunc();
      this.activeMealCategory = null;
      this.getMealCategories(pageNumber);
    } finally {
      this.createMealCategoriesLoading = false;
    }
  };

  updateMealCategory = async ({ data, pageNumber, callbackFunc }) => {
    this.updateMealCategoriesLoading = true;
    try {
      await apis.updateMealCategory(data);
      successToast(
        `Operation successful!`,
        "Meal category updated successfully."
      );
      callbackFunc && callbackFunc();
      this.activeMealCategory = null;
      this.getMealCategories(pageNumber);
    } finally {
      this.updateMealCategoriesLoading = false;
    }
  };

  deleteMealCategory = async ({ pageNumber, callbackFunc }) => {
    this.deleteMealCategoriesLoading = true;
    try {
      await apis.deleteMealCategory(this.activeMealCategory?.id);
      successToast(
        `Operation successful!`,
        "Meal category deleted successfully."
      );
      callbackFunc && callbackFunc();
      this.activeMealCategory = null;
      this.getMealCategories(pageNumber);
    } finally {
      this.deleteMealCategoriesLoading = false;
    }
  };

  // discounts

  getDiscounts = async (pageNumber) => {
    this.getDiscountsLoading = true;
    try {
      const res = await apis.getDiscounts(pageNumber || "1");
      this.discounts = res?.results || [];
      this.discountsCount = res?.total || 0;
      return res;
    } finally {
      this.getDiscountsLoading = false;
    }
  };

  createDiscount = async ({ data, pageNumber, callbackFunc }) => {
    this.createDiscountsLoading = true;
    try {
      await apis.createDiscount(data);
      successToast(
        `Operation successful!`,
        "Discount code created successfully."
      );
      callbackFunc && callbackFunc();
      this.activeDiscount = null;
      this.getDiscounts(pageNumber);
    } finally {
      this.createDiscountsLoading = false;
    }
  };

  updateDiscount = async ({ data, pageNumber, callbackFunc }) => {
    this.updateDiscountsLoading = true;
    try {
      await apis.updateDiscount(data);
      successToast(
        `Operation successful!`,
        "Discount code updated successfully."
      );
      callbackFunc && callbackFunc();
      this.activeDiscount = null;
      this.getDiscounts(pageNumber);
    } finally {
      this.updateDiscountsLoading = false;
    }
  };

  deleteDiscount = async ({ pageNumber, callbackFunc }) => {
    this.deleteDiscountsLoading = true;
    try {
      await apis.deleteDiscount(this.activeDiscount?.id);
      successToast(
        `Operation successful!`,
        "Discount code deleted successfully."
      );
      callbackFunc && callbackFunc();
      this.activeDiscount = null;
      this.getDiscounts(pageNumber);
    } finally {
      this.deleteDiscountsLoading = false;
    }
  };

  checkDiscount = async ({ data, callbackFunc }) => {
    this.checkDiscountsLoading = true;
    this.discountCodeisValid = false;
    try {
      const res = await apis.checkDiscount(data);
      this.discountCodeisValid = true;
      callbackFunc && callbackFunc();
      return res;
    } catch (error) {
      this.discountCodeisValid = false;
    } finally {
      this.checkDiscountsLoading = false;
    }
  };
}

export default new SettingsStore();
