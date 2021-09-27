import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const isUserAuthenticated = JSON.parse(
    localStorage.getItem("isUserAuthenticated")
  );
  return (
    <Route
      {...rest}
      render={(props) =>
        isUserAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
      }
    />
  );
};
