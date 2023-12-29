import "@/styles/globals.css";
import "@/styles/LoginPage.css";
import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import UserContext from "../utils/UserContext";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   // Redirect to home page if logged in
  //   if (loggedIn && router.pathname === "/login") {
  //     router.push("/");
  //   }
  //   // Redirect to login page if not logged in
  //   else if (!loggedIn && router.pathname !== "/login") {
  //     router.push("/login");
  //   }
  // }, [loggedIn, router]);

  return (
    // <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
    <Component {...pageProps} />
    // </UserContext.Provider>
  );
}

export default MyApp;

