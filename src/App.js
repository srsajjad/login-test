import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Authenticated } from "components/authenticated";
// import { Success } from "components/success";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <Authenticated />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
