import React from "react";
import { Checkbox } from "carbon-components-react";

export const RememberPassword = (props) => {
  return (
    <div className="remember-password">
      <div>
        <Checkbox defaultChecked labelText="Remind Me Later" id="checked" />
      </div>
      <a href="#">Forgot Password</a>
    </div>
  );
};
