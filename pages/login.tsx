import React, { useContext, useEffect, useState } from "react";
import UserContext from "../utils/UserContext";
import Image from "next/image";
import Logo from "../public/Logo1 (1).svg";
import usernameLogo from "../public/fi_3033143.svg";
import passwordLogo from "../public/fi_3064155.svg";

// import "../styles/LoginPage.module.css";

const LoginPage: React.FC = () => {
  const { setLoggedIn } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "true") {
      setLoggedIn(true);
    }
  }, [setLoggedIn]);

  const handleLogin = () => {
    // Define your admin user
    const adminUser = {
      username: process.env.NEXT_PUBLIC_ADMIN_USERNAME as string,
      password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD as string,
    };

    // Check if the entered username and password match the admin user
    if (username === adminUser.username && password === adminUser.password) {
      // The username and password are correct
      // Redirect the user to the home page
      setLoggedIn(true);
      localStorage.setItem("loggedIn", "true");
    } else {
      // The username or password are incorrect
      // Show an error message
      alert("Incorrect username or password");
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div className="w-[26.375rem] h-[33.4375rem] flex-shrink-0 my-0 mx-auto px-12 py-10 rounded-xl login-container">
        <div className="login-inputs flex flex-col gap-10 items-center">
          <Image src={Logo} alt="Logo" className="h-36 w-30" />
          <h1 className="text-[#F1F1EF] text-3xl">Dashboard Login</h1>
          <div className="flex flex-col gap-4 items-center">
            <div className="flex items-center px-4 gap-5 py-2 rounded-lg text-[#B3B3B3] w-[20.375rem] h-12 bg-[#79797940]">
              <Image src={usernameLogo} alt="Logo" className="h-3 w-3" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                className="bg-transparent w-[16.04556rem] flex-shrink-0 text-[1rem] text-[#B3B3B3] outline-none"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex items-center px-4 gap-5 py-2 rounded-lg text-[#B3B3B3] w-[20.375rem] h-12 bg-[#79797940]">
              <Image src={passwordLogo} alt="Logo" className="h-3 w-3" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                className="bg-transparent w-[16.04556rem] flex-shrink-0 text-[1rem] text-[#B3B3B3]  outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <button
                className="bg-[#7053FF] w-80 p-3 rounded-lg text-center text-[#FFFDFA] text-lg font-bold "
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
