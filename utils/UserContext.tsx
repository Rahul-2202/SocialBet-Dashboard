import React from "react";

type UserContextType = {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserContext = React.createContext<UserContextType>({
  loggedIn: false,
  setLoggedIn: () => {},
});

export default UserContext;
