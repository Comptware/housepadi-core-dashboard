/**
 * Advanced example demonstrating all core MobX constructs.
 */
import { makeAutoObservable } from "mobx";
import apis from "services/users";
import { successToast } from "components/general/toast/toast";
class UserStore {
  // ====================================================
  // State
  // ====================================================
  users = [];
  userBookings = [];

  userCount = 0;
  userBookingsCount = 0;
  error = null;
  loading = false;
  searchLoading = false;
  userBookingsLoading = false;
  blockUserLoading = false;
  updateUsersLoading = false;
  activeUser = null;
  acceptOrRejectUserLoading = false;
  constructor() {
    makeAutoObservable(this);
  }

  // ====================================================
  // Computed views
  // ====================================================
  // While MobX promotes OOP, we can still benefit from using FP where it's appropriate

  // ====================================================
  // Actions
  // ====================================================

  setActiveUser = (payload) => {
    this.activeUser = payload;
  };

  // getUsers
  getUsers = async (page_number) => {
    this.loading = true;
    try {
      let res = await apis.getUsers(page_number);
      this.userCount = res?.total;
      res = res?.results;

      this.users = res || [];

      return res;
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  };

  // getUserBookings
  getUserBookings = async (data, page_number) => {
    this.userBookingsLoading = true;
    try {
      let res = await apis.getUserBookings(data, page_number);
      this.userBookingsCount = res?.total || 0;
      res = res?.data;
      this.userBookings = res || [];
      return res;
    } catch (error) {
      this.error = error;
    } finally {
      this.userBookingsLoading = false;
    }
  };

  updateUser = async ({ data, pageNumber, callbackFunc }) => {
    this.updateUsersLoading = true;
    try {
      await apis.updateUser(data);
      successToast(`Operation successful!`, "User updated successfully.");
      callbackFunc && callbackFunc();
      this.getUsers(pageNumber);
    } finally {
      this.updateUsersLoading = false;
    }
  };

  deleteUser = async ({ pageNumber, callbackFunc }) => {
    this.deleteUsersLoading = true;
    try {
      await apis.deleteUser(this.activeUser?.id);
      successToast(`Operation successful!`, "User deleted successfully.");
      callbackFunc && callbackFunc();
      this.activeUser = null;
      this.getUsers(pageNumber);
    } finally {
      this.deleteUsersLoading = false;
    }
  };

  // blockUser
  blockUser = async (data, handleOk, { url, navigate, route }) => {
    this.blockUserLoading = true;
    try {
      await apis.blockUser(data);
      const message = "You have successfully blocked this user";
      successToast(`Operation successful!`, message);
      handleOk();
      this.handleFindUser({ url, navigate, route });
    } catch (error) {
      this.error = error;
    } finally {
      this.blockUserLoading = false;
    }
  };

  handleFindUser = async ({ url, navigate, route }) => {
    let currentUser;
    try {
      this.searchLoading = true;
      currentUser = await apis.getUsersById(url);
      if (currentUser?.id) {
        this.activeUser = currentUser;
      } else {
        navigate(route);
      }
    } catch (error) {
    } finally {
      this.searchLoading = false;
    }
  };
}

export default new UserStore();
