/**
 * Advanced example demonstrating all core MobX constructs.
 */
import { makeAutoObservable } from "mobx";
import { getPaystackData } from "services/paystack";

class PaystackStore {
  // ====================================================
  // State
  // ====================================================
  banks = [];
  userDetails = null;

  error = null;
  loading = false;
  detailsLoading = false;
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
  // Get Banks
  getBanks = async () => {
    this.loading = true;
    try {
      let res = await getPaystackData("/bank");
      res = res?.data?.data;
      this.banks =
        res?.map(({ name, code, ...item }) => {
          return { ...item, label: name, value: code };
        }) || [];
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  };

  getUserBankDetails = async (account_number, bank_code) => {
    this.detailsLoading = true;
    this.userDetails = null;
    try {
      let res = await getPaystackData(
        `/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`
      );
      res = res?.data?.data;
      this.userDetails = res || null;
    } catch (error) {
      this.error = error;
    } finally {
      this.detailsLoading = false;
    }
  };
}

export default new PaystackStore();
