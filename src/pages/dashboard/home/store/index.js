/**
 * Advanced example demonstrating all core MobX constructs.
 */
import { makeAutoObservable } from "mobx";
import apis from "services/bookings";
import hostApi from "services/hosts";
class HomeStore {
  // ====================================================
  // State
  // ====================================================
  bookings = [];
  currentBooking = null;
  paidBookings = [];
  unpaidBookings = [];
  bookingsCount = 0;
  date = new Date();
  error = null;
  loading = false;
  searchLoading = false;
  initialLoadComplete = false;
  notificationBookings = [];
  notificationHosts = [];
  notificationItems = [];

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

  // Get Bookings
  getBookings = async (page_number, noLoader) => {
    this.loading = !noLoader;
    try {
      let res = await apis.getBookings(page_number || 1);
      this.bookingsCount = res?.total;

      res = res?.data || [];
      this.bookings = res;
      this.paidBookings = res?.filter(({ paid }) => paid);
      this.unpaidBookings = res?.filter(({ paid }) => !paid);
      this.date = new Date();

      return res;
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  };

  // Get Notification Data
  getNotificationData = async (page_number = 1, playSound) => {
    try {
      const notificationRes = await Promise.all([
        apis.getBookings(page_number),
        hostApi.getHosts(page_number),
      ]);

      const res = (notificationRes && notificationRes[0]?.data) || [];
      const hostRes = (notificationRes && notificationRes[1]?.data) || [];

      this.getNewBookings(
        res,
        playSound,
        "booking",
        "/dashboard/bookings/",
        this.notificationBookings
      );
      this.getNewBookings(
        hostRes,
        playSound,
        "agent",
        "/dashboard/agents/",
        this.notificationHosts
      );

      this.notificationBookings = res?.map((item) => {
        return {
          ...item,
          notification_type: "booking",
          link: `/dashboard/bookings/${item?.id}`,
        };
      });

      this.notificationHosts = hostRes?.map((item) => {
        return {
          ...item,
          notification_type: "agent",
          link: `/dashboard/agents/${item?.id}`,
        };
      });

      this.initialLoadComplete = true;

      return res;
    } catch (error) {
      this.error = error;
    } finally {
    }
  };

  getNewBookings = (
    res = [],
    playSound,
    notification_type,
    link,
    previousArr
  ) => {
    const newBookings = this.initialLoadComplete
      ? res.filter((o1) => !previousArr.some((o2) => o1.id === o2.id))
      : [];

    if (newBookings.length > 0) {
      this.handleSetNotificationItems(
        newBookings?.map((item) => {
          return {
            ...item,
            notification_type,
            link: `${link}${item?.id}`,
          };
        })
      );
      playSound();
      this.getBookings(1, true);
    }
  };

  handleSetNotificationItems = (items, reset) => {
    this.notificationItems = reset ? [] : [...this.notificationItems, ...items];
  };

  handleFindBooking = async ({ url, navigate, route }) => {
    let currentBooking;
    try {
      this.searchLoading = true;
      currentBooking = await apis.getBookingById(url);
      currentBooking = currentBooking?.shortlet_booking;
      if (currentBooking) {
        this.currentBooking = currentBooking;
      } else {
        navigate(route);
      }
    } catch (error) {
    } finally {
      this.searchLoading = false;
    }
  };
}

export default new HomeStore();
