export const useAuth = () => {
  let email = localStorage.getItem("email");
  let password = localStorage.getItem("password");

  if (!email || !password) return false;

  // ideally we send JWT to server to check auth
  if (email === "admin@xyz" && password === "password") {
    return true;
  }
};
