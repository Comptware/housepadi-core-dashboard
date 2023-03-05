import { useAuth } from "hooks/auth";
import DashboardLayout from "components/layout/dashboard";
// import LandingLayout from "components/layout/landing";
import { string, bool, node } from "prop-types";
import { Navigate } from "react-router-dom";

export const AuthRoute = ({ path, notProtected, children, ...rest }) => {
  // const { isAuthenticated } = useAuth();
  const user = sessionStorage.getItem("user");
  console.log(notProtected);
  if (notProtected && user) {
    return (
      <DashboardLayout>
        <Navigate replace to="/dashboard/home" />;
      </DashboardLayout>
    );
  }

  if (!user && !notProtected) {
    return (
      <Navigate
        replace
        to={{
          pathname: "/auth/login",
          state: {
            prevLocation: path,
            error: "You need to login first!",
          },
        }}
        exact
      />
    );
  }

  return <>{children}</>;
};

AuthRoute.propTypes = {
  notProtected: bool,
  path: string.isRequired,
  children: node,
};

AuthRoute.defaultProps = {
  notProtected: false,
};
