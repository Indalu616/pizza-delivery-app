import React, { useContext } from "react";
import { AuthContext } from "../AuthContext/Auth";
import { Redirect, Route } from "react-router-dom";
function PrivateRoute({ component: RouteComponent, ...rest }) {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route>
      {...rest}
      render=
      {(routeProps) =>
        currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    </Route>
  );
}

export default PrivateRoute;
