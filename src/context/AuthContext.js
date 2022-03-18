import { createContext, useState, useCallback, useEffect } from "react";

const initialState = {
  isLoggedIn: false,
  attributes: {
    token: null,
    username: null,
    email: null,
  },
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const { login, logout, attributes } = useAuth();
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!attributes?.token,
        attributes: attributes,
        login: login,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

let logoutTimer;

export const useAuth = () => {
  const [attributes, setAttributes] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const LOCALSTORAGE_ITEM_NAME = "itcrowdUserData";

  const login = useCallback((attributes, expirationDate) => {
    setAttributes(attributes);

    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      LOCALSTORAGE_ITEM_NAME,
      JSON.stringify({
        attributes: attributes,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setAttributes(null);
    setTokenExpirationDate(null);
    localStorage.removeItem(LOCALSTORAGE_ITEM_NAME);
  }, []);

  useEffect(() => {
    if (attributes?.token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [attributes, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_ITEM_NAME));
    if (
      storedData &&
      storedData.attributes &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.attributes, new Date(storedData.expiration));
    }
  }, [login]);

  return { login, logout, attributes };
};
