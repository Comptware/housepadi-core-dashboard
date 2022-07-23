/**
 * Advanced example demonstrating all core MobX constructs.
 */
import { makeAutoObservable } from "mobx";
import moment from "moment";

import apis from "services/listings";
import { successToast } from "components/general/toast/toast";
import { uploadImagesToCloud } from "utils/uploadImagesToCloud";
import cleanPayload from "utils/cleanPayload";
import {
  emptyListingFormFour,
  emptyListingFormOne,
  emptyListingFormThree,
  emptyListingFormTwo,
} from "utils/forms";

class ListingStore {
  // ====================================================
  // State
  // ====================================================
  listings = [];
  listingsCount = [];
  reservedListings = [];
  allowances = [];
  amenities = [];
  rules = [];
  form = null;
  listingFormOne = { ...emptyListingFormOne };
  listingFormTwo = { ...emptyListingFormTwo };
  listingFormThree = { ...emptyListingFormThree };
  listingFormFour = { ...emptyListingFormFour };
  selectedAddress = null;
  error = null;
  loading = false;
  aarLoading = false;
  listingDataSet = false;
  activeListingId = "";

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

  //

  formOneDisabled = () => {
    return (
      !this.listingFormOne?.name ||
      !this.listingFormOne?.address ||
      !this.listingFormOne?.house_type ||
      !this.listingFormOne?.description ||
      !this.listingFormOne?.check_in_time ||
      !this.listingFormOne?.number_of_bedrooms ||
      !this.listingFormOne?.number_of_bathrooms ||
      !this.listingFormOne?.number_of_guests ||
      !this.listingFormOne?.number_of_restrooms ||
      !this.listingFormOne?.check_out_time
    );
  };

  formTwoDisabled = () => {
    return (
      this.listingFormTwo?.amenities?.length < 1 ||
      this.listingFormTwo?.allowances?.length < 1
    );
  };

  formThreeDisabled = () => {
    return (
      !this.listingFormThree?.images ||
      !this.listingFormThree?.sitting_space_images ||
      !this.listingFormThree?.kitchen_images ||
      !this.listingFormThree?.bedroom_images ||
      !this.listingFormThree?.dining_area_images ||
      !this.listingFormThree?.bathroom_images
    );
  };

  formFourDisabled = () => {
    return !this.listingFormFour?.base_price;
    // ||
    // (this.listingFormFour?.bank_transfer && (this.listingFormFour?.account_number?.length < 10 || !PaystackStore.userDetails)) ||
    // (this.listingFormFour?.card && (!this.listingFormFour?.card_number || !this.listingFormFour?.expiry_date | !this.listingFormFour?.cvv))
  };

