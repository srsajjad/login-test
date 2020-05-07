import { useEffect, useState } from "react";
import { delay } from "utils/api";

export const useAuthentication = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // here ideally we process JSON Web Token or cookie sent from server

    let email = localStorage.getItem("email");
    let password = localStorage.getItem("password");

    if (!email || !password) return setLoading(false);

    // fake API call
    let id;
    delay(400).then((tId) => {
      id = tId;

      // ideally we send JWT to server to check auth
      if (email === "admin@xyz" && password === "password") {
        setAuthenticated(true);
      }

      setLoading(false);
    });

    return () => {
      //clean up
      clearTimeout(id);
    };
  }, []);

  return { authenticated, loading };
};
