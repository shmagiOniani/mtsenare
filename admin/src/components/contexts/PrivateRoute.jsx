import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { NotFound } from "../../pages";
import { UserContext } from "../contexts/UserContext";

export default function PrivateRoute({
  component: Component,
  permission,
  ...rest
}) {
  const { hasPermissions } = useContext(UserContext);
  const token = localStorage.getItem("token");

  return (
    // now
    <>
      <Route {...rest} render={(props) => <Component {...props} />} />
    </>
    // before
    // <>
    //   {hasPermissions(permission) ? (
    //     <Route
    //       {...rest}
    //       render={(props) => token !== null && <Component {...props} />}
    //     >
    //       {token === null && <Redirect to="/login" />}
    //     </Route>
    //   ) : (
    //     <Route path="*" exact={true} component={NotFound} />
    //   )}
    // </>
  );
}
