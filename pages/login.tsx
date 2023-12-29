import React, { useContext, useEffect, useState } from "react";
import UserContext from "../utils/UserContext";

// import "../styles/LoginPage.module.css";

const LoginPage: React.FC = () => {
  const { setLoggedIn } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   const loggedIn = localStorage.getItem("loggedIn");
  //   if (loggedIn) {
  //     setLoggedIn(true);
  //   }

  //   // Clear loggedIn from local storage when the session is over
  //   window.onbeforeunload = () => {
  //     localStorage.removeItem("loggedIn");
  //   };

  //   // Remove the event listener when the component is unmounted
  //   return () => {
  //     window.onbeforeunload = null;
  //   };
  // }, [setLoggedIn]);

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
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
