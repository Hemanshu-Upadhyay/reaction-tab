import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user] = useState({ id: 1, name: "Hemanshu412" });

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
