/**
 * Advanced example demonstrating all core MobX constructs.
 */
import { makeAutoObservable } from "mobx";
import { successToast } from "components/general/toast/toast";
import apis from "services/notification";

class NotificationsStore {
  // ====================================================
  // State
  // ====================================================

  // notifications
  activeNotification = null;
  notifications = [];
  notificationsCount = 0;
  getNotificationsLoading = false;
  createNotificationsLoading = false;
  updateNotificationsLoading = false;
  deleteNotificationsLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  // ====================================================
  // Actions
  // ====================================================

  // notifications

  setActiveNotification = (payload) => {
    this.activeNotification = payload;
  };

  setNotifications = (payload) => {
    this.notifications = payload;
  };

  // notifications

  getNotifications = async (pageNumber) => {
    this.getNotificationsLoading = true;
    try {
      const res = await apis.getNotifications(pageNumber || "1");
      this.notifications = res?.results || [];
      this.notificationsCount = res?.total || 0;
      return res;
    } finally {
      this.getNotificationsLoading = false;
    }
  };

  createNotification = async ({ data, pageNumber, callbackFunc }) => {
    this.createNotificationsLoading = true;
    try {
      await apis.createNotification(data);
      successToast(`Operation successful!`, "Notification sent successfully.");
      callbackFunc && callbackFunc();
      this.activeNotification = null;
      // this.getNotifications(pageNumber);
    } finally {
      this.createNotificationsLoading = false;
    }
  };

  updateNotification = async ({ data, pageNumber, callbackFunc }) => {
    this.updateNotificationsLoading = true;
    try {
      await apis.updateNotification(data);
      successToast(
        `Operation successful!`,
        "Notification updated successfully."
      );
      callbackFunc && callbackFunc();
      this.activeNotification = null;
      // this.getNotifications(pageNumber);
    } finally {
      this.updateNotificationsLoading = false;
    }
  };

  deleteNotification = async ({ pageNumber, callbackFunc }) => {
    this.deleteNotificationsLoading = true;
    try {
      await apis.deleteNotification(this.activeNotification?.id);
      successToast(
        `Operation successful!`,
        "Notification deleted successfully."
      );
      callbackFunc && callbackFunc();
      this.activeNotification = null;
      this.getNotifications(pageNumber);
    } finally {
      this.deleteNotificationsLoading = false;
    }
  };
}

export default new NotificationsStore();
