import React, { createContext, useState } from "react";
export const AuthContext = createContext();
function Auth({ children }) {
  const [currentUser, setCurrentUser] = useState();
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default Auth;
