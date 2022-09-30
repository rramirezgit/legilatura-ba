import React, { useEffect } from "react";

export const AuthContextTheme = React.createContext();

const AuthContext = (props) => {
  const [user, setUser] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
      setUser(JSON.parse(user));
    }
  }, []);

  const login = (user) => {
    const userString = JSON.stringify(user);
    sessionStorage.setItem("user", userString);
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContextTheme.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContextTheme.Provider>
  );
};

export default AuthContext;