  // Get Listings
  getListings = async (page_number) => {
    this.loading = true;
    try {
      let res = await apis.getListings(page_number);
      this.listingsCount = res?.total;
      res = res?.data;
      res = res?.map(({ draft, occupied, ...items }) => {
        const status = draft ? "draft" : occupied ? "occupied" : "unoccupied";
        return { ...items, status };
      });
      this.listings = res || [];
      this.reservedListings = res?.filter(
        ({ status }) => status === "reserved"
      );
      return res;
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  };
  // uploadListingImages
  uploadListingImages = async (form) => {
    this.loading = true;
    const imagesUrls = await Promise.all([
      uploadImagesToCloud(form?.images),
      uploadImagesToCloud(form?.sitting_space_images),
      uploadImagesToCloud(form?.kitchen_images),
      uploadImagesToCloud(form?.bedroom_images),
      uploadImagesToCloud(form?.dining_area_images),
      uploadImagesToCloud(form?.bathroom_images),
    ]);
    const images = imagesUrls[0];
    const sitting_space_images = imagesUrls[1];
    const kitchen_images = imagesUrls[2];
    const bedroom_images = imagesUrls[3];
    const dining_area_images = imagesUrls[4];
    const bathroom_images = imagesUrls[5];
    const urls = {
      images,
      sitting_space_images,
      kitchen_images,
      bedroom_images,
      dining_area_images,
      bathroom_images,
    };

    return urls;
  };
  // Create Listings
  createListing = async ({ complete = false, navigate, route }) => {
    this.loading = true;
    try {
      const formThree = await this.uploadListingImages(this.listingFormThree);
      console.log("formThree", formThree);
      let payload = {
        ...this.listingFormOne,
        ...formThree,
        ...this.listingFormTwo,
        ...this.listingFormFour,
        zusco: false,
      };
      payload.check_in_time = moment(payload.check_in_time).format("HH:mm");
      payload.check_out_time = moment(payload.check_out_time).format("HH:mm");
      payload = cleanPayload(payload);
      delete payload.card_number;
      delete payload.cvv;
      delete payload.account_number;
      delete payload.expiry_date;

      await apis.createListing(payload);
      successToast(
        "Success",
        `Your listing was ${complete ? "created" : "saved"} successfully`
      );
      navigate(route);
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  };

  // Update Listings
  updateListing = async ({ navigate, route, id }) => {
    this.loading = true;
    try {
      const formThree = await this.uploadListingImages(this.listingFormThree);
      console.log("formThree Update", formThree);
      let payload = {
        ...this.listingFormOne,
        ...formThree,
        // ...this.listingFormTwo,
        ...this.listingFormFour,
        zusco: false,
      };
      payload.check_in_time = moment(payload.check_in_time).format("HH:mm");
      payload.check_out_time = moment(payload.check_out_time).format("HH:mm");
      payload = cleanPayload(payload);
      delete payload.card_number;
      delete payload.cvv;
      delete payload.account_number;
      delete payload.expiry_date;

      await apis.updateListing(payload, id);
      successToast("Success", "Listing was updated successfully");
      navigate(route);
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  };

  // Update Listings
  deleteListing = async ({ shortlet_id, navigate, route }) => {
    this.loading = true;
    try {
      await apis.deleteListing(shortlet_id);
      successToast("Success", "Listing was deleted successfully");
      navigate(route);
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  };
  // Get Allowances amenities rules
  getAAR = async () => {
    this.aarLoading = true;
    try {
      const res = await apis.getAAR();
      this.allowances = res.allowances || [];
      this.amenities = res.amenities || [];
      this.rules = res.rules || [];
    } catch (error) {
      this.error = error;
    } finally {
      this.aarLoading = false;
    }
  };

  handleFindListing = async (url, navigate) => {
    let listingRes;
    let lisingsArr;
    if (this.listings?.length < 1) {
      listingRes = await this.getListings("1");
      lisingsArr = listingRes;
    } else {
      lisingsArr = this.listings;
    }

    const currentListing = lisingsArr?.find(({ id }) => id === url);

    if (currentListing) {
      console.log("currentListing", currentListing);
      const {
        // Form one
        name,
        number_of_bedrooms,
        number_of_bathrooms,
        number_of_guests,
        number_of_restrooms,
        address,
        house_type,
        description,
        check_in_time,
        check_out_time,
        lat,
        lng,
        city,
        state,
        //Form two
        amenities,
        allowances,
        rules,
        // Form three
        images,
        sitting_space_images,
        kitchen_images,
        bedroom_images,
        dining_area_images,
        bathroom_images,
        // Form four
        base_price,
        card,
        bank_transfer,
        addon_caution_fee,
        addon_cleaning_fee,
        // card_number,
        // expiry_date,
        // cvv,
        // account_number
      } = currentListing;

      const lisingDataOne = {
        name,
        number_of_bedrooms,
        number_of_bathrooms,
        number_of_guests,
        number_of_restrooms,
        address,
        house_type,
        description,
        check_in_time: moment("11/11/2022 " + check_in_time).toDate(),
        check_out_time: moment("11/11/2022 " + check_out_time).toDate(),
        lat,
        lng,
        city,
        state,
      };
      const lisingDataTwo = {
        amenities: amenities?.map(({ id }) => id),
        allowances: allowances?.map(({ id }) => id),
        rules: rules?.map(({ id }) => id),
      };
      const lisingDataThree = {
        images,
        sitting_space_images,
        kitchen_images,
        bedroom_images,
        dining_area_images,
        bathroom_images,
      };
      const lisingDataFour = {
        base_price,
        card,
        bank_transfer,
        addon_caution_fee,
        addon_cleaning_fee,
      };
      console.log("lisingDataFour", lisingDataFour);
      this.selectedAddress = { label: address };
      this.listingFormOne = { ...lisingDataOne };
      this.listingFormTwo = { ...lisingDataTwo };
      this.listingFormThree = { ...lisingDataThree };
      this.listingFormFour = { ...lisingDataFour };
      this.listingDataSet = true;
    } else {
      navigate("/dashboard/listings");
    }
  };

  savelistingForm = (field, form) => {
    this[field] = form;
  };
  resetlistingForm = () => {
    this.listingFormOne = { ...emptyListingFormOne };
    this.listingFormTwo = { ...emptyListingFormTwo };
    this.listingFormThree = { ...emptyListingFormThree };
    this.listingFormFour = { ...emptyListingFormFour };
    this.selectedAddress = null;
  };
  savelistingFormOne = (prop, val, type) => {
    if (type === "+") {
      this.listingFormOne = { ...this.listingFormOne, [prop]: val + 1 };
    } else if (type === "-") {
      this.listingFormOne = {
        ...this.listingFormOne,
        [prop]: val >= 1 ? val - 1 : val,
      };
    } else {
      this.listingFormOne = { ...this.listingFormOne, [prop]: val };
    }
  };
  savelistingFormTwo = (item, items, prop) => {
    let newArr = [...items, item];
    newArr = [...new Set(newArr)];
    const match = items?.find((el) => el === item);
    if (match) {
      newArr = newArr.filter((itm) => itm !== item);
    }
    this.listingFormTwo = { ...this.listingFormTwo, [prop]: newArr };
  };
  savelistingFormThree = (prop, val) => {
    this.listingFormThree = { ...this.listingFormThree, [prop]: val };
  };
  savelistingFormFour = (prop, val) => {
    this.listingFormFour = { ...this.listingFormFour, [prop]: val };
  };
  setSelectedAddress = (value) => {
    this.selectedAddress = value;
  };
  setListingDataSet = (value) => {
    this.listingDataSet = value;
  };
}

export default new ListingStore();
