import { apiInstance2 } from "utils/apiInstance";

const apis = {
  // meals
  getMeals: (pageNumber) => apiInstance2(`meals/all/${pageNumber}`),
  createMeal: (data) =>
    apiInstance2("meals", {
      method: "POST",
      body: data,
    }),
  updateMeal: (data) =>
    apiInstance2(`meals`, {
      method: "PATCH",
      body: data,
    }),
  deleteMeal: (id) =>
    apiInstance2(`meals/${id}`, {
      method: "DELETE",
    }),
  //   meal-types
  getMealTypes: (pageNumber) => apiInstance2(`meal-types/all/${pageNumber}`),
  createMealType: (data) =>
    apiInstance2("meal-types", {
      method: "POST",
      body: data,
    }),
  updateMealType: (data) =>
    apiInstance2(`meal-types/`, {
      method: "PATCH",
      body: data,
    }),
  deleteMealType: (id) =>
    apiInstance2(`meal-types/${id}`, {
      method: "DELETE",
    }),
  // meal-categories
  getMealCategories: (pageNumber) =>
    apiInstance2(`meal-categories/all/${pageNumber}`),
  createMealCategory: (data) =>
    apiInstance2("meal-categories", {
      method: "POST",
      body: data,
    }),
  updateMealCategory: (data) =>
    apiInstance2(`meal-categories`, {
      method: "PATCH",
      body: data,
    }),
  deleteMealCategory: (id) =>
    apiInstance2(`meal-categories/${id}`, {
      method: "DELETE",
    }),

  // discountCodes
  getDiscounts: (pageNumber) => apiInstance2(`discountCodes/all/${pageNumber}`),
  createDiscount: (data) =>
    apiInstance2("discountCodes", {
      method: "POST",
      body: data,
    }),
  updateDiscount: (data) =>
    apiInstance2(`discountCodes`, {
      method: "PATCH",
      body: data,
    }),
  deleteDiscount: (id) =>
    apiInstance2(`discountCodes/${id}`, {
      method: "DELETE",
    }),
  checkDiscount: (data) =>
    apiInstance2("discountCodes/check-discount-code", {
      method: "POST",
      body: data,
    }),
};

export default apis;
