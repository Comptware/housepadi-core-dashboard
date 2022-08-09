/**
 * Advanced example demonstrating all core MobX constructs.
 */
import { makeAutoObservable } from "mobx";
import apis from "services/bookings";
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
  getBookings = async (page_number) => {
    this.loading = true;
    try {
      let res = await apis.getBookings(page_number);
      this.bookingsCount = res?.total;
      res = res?.data;
      this.bookings = res || [];
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


  handleFindBooking = async ({ url, navigate, route }) => {
    let listingRes;
    let lisingsArr;
    if (this.bookings?.length < 1) {
      listingRes = await this.getBookings("all");
      lisingsArr = listingRes;
    } else {
      lisingsArr = this.bookings;
    }

    let currentBooking = lisingsArr?.find(
      ({ shortlet_id }) => shortlet_id === url
    );

    if (currentBooking) {
      this.currentBooking = currentBooking;
    } else {
      navigate(route);
    }
    return currentBooking;
  };

}

export default new HomeStore();
