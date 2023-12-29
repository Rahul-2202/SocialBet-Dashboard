import { useEffect } from "react";
import { useRouter } from "next/router";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Set loggedIn variable to false
    localStorage.setItem("loggedIn", "false");

    // Redirect to /login
    router.push("/login");
  }, []);

  return null;
};

export default LogoutPage;
