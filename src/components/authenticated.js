import React from "react";

import { Success } from "./success";
import { Loading } from "./loading";
import { Redirect } from "react-router-dom";
import { useAuthentication } from "custom-hooks/useAuthentication";

export const Authenticated = (props) => {
  // custom hook
  const { authenticated, loading } = useAuthentication();

  if (loading) return <Loading />;
  if (!authenticated) return <Redirect to={{ pathname: "/login/email" }} />;
  return <Success />;
};
