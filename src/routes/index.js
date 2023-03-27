import { Route, Routes } from "react-router-dom";
import DashboardHome from "pages/dashboard/home";
import DashBoard from "pages/dashboard/home/features/dashboard";
import AuthHome from "pages/auth/home";
import Login from "pages/auth/home/features/login";
import MealOrdersHome from "pages/dashboard/meal-orders/features";
import MealOrders from "pages/dashboard/meal-orders";
import Laundries from "pages/dashboard/laundries";
import LaundriesHome from "pages/dashboard/laundries/features";
import MealSettings from "pages/dashboard/meal-settings";
import MealSettingsSettingsHome from "pages/dashboard/meal-settings/features";
import LaundrySettings from "pages/dashboard/laundry-settings";
import LaundrySettingsHome from "pages/dashboard/laundry-settings/features";
import Users from "pages/dashboard/users";
import UsersHome from "pages/dashboard/users/features";
import UserProfile from "pages/dashboard/users/features/userProfile";
import { AuthRoute } from "./authRoute";

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
          path="/dashboard/home"
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
          path="/dashboard/meal-orders/:status"
          element={
            <AuthRoute path="">
              <MealOrders />
            </AuthRoute>
          }
        >
          <Route path="" element={<MealOrdersHome />} />
        </Route>
        {/* end listings */}

        {/* bookings */}
        <Route
          path="/dashboard/laundries/:status"
          element={
            <AuthRoute path="">
              <Laundries />
            </AuthRoute>
          }
        >
          <Route path="" element={<LaundriesHome />} />
        </Route>
        {/* end bookings */}

        {/* users */}
        <Route
          path="/dashboard/users"
          element={
            <AuthRoute path="">
              <Users />
            </AuthRoute>
          }
        >
          <Route path="" element={<UsersHome />} />
          <Route path=":id" element={<UserProfile />} />
        </Route>
        {/* end users */}
        {/* meal-settings */}
        <Route
          path="/dashboard/meal-settings/:type"
          element={
            <AuthRoute path="">
              <MealSettings />
            </AuthRoute>
          }
        >
          <Route path="" element={<MealSettingsSettingsHome />} />
        </Route>
        {/* end meal-settings */}

        {/* laundry-settings */}
        <Route
          path="/dashboard/laundry-settings/:type"
          element={
            <AuthRoute path="">
              <LaundrySettings />
            </AuthRoute>
          }
        >
          <Route path="" element={<LaundrySettingsHome />} />
        </Route>
        {/* end laundry-settings */}

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
