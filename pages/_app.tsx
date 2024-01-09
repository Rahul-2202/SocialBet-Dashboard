import "@/styles/globals.css";
import "@/styles/LoginPage.css";
import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import UserContext from "../utils/UserContext";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  const publicRoutes = ["/login", "/bulkUpload"];

  useEffect(() => {
    // Redirect to home page if logged in and not on a public route
    if (loggedIn && router.pathname === "/login") {
      router.push("/");
    }
    // Redirect to login page if not logged in and not on a public route
    else if (!loggedIn && !publicRoutes.includes(router.pathname)) {
      router.push("/login");
    }
  }, [loggedIn, router]);

  return (
    <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
      <Navbar />
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;

