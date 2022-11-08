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
import Login from "pages/auth/home/features/login";
import FormThree from "pages/dashboard/newListing/features/three";
import FormFour from "pages/dashboard/newListing/features/four";
import ProfileHome from "pages/dashboard/profile/features";
import Profile from "pages/dashboard/profile";
import Bookings from "pages/dashboard/bookings";
import BookingsHome from "pages/dashboard/bookings/features";
import BookingDetails from "pages/dashboard/bookings/features/details";
import UserBookingsProfile from "pages/dashboard/bookings/features/userProfile";
import Settings from "pages/dashboard/settings";
import SettingsHome from "pages/dashboard/settings/features";
import Utilities from "pages/dashboard/listings/features/utilities";
import Hosts from "pages/dashboard/hosts";
import HostsHome from "pages/dashboard/hosts/features";
import HostProfile from "pages/dashboard/hosts/features/hostProfile";
const Router = () => {
  return (
    <>
      <Routes>
        {/* welcome */}
        <Route
          path="/"
          element={
            <AuthRoute path="" notProtected>
              <AuthHome />
            </AuthRoute>
          }
        >
          <Route path="" element={<Login />} />
        </Route>

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
          <Route path="utilities" element={<Utilities />} />
        </Route>
        {/* end listings */}

        {/* bookings */}
        <Route
          path="/dashboard/bookings"
          element={
            <AuthRoute path="">
              <Bookings />
            </AuthRoute>
          }
        >
          <Route path="" element={<BookingsHome />} />

          <Route path=":id" element={<BookingDetails />} />
          <Route path="user/:id" element={<UserBookingsProfile />} />
        </Route>
        {/* end bookings */}

        {/* agents */}
        <Route
          path="/dashboard/agents"
          element={
            <AuthRoute path="">
              <Hosts />
            </AuthRoute>
          }
        >
          <Route path="" element={<HostsHome />} />
          <Route path=":id" element={<HostProfile />} />
        </Route>
        {/* end agents */}

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
        {/* settings */}
        <Route
          path="/dashboard/settings"
          element={
            <AuthRoute path="">
              <Settings />
            </AuthRoute>
          }
        >
          <Route path="" element={<SettingsHome />} />
        </Route>
        {/* end settings */}
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
          path="auth"
          element={
            <AuthRoute path="" notProtected>
              <AuthHome />
            </AuthRoute>
          }
        >
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
