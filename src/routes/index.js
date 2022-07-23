import { Route, Routes } from "react-router-dom";
import DashboardHome from "pages/dashboard/home";
import DashBoard from "pages/dashboard/home/features/dashboard";
import { AuthRoute } from "./authRoute";
import ListingsHome from "pages/dashboard/listings/features";
import Listings from "pages/dashboard/listings";
import Messages from "pages/dashboard/messages";
import MessagesHome from "pages/dashboard/messages/features";
import NewLising from "pages/dashboard/newListing";
import FormOne from "pages/dashboard/newListing/features/one";
import FormTwo from "pages/dashboard/newListing/features/two";
import AuthHome from "pages/auth/home";
import SendOtp from "pages/auth/home/features/sendOtp";
import VerifyOtp from "pages/auth/home/features/verifyOtp";
import FormThree from "pages/dashboard/newListing/features/three";
import FormFour from "pages/dashboard/newListing/features/four";
import ProfileHome from "pages/dashboard/profile/features";
import Profile from "pages/dashboard/profile";

const Router = () => {
  return (
    <>
      <Routes>
        {/* welcome */}
        <Route
          path="/"
          element={
            <AuthRoute path="" notProtected>
              <SendOtp />
            </AuthRoute>
          }
        ></Route>

        {/* end welcome */}

        {/* orders */}
        <Route
          path="/dashboard/overview"
          element={
            <AuthRoute path="">
              <DashboardHome />
            </AuthRoute>
          }
        >
          <Route path="" element={<DashBoard />} />
        </Route>
        {/* listings */}
        <Route
          path="/dashboard/listings"
          element={
            <AuthRoute path="">
              <Listings />
            </AuthRoute>
          }
        >
          <Route path="" element={<ListingsHome />} />
        </Route>
        {/* end listings */}

        {/* messages */}
        <Route
          path="/dashboard/messages"
          element={
            <AuthRoute path="">
              <Messages />
            </AuthRoute>
          }
        >
          <Route path="" element={<MessagesHome />} />
        </Route>
        {/* end messages */}

        {/* profile */}
        <Route
          path="/dashboard/me"
          element={
            <AuthRoute path="">
              <Profile />
            </AuthRoute>
          }
        >
          <Route path="" element={<ProfileHome />} />
        </Route>
        {/* end profile */}

        {/* new-listing */}
        <Route
          path="new-listing"
          element={
            <AuthRoute path="">
              <NewLising />
            </AuthRoute>
          }
        >
          <Route path="step-one" element={<FormOne />} />
          <Route path="step-two" element={<FormTwo />} />
          <Route path="step-three" element={<FormThree />} />
          <Route path="step-four" element={<FormFour />} />

          <Route path="step-one/:listingId" element={<FormOne />} />
          <Route path="step-two/:listingId" element={<FormTwo />} />
          <Route path="step-three/:listingId" element={<FormThree />} />
          <Route path="step-four/:listingId" element={<FormFour />} />
        </Route>
        {/* end new-listing */}
        <Route
          path="otp"
          element={
            <AuthRoute path="" notProtected>
              <AuthHome />
            </AuthRoute>
          }
        >
          <Route path="send" element={<SendOtp />} />
          <Route path="verify" element={<VerifyOtp />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
