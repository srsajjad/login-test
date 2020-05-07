import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const Success = (props) => {
  let history = useHistory();
  useEffect(() => {
    history.push("/");
  }, [history]);

  return <h3>You are logged in</h3>;
};
