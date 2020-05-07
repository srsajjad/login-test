import React from "react";
export const LoginContext = React.createContext(null);

// initial state for userReducer hook
export const initialState = {
  email: "",
  password: "",
  verificationCode: "",
  rerun: 0,
};

// reducer function for useReducer hook
export const loginReducer = (state, action) => {
  const { type, payload } = action;
  const { email, password, verificationCode } = payload;

  switch (type) {
    case "UPDATE_EMAIL":
      return { ...state, email };
    case "UPDATE_PASSWORD":
      return { ...state, password };
    case "UPDATE_VERIFICATION_CODE":
      return { ...state, verificationCode };
    case "RE_RUN":
      return { ...state, rerun: !state.rerun };
    default:
      throw new Error();
  }
};
