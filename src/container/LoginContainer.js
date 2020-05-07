import React, { useReducer, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import { Email } from "components/email";
import { Password } from "components/password";
import { Veriy } from "components/verify";

import { LoginContext, initialState, loginReducer } from "context/LoginContext";

import { Register } from "components/register";
import { Copyright } from "components/copyright";
import { RememberPassword } from "components/rememberPassword";

import "./LoginContainer.css";

export const LoginContainer = (props) => {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const history = useHistory();

  useEffect(() => history.push("/login/email"), [history]);

  return (
    <div className="login-container">
      <Register />
      <LoginContext.Provider value={{ state, dispatch }}>
        <Switch>
          <Route path="/login/email">
            <Email />
          </Route>

          <Route path="/login/password">
            <Password />
          </Route>
          <Route path="/login/verify">
            <Veriy />
          </Route>
        </Switch>
      </LoginContext.Provider>

      <RememberPassword />
      <Copyright />
    </div>
  );
};
