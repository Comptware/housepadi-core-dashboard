/**
 * Advanced example demonstrating all core MobX constructs.
 */
import { makeAutoObservable } from "mobx";
import apis from "services/hosts";
import { successToast } from "components/general/toast/toast";
class HostStore {
  // ====================================================
  // State
  // ====================================================
  hosts = [];
  hostListings = [];
  hostBookings = [];

  hostCount = 0;
  hostListingsCount = 0;
  hostBookingsCount = 0;
  error = null;
  loading = false;
  searchLoading = false;
  hostListingsLoading = false;
  hostBookingsLoading = false;
  blockHostLoading = false;
  blockListingLoading = false;
  activeHost = null;
  acceptOrRejectHostLoading = false;
  acceptOrRejectListingLoading = false;
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

  // getHosts
  getHosts = async (page_number) => {
    this.loading = true;
    try {
      let res = await apis.getHosts(page_number);
      this.hostCount = res?.total;
      res = res?.data;

      this.hosts = res || [];

      return res;
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  };

  // getHostListings
  getHostListings = async (data, page_number) => {
    this.hostListingsLoading = true;
    try {
      let res = await apis.getHostListings(data, page_number);
      this.hostListingsCount = res?.total;
      res = res?.data;
      this.hostListings = res || [];
      return res;
    } catch (error) {
      this.error = error;
    } finally {
      this.hostListingsLoading = false;
    }
  };

  // getHostBookings
  getHostBookings = async (data, page_number) => {
    this.hostBookingsLoading = true;
    try {
      let res = await apis.getHostBookings(data, page_number);
      this.hostBookingsCount = res?.total;
      res = res?.data;
      this.hostBookings = res || [];
      return res;
    } catch (error) {
      this.error = error;
    } finally {
      this.hostBookingsLoading = false;
    }
  };

  // blockHost
  blockHost = async (data, handleOk, { url, navigate, route }) => {
    this.blockHostLoading = true;
    try {
      await apis.blockHost(data);
      const message = "You have successfully blocked this agent";
      successToast(`Operation successful!`, message);
      handleOk();
      this.handleFindHost({ url, navigate, route });
    } catch (error) {
      this.error = error;
    } finally {
      this.blockHostLoading = false;
    }
  };

  // blockListing
  blockListing = async (data, { payload, page_number }, handleOk) => {
    this.blockListingLoading = true;
    try {
      await apis.blockListing(data);
      const message = "You have successfully blocked this listing";
      successToast(`Operation successful!`, message);
      handleOk();
      this.getHostListings(payload, page_number);
    } catch (error) {
      this.error = error;
    } finally {
      this.blockListingLoading = false;
    }
  };

  // acceptOrRejectHost
  acceptOrRejectHost = async (data, { url, navigate, route }, handleOk) => {
    this.acceptOrRejectHostLoading = true;
    try {
      await apis.acceptOrRejectHost(data);
      const message = "You have successfully updated your agent status";
      successToast(`Operation successful!`, message);
      handleOk();
      this.handleFindHost({ url, navigate, route });
    } catch (error) {
      this.error = error;
    } finally {
      this.acceptOrRejectHostLoading = false;
    }
  };

  // acceptOrRejectListing
  acceptOrRejectListing = async (data, { payload, page_number }, handleOk) => {
    this.acceptOrRejectListingLoading = true;
    try {
      await apis.acceptOrRejectListing(data);
      const message = "You have successfully updated this listing's status";
      successToast(`Operation successful!`, message);
      handleOk();
      this.getHostListings(payload, page_number);
    } catch (error) {
      this.error = error;
    } finally {
      this.acceptOrRejectListingLoading = false;
    }
  };

  handleFindHost = async ({ url, navigate, route }) => {
    let currentHost;
    try {
      this.searchLoading = true;
      currentHost = await apis.getHostsById(url);
      currentHost = currentHost?.agent;
      if (currentHost) {
        this.activeHost = currentHost;
      } else {
        navigate(route);
      }
    } catch (error) {
    } finally {
      this.searchLoading = false;
    }
  };
}

export default new HostStore();
