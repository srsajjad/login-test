import React, { useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Email } from "components/email";
import { Password } from "components/password";
import { Veriy } from "components/verify";
import { Authenticated } from "components/authenticated";

import { LoginContext, initialState, loginReducer } from "context/LoginContext";

import "./LoginContainer.css";
import { Register } from "components/register";
import { Copyright } from "components/copyright";

export const LoginContainer = (props) => {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  return (
    <div className="login-container">
      <Register />
      <Router>
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
            <Route path="/">
              <Authenticated />
            </Route>
          </Switch>
        </LoginContext.Provider>
      </Router>

      <Copyright />
    </div>
  );
};
