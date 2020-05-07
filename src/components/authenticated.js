import React, { useContext } from "react";

import { Success } from "./success";
import { Loading } from "./loading";
import { Redirect } from "react-router-dom";
import { useAuthentication } from "custom-hooks/useAuthentication";
import { LoginContainer } from "container/LoginContainer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export const Authenticated = (props) => {
  // custom hook
  const { authenticated, loading } = useAuthentication();

  if (loading) return <Loading />;

  if (authenticated) return <Success />;

  if (!authenticated)
    return (
      <>
        <Switch>
          <Route path="/login">
            <LoginContainer />
          </Route>
        </Switch>
        <Redirect to={{ pathname: "/login" }} />
      </>
    );
};
