import React from "react";
import { Loading as Spinner } from "carbon-components-react";

export const Loading = (props) => {
  return <Spinner description="Loading" withOverlay={false} />;
};
